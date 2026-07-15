import { NextRequest, NextResponse } from 'next/server';
import {
  getShippingRates,
  getTemplateVariantMap,
  resolveRecipient,
  variantMatchKey,
  type PrintfulLineItem,
  type Recipient,
} from '@/lib/printful';
import { calculateSquareTaxCents } from '@/lib/square';
import { hashCart, signQuote, type QuotePayload } from '@/lib/quote';

export const runtime = 'nodejs';

interface CartItem {
  id: string; // Square variation id
  name: string;
  price: number; // dollars
  quantity: number;
  variation?: string;
}

const QUOTE_TTL_SECONDS = 15 * 60;

interface VariantEntry {
  variantId?: number;
  templateId?: number;
  color?: string | null;
  size?: string | null;
}

async function getVariantMap(): Promise<Record<string, VariantEntry>> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/square-products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load product mapping');
  const data = await res.json();
  return data.variationToPrintful || {};
}

export async function POST(req: NextRequest) {
  try {
    const { cart, recipient: rawRecipient } = (await req.json()) as {
      cart: CartItem[];
      recipient: Recipient;
    };

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (!rawRecipient?.zip) {
      return NextResponse.json({ error: 'A ZIP/postal code is required' }, { status: 400 });
    }

    const recipient = resolveRecipient(rawRecipient);

    // Map each Square variation to its Printful variant (+ template) id.
    const variantMap = await getVariantMap();
    const pfItems: PrintfulLineItem[] = [];
    const missing: string[] = [];
    const unmatched: string[] = [];
    for (const item of cart) {
      const entry = variantMap[item.id];
      if (!entry) {
        missing.push(item.name || item.id);
        continue;
      }
      let variantId = entry.variantId;
      // GTIN-based mapping: resolve the variant from the template by color/size.
      if (variantId == null && entry.templateId != null) {
        try {
          const tplMap = await getTemplateVariantMap(entry.templateId);
          variantId = tplMap[variantMatchKey(entry.color, entry.size)];
        } catch {
          /* fall through to unmatched */
        }
        if (variantId == null) {
          unmatched.push(item.name || `${entry.color ?? ''} ${entry.size ?? ''}`.trim());
          continue;
        }
      }
      if (variantId == null) {
        missing.push(item.name || item.id);
        continue;
      }
      pfItems.push({ variant_id: variantId, quantity: item.quantity, templateId: entry.templateId });
    }
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `These items aren't linked to Printful yet: ${missing.join(', ')}` },
        { status: 400 },
      );
    }
    if (unmatched.length > 0) {
      return NextResponse.json(
        {
          error: `Couldn't match these to a Printful color/size (check the variation names match Printful): ${unmatched.join(', ')}`,
        },
        { status: 400 },
      );
    }

    const rates = await getShippingRates(pfItems, recipient);

    const subtotalCents = cart.reduce(
      (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
      0,
    );
    const currency = rates[0]?.currency || 'USD';
    const cartHash = hashCart(cart);
    // pf carries [catalogVariantId, quantity, templateId] (0 = no template).
    const pf: [number, number, number][] = pfItems.map((i) => [
      i.variant_id,
      i.quantity,
      i.templateId ?? 0,
    ]);
    const exp = Math.floor(Date.now() / 1000) + QUOTE_TTL_SECONDS;
    const squareLineItems = cart.map((i) => ({ catalogObjectId: i.id, quantity: i.quantity }));

    // Tax comes from Square (applies whatever tax rules the seller configured).
    // It can depend on the shipping amount, so compute per shipping option.
    const options = await Promise.all(
      rates.map(async (rate) => {
        const shippingCents = Math.round(parseFloat(rate.rate) * 100);
        const taxCents = await calculateSquareTaxCents(squareLineItems, shippingCents, recipient);
        const totalCents = subtotalCents + shippingCents + taxCents;

        const payload: QuotePayload = {
          v: 1,
          currency,
          subtotalCents,
          shippingCents,
          shippingLabel: rate.name,
          taxCents,
          totalCents,
          cartHash,
          pf,
          zip: recipient.zip,
          country: recipient.country_code || 'US',
          exp,
        };

        return {
          id: rate.id,
          label: rate.name,
          shippingCents,
          taxCents,
          totalCents,
          minDeliveryDays: rate.minDeliveryDays,
          maxDeliveryDays: rate.maxDeliveryDays,
          token: signQuote(payload),
        };
      }),
    );

    return NextResponse.json({ currency, subtotalCents, options });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to calculate shipping & tax';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
