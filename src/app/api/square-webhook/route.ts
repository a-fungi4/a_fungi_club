import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from './verifySignature';

// Types for better type safety
interface SquarePayment {
  id: string;
  status: string;
  orderId?: string;
  amountMoney?: {
    amount: number;
    currency: string;
  };
}

interface SquareOrder {
  id: string;
  note?: string;
  lineItems?: Array<{
    uid: string;
    name: string;
    quantity: string;
    basePriceMoney: {
      amount: number;
      currency: string;
    };
    variationName?: string;
  }>;
}

interface SquareWebhookPayload {
  type: string;
  data: {
    object: {
      payment?: SquarePayment;
      order?: SquareOrder;
    };
  };
}

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  variation?: string;
  printfulVariantId?: string;
}

interface ShippingInfo {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone?: string;
  email: string;
}

interface CartData {
  recipient: ShippingInfo;
  items: CartItem[];
}

export async function POST(req: NextRequest) {
  console.log('=== SQUARE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Headers:', Object.fromEntries(req.headers.entries()));
  
  try {
    // 1. Verify the webhook signature (recommended for production)
    const signature = req.headers.get('x-square-signature');
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/square-webhook`;
    
    // Get the raw body for signature verification
    const body = await req.text();
    
    if (!verifyWebhookSignature(body, signature, webhookUrl)) {
      console.warn('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    // Parse the body back to JSON
    const payload: SquareWebhookPayload = JSON.parse(body);
    console.log('Received Square webhook payload:', JSON.stringify(payload, null, 2));

    // 3. Handle different event types
    const eventType = payload?.type;
    const payment = payload?.data?.object?.payment;
    const order = payload?.data?.object?.order;

    console.log('Event type:', eventType);
    console.log('Payment status:', payment?.status);
    console.log('Order ID:', order?.id);

    // Only process completed payments
    if (eventType !== 'payment.updated' || payment?.status !== 'COMPLETED') {
      console.log('Ignoring event:', eventType, 'with status:', payment?.status);
      return NextResponse.json({ ignored: true, reason: 'Not a completed payment' });
    }

    // 4. Extract and validate order data
    if (!order?.note) {
      console.error('Order note not found in webhook payload');
      return NextResponse.json({ 
        error: 'Order note not found in webhook payload',
        orderId: order?.id 
      }, { status: 400 });
    }

    let cartData: CartData;
    try {
      cartData = JSON.parse(order.note);
      console.log('Parsed cart data:', JSON.stringify(cartData, null, 2));
    } catch (parseError) {
      console.error('Failed to parse cart data from note:', parseError);
      return NextResponse.json({ 
        error: 'Failed to parse cart data from note',
        orderId: order.id 
      }, { status: 400 });
    }

    // 5. Validate cart data structure
    if (!cartData.recipient || !cartData.items || !Array.isArray(cartData.items)) {
      console.error('Invalid cart data structure:', cartData);
      return NextResponse.json({ 
        error: 'Invalid cart data structure',
        orderId: order.id 
      }, { status: 400 });
    }

    if (cartData.items.length === 0) {
      console.error('Cart is empty');
      return NextResponse.json({ 
        error: 'Cart is empty',
        orderId: order.id 
      }, { status: 400 });
    }

    // 6. Validate shipping information
    const recipient = cartData.recipient;
    const requiredFields = ['name', 'address1', 'city', 'state', 'zip', 'email'];
    const missingFields = requiredFields.filter(field => !recipient[field as keyof ShippingInfo]);
    
    if (missingFields.length > 0) {
      console.error('Missing required shipping fields:', missingFields);
      return NextResponse.json({ 
        error: `Missing required shipping fields: ${missingFields.join(', ')}`,
        orderId: order.id 
      }, { status: 400 });
    }

    // 7. Create Printful order
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
    if (!PRINTFUL_API_KEY) {
      console.error('Printful API key not set in environment variables');
      return NextResponse.json({ 
        error: 'Printful API key not configured',
        orderId: order.id 
      }, { status: 500 });
    }

    // Map cart items to Printful format
    const printfulItems = cartData.items.map(item => {
      if (!item.printfulVariantId) {
        throw new Error(`Missing Printful variant ID for item: ${item.name}`);
      }

      return {
        variant_id: parseInt(item.printfulVariantId),
        quantity: item.quantity,
        retail_price: item.price.toFixed(2),
        name: item.name,
      };
    });

    const printfulOrderPayload = {
      external_id: order.id, // Use Square order ID as external reference
      recipient: {
        name: recipient.name,
        address1: recipient.address1,
        address2: recipient.address2 || '',
        city: recipient.city,
        state_code: recipient.state,
        country_code: recipient.country || 'US',
        zip: recipient.zip,
        phone: recipient.phone || '',
        email: recipient.email,
      },
      items: printfulItems,
      // Optional: Add shipping method if needed
      // shipping: 'STANDARD',
    };

    console.log('Sending to Printful:', JSON.stringify(printfulOrderPayload, null, 2));

    // 8. Call Printful API
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
    } catch (fetchError) {
      console.error('Error calling Printful API:', fetchError);
      return NextResponse.json({ 
        error: 'Failed to call Printful API',
        orderId: order.id,
        details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
      }, { status: 500 });
    }

    const printfulResult = await printfulResponse.json();
    
    if (!printfulResponse.ok) {
      console.error('Printful API error:', printfulResult);
      return NextResponse.json({ 
        error: 'Printful API error',
        orderId: order.id,
        details: printfulResult 
      }, { status: 500 });
    }

    console.log('Printful order created successfully:', printfulResult);

    // 9. Respond to Square
    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      printfulOrderId: printfulResult.result?.id,
      printful: printfulResult 
    });

  } catch (error) {
    // Log error for debugging
    console.error('Error handling Square webhook:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 