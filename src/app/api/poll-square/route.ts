import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';
import fs from 'fs';
import path from 'path';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const CACHE_FILE = path.resolve('/tmp/printful-orders-cache.json');

// Load or initialize the cache of processed Square order IDs
function loadCache(): Set<string> {
  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf-8');
    return new Set(JSON.parse(data));
  } catch {
    return new Set();
  }
}

function saveCache(cache: Set<string>) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(Array.from(cache)), 'utf-8');
}

export async function GET(req: NextRequest) {
  // Security: Require secret token
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (token !== process.env.SQUARE_POLL_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!PRINTFUL_API_KEY) {
    return NextResponse.json({ error: 'Printful API key not set' }, { status: 500 });
  }
  const cache = loadCache();
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  try {
    // Fetch orders updated in the last 5 minutes
    const ordersApi = client.ordersApi;
    const response = await ordersApi.searchOrders({
      locationIds: [process.env.SQUARE_LOCATION_ID!],
      query: {
        filter: {
          dateTimeFilter: {
            updatedAt: {
              startAt: fiveMinutesAgo.toISOString(),
              endAt: now.toISOString(),
            },
          },
        },
        sort: {
          sortField: 'UPDATED_AT',
          sortOrder: 'DESC',
        },
      },
    });
    const orders = response.result.orders || [];
    let newOrders = 0;
    const printfulResponses = [];
    for (const order of orders) {
      if (order.state !== 'COMPLETED') continue;
      if (!order.id || cache.has(order.id)) continue; // Already processed
      // Extract cart data from order note
      // @ts-expect-error: Square Order type may not include 'note', but it is present in the payload
      const note = order.note;
      if (!note) continue;
      let cartData;
      try {
        cartData = JSON.parse(note);
      } catch {
        continue;
      }
      // Prepare Printful order payload
      const printfulOrderPayload = {
        recipient: cartData.recipient,
        items: cartData.items,
      };
      // Send to Printful
      const printfulRes = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(printfulOrderPayload),
      });
      const printfulResult = await printfulRes.json();
      printfulResponses.push({ orderId: order.id, printful: printfulResult });
      if (printfulRes.ok) {
        cache.add(order.id);
        newOrders++;
      }
    }
    saveCache(cache);
    return NextResponse.json({ processed: newOrders, printfulResponses });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 