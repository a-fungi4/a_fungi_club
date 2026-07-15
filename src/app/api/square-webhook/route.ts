import { NextRequest, NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import { verifyWebhookSignature } from './verifySignature';
import {
  createPrintfulOrder,
  printfulOrderExists,
  resolveRecipient,
  type PrintfulLineItem,
} from '@/lib/printful';

export const runtime = 'nodejs';

/**
 * Backup fulfillment path. The primary path creates the Printful order
 * synchronously in /api/square-pay. This webhook only fires as a safety net:
 * if that synchronous call ever failed after a successful charge, Square's
 * payment.updated event lets us retry. Creation is idempotent on the Square
 * order id, so a normal successful checkout results in a no-op here.
 */

const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

interface WebhookPayload {
  type?: string;
  // Raw Square webhook JSON is snake_case (we parse the raw body ourselves).
  data?: { object?: { payment?: { id?: string; status?: string; order_id?: string } } };
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-square-hmacsha256-signature') || req.headers.get('x-square-signature');
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/square-webhook`;
    const body = await req.text();

    if (!verifyWebhookSignature(body, signature, webhookUrl)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload: WebhookPayload = JSON.parse(body);
    const payment = payload?.data?.object?.payment;

    if (payload?.type !== 'payment.updated' || payment?.status !== 'COMPLETED') {
      return NextResponse.json({ ignored: true, reason: 'Not a completed payment' });
    }

    const orderId = payment.order_id;
    if (!orderId) {
      return NextResponse.json({ ignored: true, reason: 'No order id on payment' });
    }

    // Idempotency: if the sync path already created it, do nothing.
    if (await printfulOrderExists(orderId)) {
      return NextResponse.json({ ok: true, printful: 'exists' });
    }

    // Reconstruct the Printful order from the metadata we stored at pay time.
    const orderRes = await square.orders.get({ orderId });
    const meta = orderRes.order?.metadata || {};
    if (!meta.it) {
      return NextResponse.json(
        { error: 'Order missing fulfillment metadata', orderId },
        { status: 422 },
      );
    }

    let it: [string, number][];
    try {
      it = JSON.parse(meta.it);
    } catch {
      return NextResponse.json({ error: 'Bad item metadata', orderId }, { status: 422 });
    }

    // [Square variation id (= Printful external_variant_id), quantity][]
    const items: PrintfulLineItem[] = it.map(([externalVariantId, quantity]) => ({
      externalVariantId,
      quantity,
    }));
    const s = (v: string | null | undefined) => v ?? undefined;
    const recipient = resolveRecipient({
      name: s(meta.ship_name),
      address1: s(meta.ship_addr1),
      address2: s(meta.ship_addr2),
      city: s(meta.ship_city),
      state_code: s(meta.ship_state),
      country_code: meta.ship_country || 'US',
      zip: meta.ship_zip || '',
      email: s(meta.ship_email),
      phone: s(meta.ship_phone),
    });

    await createPrintfulOrder({
      externalId: orderId,
      recipient,
      items,
      confirm: process.env.PRINTFUL_CONFIRM_ORDERS === 'true',
    });

    return NextResponse.json({ ok: true, printful: 'created', orderId });
  } catch (error) {
    console.error('square-webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook error' },
      { status: 500 },
    );
  }
}
