import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';
import fs from 'fs';
import path from 'path';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const CACHE_FILE = path.resolve(process.cwd(), 'printful-orders-cache.json');

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

// Enhanced type definitions
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

// Use Square's built-in types
import type { OrderLineItem } from 'square/legacy';
import type { Order } from 'square/legacy';

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
  // Increase polling window to catch more orders (15 minutes instead of 5)
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  
  try {
    console.log('Polling Square for orders updated since:', fifteenMinutesAgo.toISOString());
    console.log('Current cache size:', cache.size);
    console.log('Cached order IDs:', Array.from(cache));
    
    // Fetch orders updated in the last 5 minutes
    const ordersApi = client.ordersApi;
    const response = await ordersApi.searchOrders({
      locationIds: [process.env.SQUARE_LOCATION_ID!],
      query: {
        filter: {
          dateTimeFilter: {
            updatedAt: {
              startAt: fifteenMinutesAgo.toISOString(),
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
    console.log(`Found ${orders.length} orders to process`);
    
    // Log all orders for debugging
    orders.forEach(order => {
      const orderWithNote = order as Order & { note?: string };
      console.log(`Order ${order.id}: state=${order.state}, updatedAt=${order.updatedAt}, note=${orderWithNote.note ? 'present' : 'missing'}`);
    });
    
    let newOrders = 0;
    const printfulResponses = [];
    const errors = [];
    
    // Fetch mapping from /api/square-products
    const mappingRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/square-products`);
    const mappingData = await mappingRes.json();
    const variantMap: Record<string, string> = mappingData.variationToPrintful || {};
    
    for (const order of orders) {
      console.log(`Processing order ${order.id} with state: ${order.state}`);
      
      if (order.state !== 'COMPLETED') {
        console.log(`Skipping order ${order.id} - not completed`);
        continue;
      }
      
      if (!order.id || cache.has(order.id)) {
        console.log(`Skipping order ${order.id} - already processed`);
        continue;
      }

      // Get shipping address from Square order
      const recipient = order.fulfillments?.[0]?.shipmentDetails?.recipient;
      if (!recipient) {
        console.log(`Skipping order ${order.id} - no shipping info`);
        continue;
      }

      // Try to get cart items from order note first (preferred method)
      const note = ((order as unknown) as Record<string, unknown>).note as string | undefined;
      let items: CartItem[] | undefined;
      
      if (note) {
        try {
          const cartData: CartData = JSON.parse(note);
          console.log(`Order ${order.id} has cart data in note:`, cartData);
          
          if (cartData.items && Array.isArray(cartData.items)) {
            // Use the enhanced cart data with Printful variant IDs
            items = cartData.items.filter(item => item.printfulVariantId);
            
            if (items.length === 0) {
              console.warn(`Order ${order.id} has no items with Printful variant IDs`);
            }
          }
        } catch (parseError) {
          console.error(`Failed to parse cart data for order ${order.id}:`, parseError);
        }
      }
      
      // Fallback: use order.lineItems if no items in note
      if (!items && order.lineItems && Array.isArray(order.lineItems)) {
        console.log(`Order ${order.id} using fallback lineItems method`);
        items = order.lineItems
          .map((li: OrderLineItem) => {
            if (!li.catalogObjectId) return null;
            const variant_id = variantMap[li.catalogObjectId];
            if (!variant_id) {
              console.warn(`No Printful variant ID found for Square variation: ${li.catalogObjectId}`);
              return null;
            }
            return {
              id: li.catalogObjectId,
              name: li.name || 'Unknown Product',
              quantity: parseInt(li.quantity ? li.quantity.toString() : '1', 10),
              price: li.basePriceMoney && li.basePriceMoney.amount ? Number(li.basePriceMoney.amount) / 100 : 0,
              printfulVariantId: variant_id,
            };
          })
          .filter(Boolean) as CartItem[];
      }
      
      if (!items || items.length === 0) {
        console.log(`Skipping order ${order.id} - no valid items found`);
        continue;
      }

      // Validate shipping information - handle Square's FulfillmentRecipient type
      const recipientName = recipient.displayName || '';
      const recipientAddress = recipient.address;
      const recipientEmail = recipient.emailAddress || '';
      const recipientPhone = recipient.phoneNumber || '';
      
      if (!recipientName || !recipientAddress?.addressLine1 || !recipientAddress?.locality || 
          !recipientAddress?.administrativeDistrictLevel1 || !recipientAddress?.postalCode || !recipientEmail) {
        console.error(`Order ${order.id} missing required shipping fields`);
        errors.push({ orderId: order.id, error: 'Missing required shipping fields' });
        continue;
      }

      // Prepare Printful order payload
      const printfulItems = items.map(item => ({
        variant_id: parseInt(item.printfulVariantId!),
        quantity: item.quantity,
        retail_price: item.price.toFixed(2),
        name: item.name,
      }));

      const printfulOrderPayload = {
        external_id: order.id,
        recipient: {
          name: recipientName,
          address1: recipientAddress.addressLine1,
          address2: recipientAddress.addressLine2 || '',
          city: recipientAddress.locality,
          state_code: recipientAddress.administrativeDistrictLevel1,
          country_code: recipientAddress.country || 'US',
          zip: recipientAddress.postalCode,
          phone: recipientPhone,
          email: recipientEmail,
        },
        items: printfulItems,
      };

      console.log(`Creating Printful order for Square order ${order.id}:`, printfulOrderPayload);

      // Send to Printful with retry logic
      let printfulRes;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          printfulRes = await fetch('https://api.printful.com/orders', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(printfulOrderPayload),
          });
          
          if (printfulRes.ok) {
            break; // Success, exit retry loop
          }
          
          const errorData = await printfulRes.json();
          console.warn(`Printful API attempt ${retryCount + 1} failed for order ${order.id}:`, errorData);
          
          if (retryCount < maxRetries - 1) {
            console.log(`Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (fetchError) {
          console.error(`Printful API attempt ${retryCount + 1} failed for order ${order.id}:`, fetchError);
          if (retryCount < maxRetries - 1) {
            console.log(`Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
        retryCount++;
      }
      
      if (!printfulRes) {
        console.error(`All Printful API attempts failed for order ${order.id}`);
        errors.push({ orderId: order.id, error: 'All Printful API attempts failed' });
        continue;
      }
      
      const printfulResult = await printfulRes.json();
      printfulResponses.push({ orderId: order.id, printful: printfulResult });
      
      if (printfulRes.ok) {
        console.log(`Successfully created Printful order for Square order ${order.id}`);
        cache.add(order.id);
        newOrders++;
      } else {
        console.error(`Failed to create Printful order for Square order ${order.id}:`, printfulResult);
        errors.push({ orderId: order.id, error: 'Printful API error', details: printfulResult });
      }
    }
    
    saveCache(cache);
    console.log(`Poll complete. Processed ${newOrders} new orders, ${errors.length} errors`);
    
    return NextResponse.json({ 
      processed: newOrders, 
      errors,
      printfulResponses,
      cacheSize: cache.size 
    });
    
  } catch (error) {
    console.error('Error polling Square orders:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 