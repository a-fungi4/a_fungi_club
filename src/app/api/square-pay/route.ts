import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { SquareClient, SquareEnvironment, type Square } from 'square';
import { hashCart, verifyQuote } from '@/lib/quote';
import {
  createPrintfulOrder,
  printfulOrderExists,
  resolveRecipient,
  type PrintfulLineItem,
  type Recipient,
} from '@/lib/printful';
import { sendOrderConfirmation } from '@/lib/email';

export const runtime = 'nodejs';

const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variation?: string;
}

function idemKey(token: string, suffix: string): string {
  return crypto.createHash('sha256').update(`${token}:${suffix}`).digest('hex').slice(0, 40);
}

export async function POST(req: NextRequest) {
  try {
    const { sourceId, token, cart, recipient } = (await req.json()) as {
      sourceId: string;
      token: string;
      cart: CartItem[];
      recipient: Recipient & { name: string; email: string };
    };

    if (!sourceId) return NextResponse.json({ error: 'Missing payment token' }, { status: 400 });
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Verify the signed quote — the browser can't change the price.
    const quote = verifyQuote(token);
    if (!quote) {
      return NextResponse.json(
        { error: 'Your quote expired. Please recalculate shipping & tax.' },
        { status: 400 },
      );
    }
    // 2. The cart must be exactly what we quoted.
    if (hashCart(cart) !== quote.cartHash) {
      return NextResponse.json(
        { error: 'Your cart changed since the quote. Please recalculate.' },
        { status: 400 },
      );
    }
    // 3. The destination must match the quoted destination.
    if ((recipient?.zip || '') !== quote.zip) {
      return NextResponse.json(
        { error: 'Shipping address changed since the quote. Please recalculate.' },
        { status: 400 },
      );
    }
    if (!recipient?.name || !recipient?.email || !recipient?.address1 || !recipient?.city) {
      return NextResponse.json({ error: 'Incomplete shipping address' }, { status: 400 });
    }

    const locationId = process.env.SQUARE_LOCATION_ID!;
    const currency = quote.currency as Square.Currency;

    // 4. Build the Square order. Shipping and tax are explicit line items with
    //    the exact Printful-computed amounts, so the charge equals the quote.
    const lineItems: Square.OrderLineItem[] = cart.map((item) => ({
      name: item.variation ? `${item.name} (${item.variation})` : item.name,
      quantity: String(item.quantity),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency,
      },
    }));
    if (quote.shippingCents > 0) {
      lineItems.push({
        name: `Shipping — ${quote.shippingLabel}`,
        quantity: '1',
        basePriceMoney: { amount: BigInt(quote.shippingCents), currency },
      });
    }
    if (quote.taxCents > 0) {
      lineItems.push({
        name: 'Sales Tax',
        quantity: '1',
        basePriceMoney: { amount: BigInt(quote.taxCents), currency },
      });
    }

    // Stash everything the webhook backup needs to (re)create the Printful order.
    // Square rejects empty-string metadata values, so only include set fields.
    const rawMeta: Record<string, string | undefined> = {
      pf: JSON.stringify(quote.pf),
      ship_name: recipient.name,
      ship_addr1: recipient.address1,
      ship_addr2: recipient.address2,
      ship_city: recipient.city,
      ship_state: recipient.state_code,
      ship_zip: recipient.zip,
      ship_country: recipient.country_code || 'US',
      ship_email: recipient.email,
      ship_phone: recipient.phone,
    };
    const metadata: Record<string, string> = {};
    for (const [k, v] of Object.entries(rawMeta)) {
      if (v) metadata[k] = v.slice(0, 255);
    }

    const orderRes = await square.orders.create({
      idempotencyKey: idemKey(token, 'order'),
      order: {
        locationId,
        lineItems,
        metadata,
      },
    });
    const order = orderRes.order;
    if (!order?.id) throw new Error('Failed to create Square order');

    // 5. Charge the card for the exact order total. Attach the buyer email so
    //    Square records it (and can send its own receipt).
    const paymentRes = await square.payments.create({
      sourceId,
      idempotencyKey: idemKey(token, 'pay'),
      amountMoney: { amount: BigInt(quote.totalCents), currency },
      orderId: order.id,
      locationId,
      buyerEmailAddress: recipient.email,
      autocomplete: true,
    });
    const payment = paymentRes.payment;
    const paid = payment?.status === 'COMPLETED' || payment?.status === 'APPROVED';
    if (!paid) {
      return NextResponse.json(
        { error: `Payment not completed (status: ${payment?.status || 'unknown'})` },
        { status: 402 },
      );
    }

    // 5b. Send the customer an order confirmation email (never blocks the order).
    let emailSent = false;
    try {
      emailSent = await sendOrderConfirmation({
        to: recipient.email,
        orderId: order.id,
        items: cart.map((i) => ({
          name: i.name,
          variation: i.variation,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotalCents: quote.subtotalCents,
        shippingCents: quote.shippingCents,
        taxCents: quote.taxCents,
        totalCents: quote.totalCents,
        shippingLabel: quote.shippingLabel,
        recipient: {
          name: recipient.name,
          address1: recipient.address1,
          address2: recipient.address2,
          city: recipient.city,
          state_code: recipient.state_code,
          zip: recipient.zip,
          country_code: recipient.country_code || 'US',
        },
      });
    } catch (emailErr) {
      console.error('Order confirmation email failed:', emailErr);
    }

    // 6. Fulfill via Printful — idempotent on the Square order id.
    let printful: 'created' | 'exists' | 'failed' = 'failed';
    try {
      if (await printfulOrderExists(order.id)) {
        printful = 'exists';
      } else {
        const pfRecipient = resolveRecipient({
          name: recipient.name,
          address1: recipient.address1,
          address2: recipient.address2,
          city: recipient.city,
          state_code: recipient.state_code,
          country_code: recipient.country_code || 'US',
          zip: recipient.zip,
          phone: recipient.phone,
          email: recipient.email,
        });
        const items: PrintfulLineItem[] = quote.pf.map(([variant_id, quantity, templateId]) => ({
          variant_id,
          quantity,
          templateId: templateId || undefined,
        }));
        await createPrintfulOrder({
          externalId: order.id,
          recipient: pfRecipient,
          items,
          confirm: process.env.PRINTFUL_CONFIRM_ORDERS === 'true',
        });
        printful = 'created';
      }
    } catch (pfErr) {
      // Payment already succeeded — never fail the request here. The webhook
      // backup will retry from the order metadata.
      console.error('Printful order creation failed (webhook will retry):', pfErr);
      printful = 'failed';
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentId: payment?.id,
      totalCents: quote.totalCents,
      printful,
      emailSent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Payment failed';
    console.error('square-pay error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
