import { NextRequest, NextResponse } from 'next/server';

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

interface CartItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, cart, shipping } = await req.json();
    if (!orderNumber || !cart || !shipping) {
      return NextResponse.json({ error: 'Missing order info' }, { status: 400 });
    }

    // Map cart items to Printful line items (assumes cart item id is Printful variant id)
    const items = (cart as CartItem[]).map((item) => ({
      variant_id: item.id, // Make sure this matches Printful variant_id
      quantity: item.quantity,
      retail_price: item.price.toFixed(2),
      name: item.name,
    }));

    const printfulOrder = {
      external_id: orderNumber,
      recipient: {
        name: shipping.name,
        address1: shipping.address1,
        address2: shipping.address2 || '',
        city: shipping.city,
        state_code: shipping.state,
        country_code: shipping.country || 'US',
        zip: shipping.zip,
        phone: shipping.phone || '',
        email: shipping.email || '',
      },
      items,
      // Optionally: shipping, packing_slip, etc.
    };

    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(printfulOrder),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.result || data.error || 'Printful order failed' }, { status: 500 });
    }
    return NextResponse.json({ result: data.result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Printful order error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 