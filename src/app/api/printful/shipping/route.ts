import { NextRequest, NextResponse } from 'next/server';
import zipcodes from 'zipcodes';

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID || 16326700;

export async function POST(req: NextRequest) {
  if (!PRINTFUL_API_KEY) {
    return NextResponse.json({ error: 'Printful API key not set' }, { status: 500 });
  }
  try {
    const body = await req.json();
    const { recipient: origRecipient, items } = body;
    if (!origRecipient || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing recipient or items' }, { status: 400 });
    }
    let recipient = origRecipient;
    // If only zip (and maybe country_code) is provided, look up state/city
    if (recipient.zip && (!recipient.state_code || !recipient.city)) {
      const lookup = zipcodes.lookup(recipient.zip);
      if (!lookup) {
        return NextResponse.json({ error: 'Invalid ZIP code' }, { status: 400 });
      }
      recipient = {
        country_code: recipient.country_code || 'US',
        state_code: lookup.state,
        city: lookup.city,
        zip: recipient.zip,
        ...recipient // allow address1/address2 etc. to pass through
      };
    }
    if (!recipient.country_code) recipient.country_code = 'US';
    const payload = {
      store_id: Number(PRINTFUL_STORE_ID),
      recipient,
      items,
    };
    const res = await fetch('https://api.printful.com/shipping/rates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.result || data.error?.message || 'Printful error', details: data },
        { status: res.status }
      );
    }
    const rates = data.result;
    if (!Array.isArray(rates) || rates.length === 0) {
      return NextResponse.json({ error: 'No shipping rates found', details: data }, { status: 404 });
    }
    const lowest = rates.reduce((min, r) => (r.rate < min.rate ? r : min), rates[0]);
    return NextResponse.json({ result: lowest });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Unknown error' }, { status: 500 });
  }
} 