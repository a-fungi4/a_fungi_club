import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;
const SQUARE_UPDATE_VARIATION_URL = process.env.SQUARE_UPDATE_VARIATION_URL || 'http://localhost:3000/api/square-update-variation';

if (!PRINTFUL_API_KEY) throw new Error('Missing PRINTFUL_API_KEY');
if (!PRINTFUL_STORE_ID) throw new Error('Missing PRINTFUL_STORE_ID');

console.log('PRINTFUL_STORE_ID:', PRINTFUL_STORE_ID);

interface PrintfulResponse<T> {
  result: T;
  error?: string;
}

interface PrintfulProduct {
  id: number;
  name: string;
}

interface PrintfulVariant {
  id: number;
  name: string;
}

interface PrintfulProductDetail {
  variants: PrintfulVariant[];
}

interface SquareResponse {
  products: Array<{
    name: string;
    variations: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

async function fetchPrintfulSyncProducts() {
  const url = `https://api.printful.com/store/products?store_id=${PRINTFUL_STORE_ID}`;
  console.log('Fetching from:', url);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  const data = await res.json() as PrintfulResponse<PrintfulProduct[]>;
  if (!res.ok) throw new Error('Printful API error: ' + JSON.stringify(data));
  return data.result;
}

async function fetchPrintfulVariants(productId: number) {
  const res = await fetch(`https://api.printful.com/store/products/${productId}?store_id=${PRINTFUL_STORE_ID}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  const data = await res.json() as PrintfulResponse<PrintfulProductDetail>;
  if (!res.ok) throw new Error('Printful API error: ' + JSON.stringify(data));
  return data.result.variants;
}

async function fetchSquareProducts() {
  const res = await fetch('http://localhost:3000/api/square-products');
  const data = await res.json() as SquareResponse;
  if (!res.ok) throw new Error('Square API error: ' + JSON.stringify(data));
  return data.products;
}

async function updateSquareVariation(variationId: string, printfulVariantId: string) {
  const res = await fetch(SQUARE_UPDATE_VARIATION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ variationId, printfulVariantId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Square update error: ' + JSON.stringify(data));
  return data;
}

(async () => {
  const printfulProducts = await fetchPrintfulSyncProducts();
  const squareProducts = await fetchSquareProducts();
  // Build Printful variant map: { 'Product Name|Variant Name': { id, ... } }
  const printfulVariantMap = {} as Record<string, { id: number, name: string, productName: string }>;
  for (const pfProduct of printfulProducts) {
    const variants = await fetchPrintfulVariants(pfProduct.id);
    for (const v of variants) {
      const key = `${pfProduct.name.trim().toLowerCase()}|${v.name.trim().toLowerCase()}`;
      printfulVariantMap[key] = { id: v.id, name: v.name, productName: pfProduct.name };
    }
  }
  let updated = 0, notFound = 0;
  for (const sqProduct of squareProducts) {
    for (const variation of sqProduct.variations) {
      const key = `${sqProduct.name.trim().toLowerCase()}|${variation.name.trim().toLowerCase()}`;
      const pfVariant = printfulVariantMap[key];
      if (pfVariant) {
        try {
          await updateSquareVariation(variation.id, pfVariant.id.toString());
          console.log(`Updated Square variation ${variation.id} (${key}) -> Printful variant ${pfVariant.id}`);
          updated++;
        } catch (err) {
          console.error(`Failed to update Square variation ${variation.id}:`, err);
        }
      } else {
        console.warn(`No Printful match for Square variation ${variation.id} (${key})`);
        notFound++;
      }
    }
  }
  console.log(`\nSync complete. Updated: ${updated}, Not matched: ${notFound}`);
})(); 