import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '@/lib/square';
import { getPrintfulOrderStatus } from '@/lib/printful';
import { hashOtp, otpHashesEqual, verifyChallenge } from '@/lib/otp';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { challenge, otp } = (await req.json()) as { challenge?: string; otp?: string };
    if (!challenge || !otp) {
      return NextResponse.json({ error: 'Missing code.' }, { status: 400 });
    }

    const payload = verifyChallenge(challenge);
    if (!payload) {
      return NextResponse.json({ error: 'Your code expired. Please request a new one.' }, { status: 400 });
    }
    if (!otpHashesEqual(hashOtp(otp, payload.orderId), payload.otpHash)) {
      return NextResponse.json({ error: 'That code is incorrect.' }, { status: 401 });
    }

    const orderId = payload.orderId;

    // Square order (state, items, total).
    let squareState: string | undefined;
    let createdAt: string | undefined;
    let totalCents: number | undefined;
    const items: { name: string; quantity: number }[] = [];
    try {
      const res = await squareClient.orders.get({ orderId });
      const order = res.order;
      squareState = order?.state;
      createdAt = order?.createdAt;
      const amt = order?.totalMoney?.amount;
      totalCents = amt != null ? Number(amt) : undefined;
      for (const li of order?.lineItems || []) {
        // Skip the Shipping / Sales Tax line items we add.
        if (li.name && !/^shipping/i.test(li.name) && !/^sales tax/i.test(li.name)) {
          items.push({ name: li.name, quantity: Number(li.quantity) || 1 });
        }
      }
    } catch {
      /* order lookup best-effort */
    }

    // Printful fulfillment status + tracking.
    const pf = await getPrintfulOrderStatus(orderId);

    return NextResponse.json({
      orderId,
      createdAt,
      squareState,
      totalCents,
      items,
      printfulStatus: pf.found ? pf.status : undefined,
      shipments: pf.shipments,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
