import { NextRequest, NextResponse } from 'next/server';

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

export async function POST(req: NextRequest) {
  if (!PRINTFUL_API_KEY) {
    return NextResponse.json({ error: 'Printful API key not set' }, { status: 500 });
  }
  try {
    const { recipient, items } = await req.json();
    if (!recipient || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing recipient or items' }, { status: 400 });
    }
    const res = await fetch('https://api.printful.com/shipping/rates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, items }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Printful shipping error' }, { status: 500 });
    }
    // Find the lowest shipping rate
    const rates = data.result || [];
    if (!Array.isArray(rates) || rates.length === 0) {
      return NextResponse.json({ error: 'No shipping rates found' }, { status: 404 });
    }
    const lowest = rates.reduce((min, r) => (r.rate < min.rate ? r : min), rates[0]);
    return NextResponse.json({ result: lowest.rate });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Shipping API error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 