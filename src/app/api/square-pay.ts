import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(req: NextRequest) {
  try {
    const { token, order } = await req.json();
    const paymentsApi = client.paymentsApi;
    const response = await paymentsApi.createPayment({
      sourceId: token,
      idempotencyKey: Math.random().toString(36).substring(2),
      amountMoney: {
        amount: order?.amount || 100, // Replace with real order amount in cents
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
    });
    return NextResponse.json({ success: true, payment: response.result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Payment failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
} 