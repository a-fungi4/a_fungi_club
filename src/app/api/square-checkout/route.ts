import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'square/legacy';

const client = new Client({
  bearerAuthCredentials: {
    accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  },
});

// Define a type for cart items
interface CartItem {
  name: string;
  quantity: number;
  price: number;
  variation?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { cart, shipping, redirectUrl } = await req.json();
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    const lineItems = (cart as CartItem[]).map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency: 'USD',
      },
      variationName: item.variation || undefined,
    }));
    const checkoutApi = client.checkoutApi;
    const response = await checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
      idempotencyKey: Math.random().toString(36).substring(2),
      order: {
        order: {
          locationId: process.env.SQUARE_LOCATION_ID!,
          lineItems,
          // @ts-expect-error: Square Order type may not include 'note', but it is supported by the API
          note: shipping ? JSON.stringify({ recipient: shipping, items: cart }) : undefined,
        },
      },
      askForShippingAddress: true,
      redirectUrl: redirectUrl || process.env.SQUARE_CHECKOUT_REDIRECT_URL,
    });
    const checkoutUrl = response.result.checkout?.checkoutPageUrl;
    if (!checkoutUrl) throw new Error('No checkout URL returned');
    return NextResponse.json({ url: checkoutUrl });
  } catch (error: unknown) {
    let message = 'Failed to create checkout';
    if (error instanceof Error && error.message) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 