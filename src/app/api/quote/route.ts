import { NextRequest, NextResponse } from 'next/server';
import { getShippingRates, resolveRecipient, type PrintfulLineItem, type Recipient } from '@/lib/printful';
import { calculateSquareTaxCents } from '@/lib/square';
import { hashCart, signQuote, type QuotePayload } from '@/lib/quote';

export const runtime = 'nodejs';

interface CartItem {
  id: string; // Square variation id (= Printful external_variant_id)
  name: string;
  price: number; // dollars
  quantity: number;
  variation?: string;
}

const QUOTE_TTL_SECONDS = 15 * 60;

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

    // Each cart item's id is the Square variation id, which is Printful's
    // external_variant_id for the synced product — no SKU/template mapping needed.
    const pfItems: PrintfulLineItem[] = cart.map((i) => ({
      externalVariantId: i.id,
      quantity: i.quantity,
    }));

    const rates = await getShippingRates(pfItems, recipient);

    const subtotalCents = cart.reduce(
      (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
      0,
    );
    const currency = rates[0]?.currency || 'USD';
    const cartHash = hashCart(cart);
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
