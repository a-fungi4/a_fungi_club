import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

// Minimal types for this API
interface CatalogImage {
  id: string;
  type: 'IMAGE';
  imageData?: { url?: string; name?: string };
}
interface CatalogItemVariation {
  id: string;
  type: 'ITEM_VARIATION';
  itemVariationData?: {
    name?: string;
    description?: string;
    sku?: string;
    upc?: string;
    priceMoney?: { amount: number };
    imageIds?: string[];
    itemOptionValues?: Array<{
      itemOptionId: string;
      itemOptionValueId: string;
    }>;
    metadata?: {
      printful_variant_id?: string;
    };
  };
}
interface CatalogItem {
  id: string;
  type: 'ITEM';
  itemData?: {
    name?: string;
    description?: string;
    imageUrl?: string;
    imageIds?: string[];
    variations?: CatalogItemVariation[];
    categories?: Array<{
      id: string;
      name: string;
    }>;
  };
}
interface CatalogItemOption {
  id: string;
  type: 'ITEM_OPTION';
  itemOptionData?: {
    name?: string;
  };
}
interface CatalogCategory {
  id: string;
  type: 'CATEGORY';
  categoryData?: {
    name?: string;
  };
}
type CatalogObject = CatalogItem | CatalogImage | CatalogItemOption | CatalogCategory | CatalogItemVariation;

function replacer(key: string, value: unknown): unknown {
  return typeof value === 'bigint' ? value.toString() : value;
}

export async function GET() {
  console.log('GET /api/square-products: handler start');
  try {
    // Fetch all ITEM, IMAGE, ITEM_OPTION, and CATEGORY objects in one call
    const page = await client.catalog.list({ types: 'ITEM,IMAGE,ITEM_OPTION,CATEGORY' });
    const items: CatalogItem[] = [];
    const images: CatalogImage[] = [];
    const itemOptions: CatalogItemOption[] = [];
    const categories: CatalogCategory[] = [];
    // Printful mapping per Square variation. Two ways to link a variation:
    //   1. GTIN/upc field = Printful TEMPLATE id (same value for every variation
    //      of the item). We resolve the variant id later by matching color/size.
    //   2. SKU = "PF-<variantId>-T<templateId>" or "PF-<variantId>" (explicit).
    // Entries may carry color/size so the quote route can resolve case 1.
    const variationToPrintful: Record<
      string,
      { variantId?: number; templateId?: number; color?: string | null; size?: string | null }
    > = {};
    for await (const obj of page as AsyncIterable<CatalogObject>) {
      if (obj.type === 'ITEM') items.push(obj as CatalogItem);
      if (obj.type === 'IMAGE') images.push(obj as CatalogImage);
      if (obj.type === 'ITEM_OPTION') itemOptions.push(obj as CatalogItemOption);
      if (obj.type === 'CATEGORY') categories.push(obj as CatalogCategory);
    }
    // Log raw itemData for debugging categoryId, handling BigInt
   // for (const item of items) {
   //   if (item.itemData) {
   //     console.log('DEBUG itemData:', JSON.stringify(item.itemData, (key, value) =>
   //       typeof value === 'bigint' ? value.toString() : value, 2));
   //   }
   // }
    // Build image_id -> url map
    const imageMap: Record<string, string> = {};
    // Map an image NAME (lowercased, e.g. "red", "graphite") -> its URL, so a
    // variation's color can be matched to the correct color mockup.
    const imageNameToUrl: Record<string, string> = {};
    for (const img of images) {
      if (img.id && img.imageData && img.imageData.url) {
        imageMap[img.id] = img.imageData.url;
        const nm = img.imageData.name?.trim().toLowerCase();
        if (nm && !imageNameToUrl[nm]) imageNameToUrl[nm] = img.imageData.url;
      }
    }
    // Build option and value maps
    const optionIdToName: Record<string, string> = {};
    for (const opt of itemOptions) {
      if (opt.id && opt.itemOptionData && opt.itemOptionData.name) {
        optionIdToName[opt.id] = opt.itemOptionData.name;
      }
    }
    // Build category_id -> name map
    const categoryIdToName: Record<string, string> = {};
    for (const cat of categories) {
      if (cat.id && cat.categoryData && cat.categoryData.name) {
        categoryIdToName[cat.id] = cat.categoryData.name;
      }
    }
    // Map products to include image URL and resolved variation options
    const products = items.map(item => {
      // All item-level images (every color mockup), de-duplicated.
      const images = Array.from(
        new Set((item.itemData?.imageIds || []).map(id => imageMap[id]).filter(Boolean)),
      ) as string[];
      let image = '';
      if (item.itemData?.imageUrl) {
        image = item.itemData.imageUrl;
      } else if (images.length > 0) {
        image = images[0];
      }
      // Get price from first variation
      let price = 'N/A';
      const variations = (item.itemData?.variations || []).map(variation => {
        const v = variation.itemVariationData || {};
        
        // For now, try to parse color and size from variation name
        let color: string | null = null;
        let size: string | null = null;
        
        if (v.name) {
          const nameParts = v.name.split(/[,/]/).map(str => str.trim());
          if (nameParts.length >= 2) {
            color = nameParts[0];
            size = nameParts[1];
          } else if (nameParts.length === 1) {
            // If only one part, assume it's a color or size
            color = nameParts[0];
          }
        }

        // Build the Printful mapping for this variation. The GTIN/upc field
        // holds the Printful TEMPLATE id (same on every variation).
        const sku = v.sku || v.metadata?.printful_variant_id || '';
        const gtin = (v.upc || '').trim();
        const templateId = /^\d+$/.test(gtin) ? Number(gtin) : undefined;

        // Explicit "PF-<variantId>-T<templateId>" / "PF-<variantId>".
        const skuMatch = sku.match(/^(?:PF-?)?(\d+)(?:-T(\d+))?$/i);
        // Printful/Square-synced SKUs embed the variant id after an underscore,
        // e.g. "6A5662FA835AD_15114" -> variantId 15114 (most reliable).
        const skuSuffix = sku.match(/_(\d+)$/);

        if (skuMatch) {
          variationToPrintful[variation.id] = {
            variantId: Number(skuMatch[1]),
            templateId: skuMatch[2] ? Number(skuMatch[2]) : templateId,
          };
        } else if (skuSuffix && templateId != null) {
          // Direct variant id from SKU + template from GTIN — no color/size match needed.
          variationToPrintful[variation.id] = {
            variantId: Number(skuSuffix[1]),
            templateId,
          };
        } else if (templateId != null) {
          // Only the template is known; resolve the variant later via color/size.
          variationToPrintful[variation.id] = { templateId, color, size };
        }

        return {
          id: variation.id,
          name: v.name || '',
          price: v.priceMoney
            ? (typeof v.priceMoney.amount === 'bigint'
                ? Number(v.priceMoney.amount) / 100
                : v.priceMoney.amount / 100
              ).toFixed(2)
            : 'N/A',
          color,
          size,
          description: v.description || '',
          // Prefer the image named after this color (e.g. "Red" -> red mockup),
          // then the variation's own image, then the item's main image.
          image:
            (color && imageNameToUrl[color.trim().toLowerCase()]) ||
            (v.imageIds && v.imageIds.length > 0 ? imageMap[v.imageIds[0]] : '') ||
            image,
        };
      });
      if (variations.length > 0 && variations[0].price !== 'N/A') {
        price = variations[0].price;
      }
      // Get category name from categories array
      let category = null;
      const catId = item.itemData?.categories?.[0]?.id;
      if (catId) {
        category = categoryIdToName[catId] || catId;
      }
      return {
        id: item.id,
        name: item.itemData?.name || 'Unnamed Product',
        description: item.itemData?.description || '',
        price,
        image,
        images,
        variations,
        category,
      };
    });
    const safeProducts = JSON.parse(JSON.stringify({ products, variationToPrintful }, replacer));
    console.log('GET /api/square-products: success, returning products:', Array.isArray(safeProducts.products) ? safeProducts.products.length : 0);
    return NextResponse.json(safeProducts);
  } catch (error: unknown) {
    let errMsg = error;
    if (typeof error === 'object' && error !== null) {
      if ('stack' in error) errMsg = (error as { stack: string }).stack;
      else if ('message' in error) errMsg = (error as { message: string }).message;
    }
    console.error('SQUARE API ERROR:', errMsg);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 