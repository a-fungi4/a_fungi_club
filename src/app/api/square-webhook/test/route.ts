import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const payload = JSON.parse(body);
    
    console.log('=== WEBHOOK TEST ENDPOINT ===');
    console.log('Headers:', Object.fromEntries(req.headers.entries()));
    console.log('Body:', JSON.stringify(payload, null, 2));
    
    // Simulate the webhook processing logic
    const eventType = payload?.type;
    const payment = payload?.data?.object?.payment;
    const order = payload?.data?.object?.order;
    
    console.log('Event type:', eventType);
    console.log('Payment status:', payment?.status);
    console.log('Order ID:', order?.id);
    console.log('Order note:', order?.note);
    
    if (order?.note) {
      try {
        const cartData = JSON.parse(order.note);
        console.log('Parsed cart data:', JSON.stringify(cartData, null, 2));
        
        // Check if Printful variant IDs are present
        if (cartData.items && Array.isArray(cartData.items)) {
          const missingVariantIds = cartData.items.filter((item: Record<string, unknown>) => !item.printfulVariantId);
          if (missingVariantIds.length > 0) {
            console.warn('Items missing Printful variant IDs:', missingVariantIds);
          } else {
            console.log('All items have Printful variant IDs');
          }
        }
      } catch (parseError) {
        console.error('Failed to parse cart data:', parseError);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test endpoint processed successfully',
      eventType,
      paymentStatus: payment?.status,
      orderId: order?.id
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({ 
      error: 'Test endpoint error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 