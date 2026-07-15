import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '@/lib/square';
import { generateOtp, hashOtp, signChallenge } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/email';

export const runtime = 'nodejs';

const OTP_TTL_SECONDS = 10 * 60;

export async function POST(req: NextRequest) {
  try {
    const { orderId, email } = (await req.json()) as { orderId?: string; email?: string };
    if (!orderId || !email) {
      return NextResponse.json({ error: 'Order number and email are required.' }, { status: 400 });
    }

    // Look up the Square order and confirm the email matches what was used at checkout.
    let storedEmail: string | undefined;
    try {
      const res = await squareClient.orders.get({ orderId: orderId.trim() });
      storedEmail = res.order?.metadata?.ship_email || undefined;
    } catch {
      storedEmail = undefined;
    }

    if (!storedEmail || storedEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
      // Generic message — don't reveal whether the order or email exists.
      return NextResponse.json(
        { error: "We couldn't find an order matching that number and email." },
        { status: 404 },
      );
    }

    const otp = generateOtp();
    const sent = await sendOtpEmail(storedEmail, otp);
    if (!sent) {
      return NextResponse.json(
        { error: 'Could not send the code right now. Please try again later.' },
        { status: 502 },
      );
    }

    const challenge = signChallenge({
      v: 1,
      orderId: orderId.trim(),
      otpHash: hashOtp(otp, orderId.trim()),
      exp: Math.floor(Date.now() / 1000) + OTP_TTL_SECONDS,
    });

    return NextResponse.json({ challenge });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send code';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
