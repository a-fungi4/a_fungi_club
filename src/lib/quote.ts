import crypto from 'crypto';

/**
 * A signed quote is the server's promise of exactly what the customer will be
 * charged for a specific cart + address + chosen shipping option. The client
 * receives it opaque and hands it back at pay time; the pay route re-verifies
 * it so the browser can never move the price.
 */
export interface QuotePayload {
  v: 1;
  currency: string;
  subtotalCents: number;
  shippingCents: number;
  shippingLabel: string;
  taxCents: number;
  totalCents: number;
  /** Hash of the cart contents this quote was issued for. */
  cartHash: string;
  /** Destination, so pay can rebuild the Printful recipient. */
  zip: string;
  country: string;
  /** Unix seconds expiry. */
  exp: number;
}

function secret(): string {
  const s = process.env.QUOTE_SIGNING_SECRET;
  if (!s) throw new Error('QUOTE_SIGNING_SECRET not set');
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Stable hash of the cart so a quote can't be reused for a different cart. */
export function hashCart(
  items: { id: string; quantity: number; price: number }[],
): string {
  const canonical = items
    .map((i) => `${i.id}:${i.quantity}:${Math.round(i.price * 100)}`)
    .sort()
    .join('|');
  return crypto.createHash('sha256').update(canonical).digest('hex').slice(0, 16);
}

export function signQuote(payload: QuotePayload): string {
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  return `${body}.${sig}`;
}

/** Returns the payload if the token is authentic and unexpired, else null. */
export function verifyQuote(token: string): QuotePayload | null {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload: QuotePayload;
  try {
    payload = JSON.parse(Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  } catch {
    return null;
  }
  if (payload.v !== 1) return null;
  if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}
