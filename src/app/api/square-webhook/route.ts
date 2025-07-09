import { NextRequest, NextResponse } from 'next/server';

// TODO: Import any necessary Square/Printful SDKs or utilities

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the webhook signature (optional, recommended for production)
    // TODO: Implement Square webhook signature verification

    // 2. Parse the webhook payload
    const payload = await req.json();
    console.log('Received Square webhook payload:', JSON.stringify(payload));

    // 3. Filter for 'payment.updated' events with status 'COMPLETED'
    const eventType = payload?.type;
    const payment = payload?.data?.object?.payment;
    if (eventType !== 'payment.updated' || payment?.status !== 'COMPLETED') {
      console.log('Ignoring event:', eventType, 'with status:', payment?.status);
      return NextResponse.json({ ignored: true });
    }

    // 4. Extract the order note (cart data) from the payment/order
    // The order note is typically attached to the order, not the payment
    const order = payload?.data?.object?.order || payment?.order;
    const note = order?.note;
    if (!note) {
      console.error('Order note not found in webhook payload.');
      return NextResponse.json({ error: 'Order note not found in webhook payload.' }, { status: 400 });
    }

    let cartData;
    try {
      cartData = JSON.parse(note);
      console.log('Parsed cart data:', cartData);
    } catch {
      console.error('Failed to parse cart data from note.');
      return NextResponse.json({ error: 'Failed to parse cart data from note.' }, { status: 400 });
    }

    // 5. Create Printful order
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
    if (!PRINTFUL_API_KEY) {
      console.error('Printful API key not set in environment variables.');
      return NextResponse.json({ error: 'Printful API key not configured.' }, { status: 500 });
    }

    // Assume cartData has recipient and items fields
    const printfulOrderPayload = {
      recipient: cartData.recipient, // { name, address1, city, state_code, country_code, zip, email, etc. }
      items: cartData.items,         // [ { variant_id, quantity, ... } ]
      // Add any other required fields here
    };

    let printfulResponse;
    try {
      printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(printfulOrderPayload),
      });
    } catch (err) {
      console.error('Error calling Printful API:', err);
      return NextResponse.json({ error: 'Failed to call Printful API.' }, { status: 500 });
    }

    const printfulResult = await printfulResponse.json();
    if (!printfulResponse.ok) {
      console.error('Printful API error:', printfulResult);
      return NextResponse.json({ error: 'Printful API error', details: printfulResult }, { status: 500 });
    }

    console.log('Printful order created:', printfulResult);

    // 6. Respond to Square
    return NextResponse.json({ success: true, printful: printfulResult });
  } catch (error) {
    // Log error for debugging
    console.error('Error handling Square webhook:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 