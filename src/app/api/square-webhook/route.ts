import { NextRequest, NextResponse } from 'next/server';

// TODO: Import any necessary Square/Printful SDKs or utilities

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the webhook signature (optional, recommended for production)
    // TODO: Implement Square webhook signature verification

    // 2. Parse the webhook payload
    const payload = await req.json();

    // 3. Extract the order note (cart data) from the payload
    // TODO: Adjust the path to the note field based on Square's webhook structure
    const note = payload?.data?.object?.order?.note;
    if (!note) {
      return NextResponse.json({ error: 'Order note not found in webhook payload.' }, { status: 400 });
    }

    try {
      JSON.parse(note);
      // TODO: Use parsed cartData to create an order in Printful
    } catch {
      return NextResponse.json({ error: 'Failed to parse cart data from note.' }, { status: 400 });
    }

    // 4. Respond to Square
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error for debugging
    console.error('Error handling Square webhook:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 