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
  id: string; // Square variation ID
}

interface CartItemWithPrintful extends CartItem {
  printfulVariantId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { cart, shipping, redirectUrl } = await req.json();
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Fetch the variant mapping to get Printful variant IDs
    let variantMap: Record<string, string> = {};
    try {
      const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/square-products`);
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        variantMap = productsData.variationToPrintful || {};
      }
    } catch (error) {
      console.warn('Failed to fetch variant mapping:', error);
    }

    // Enhance cart items with Printful variant IDs
    const enhancedCart: CartItemWithPrintful[] = (cart as CartItem[]).map((item) => {
      const printfulVariantId = variantMap[item.id];
      if (!printfulVariantId) {
        console.warn(`No Printful variant ID found for Square variation: ${item.id}`);
      }
      
      return {
        ...item,
        printfulVariantId,
      };
    });

    const lineItems = enhancedCart.map((item) => ({
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
          pricingOptions: {
            autoApplyTaxes: true
          },
          // @ts-expect-error: Square Order type may not include 'note', but it is supported by the API
          note: shipping ? JSON.stringify({ recipient: shipping, items: enhancedCart }) : undefined,
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