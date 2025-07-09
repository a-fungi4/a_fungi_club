import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'square';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: 'production',
});

export async function POST(req: NextRequest) {
  try {
    const { orderNumber } = await req.json();
    if (!orderNumber) {
      return NextResponse.json({ error: 'Missing order number' }, { status: 400 });
    }
    const ordersApi = client.ordersApi;
    const response = await ordersApi.retrieveOrder(orderNumber);
    const order = response.result.order;
    if (!order) throw new Error('Order not found');
    // Extract shipping info from order
    const shipping = order?.fulfillments?.[0]?.shipmentDetails?.recipient || {};
    return NextResponse.json({ shipping });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch Square order' }, { status: 500 });
  }
} 