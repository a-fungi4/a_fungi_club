import crypto from 'crypto';

/**
 * Stateless one-time-password challenge for order-status lookups.
 *
 * request-otp: generate a 6-digit OTP, email it, and hand the browser an
 * HMAC-signed challenge token that embeds the order id and a hash of the OTP.
 * verify: the browser returns the challenge + the OTP the customer typed; we
 * recompute the hash and check it matches. No server-side storage needed.
 */

function secret(): string {
  const s = process.env.QUOTE_SIGNING_SECRET;
  if (!s) throw new Error('QUOTE_SIGNING_SECRET not set');
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateOtp(): string {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
}

/** Hash of an OTP bound to its order id (so a token can't be reused elsewhere). */
export function hashOtp(otp: string, orderId: string): string {
  return b64url(crypto.createHmac('sha256', secret()).update(`${orderId}:${otp.trim()}`).digest());
}

export interface OtpChallenge {
  v: 1;
  orderId: string;
  otpHash: string;
  exp: number; // unix seconds
}

export function signChallenge(payload: OtpChallenge): string {
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyChallenge(token: string): OtpChallenge | null {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload: OtpChallenge;
  try {
    payload = JSON.parse(Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  } catch {
    return null;
  }
  if (payload.v !== 1) return null;
  if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

/** Constant-time compare of two OTP hashes. */
export function otpHashesEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}
