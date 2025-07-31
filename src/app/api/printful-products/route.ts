import { NextResponse } from 'next/server';

// Types for Printful API responses
interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  synced_product?: {
    description?: string;
    thumbnail_url?: string;
  };
}

interface PrintfulVariant {
  id: number;
  name: string;
  retail_price: string;
  sku: string;
  options?: Array<{ id: number; value: string; type: string; name: string }>;
  files?: Array<{ type: string; url: string }>;
}

interface PrintfulProductDetail {
  id: number;
  external_id: string;
  name: string;
  synced_product?: {
    description?: string;
    thumbnail_url?: string;
  };
  sync_variants?: PrintfulVariant[];
}

export async function GET() {
  const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
  const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;
  
  if (!PRINTFUL_API_KEY) {
    return NextResponse.json({ error: 'Missing PRINTFUL_API_KEY' }, { status: 500 });
  }
  if (!PRINTFUL_STORE_ID) {
    return NextResponse.json({ error: 'Missing PRINTFUL_STORE_ID' }, { status: 500 });
  }

  try {
    // Fetch all products from the specific Printful store (v1 endpoint)
    const productsRes = await fetch(`https://api.printful.com/store/products?store_id=${PRINTFUL_STORE_ID}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });
    
    const contentType = productsRes.headers.get('content-type');
    const productsData = await productsRes.json();
    
    console.log('Printful products list response:', JSON.stringify(productsData, null, 2));
    
    if (!productsRes.ok) {
      // Handle specific Square store error
      if (productsData.error?.message?.includes('Manual Order / API platform')) {
        return NextResponse.json({ 
          error: 'Square store detected',
          message: 'This Printful store is connected to Square and cannot be accessed via the v1 API. Products are managed through Square integration.',
          storeType: 'square',
          recommendation: 'Use manual variant mappings for order processing'
        }, { status: 200 }); // Return 200 since this is expected behavior
      }
      
      // Try to parse RFC 9457 error
      if (contentType && contentType.includes('application/problem+json')) {
        const error = productsData;
        return NextResponse.json({ 
          error: error.title || 'Printful API error', 
          detail: error.detail, 
          type: error.type, 
          status: error.status 
        }, { status: productsRes.status });
      }
      
      return NextResponse.json({ 
        error: 'Failed to fetch products from Printful',
        details: productsData
      }, { status: 500 });
    }
    
    const products: PrintfulProduct[] = productsData.result || [];

    // For each product, fetch its details (to get variants) from v1 endpoint
    const detailedProducts = await Promise.all(
      products.map(async (product: PrintfulProduct) => {
        const detailRes = await fetch(`https://api.printful.com/store/products/${product.id}?store_id=${PRINTFUL_STORE_ID}`, {
          headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
        });
        const detailContentType = detailRes.headers.get('content-type');
        const detailData = await detailRes.json();
        
        console.log(`Printful product detail for id ${product.id}:`, JSON.stringify(detailData, null, 2));
        
        if (!detailRes.ok) {
          if (detailContentType && detailContentType.includes('application/problem+json')) {
            // skip this product if error
            return null;
          }
          return null;
        }
        
        const p: PrintfulProductDetail = detailData.result;
        
        // Map variants to variations
        const variations = (p.sync_variants || []).map((v: PrintfulVariant) => {
          // Try to extract color and size from options if present
          let color: string | null = null;
          let size: string | null = null;
          if (Array.isArray(v.options)) {
            for (const opt of v.options) {
              if (opt.type === 'color' || opt.name.toLowerCase() === 'color') color = opt.value;
              if (opt.type === 'size' || opt.name.toLowerCase() === 'size') size = opt.value;
            }
          }
          // Try to get image from files if present
          let image: string | undefined = undefined;
          if (Array.isArray(v.files)) {
            const preview = v.files.find(f => f.type === 'preview');
            if (preview && preview.url) image = preview.url;
          }
          return {
            id: String(v.id),
            name: v.name,
            price: v.retail_price,
            sku: v.sku,
            color,
            size,
            image,
          };
        });
        
        // Set product price from first variation if available
        const price = variations.length > 0 ? variations[0].price : '';
        
        return {
          id: String(p.id),
          name: p.name,
          price,
          description: p.synced_product?.description || '',
          image: p.synced_product?.thumbnail_url || '',
          variations,
        };
      })
    );

    // Filter out any failed fetches
    const filtered = detailedProducts.filter(Boolean);
    return NextResponse.json(filtered);
    
  } catch (err) {
    console.error('Printful API error:', err);
    return NextResponse.json({ 
      error: 'Unexpected error', 
      details: String(err) 
    }, { status: 500 });
  }
} 