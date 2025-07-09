import { NextResponse } from 'next/server';
import { SquareClient } from 'square';

console.log('SQUARE_ACCESS_TOKEN:', process.env.SQUARE_ACCESS_TOKEN);
const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
});

// Minimal types for this API
interface CatalogImage {
  id: string;
  type: 'IMAGE';
  imageData?: { url?: string };
}
interface CatalogItemVariation {
  id: string;
  itemVariationData?: {
    name?: string;
    description?: string;
    priceMoney?: { amount: number };
    imageIds?: string[];
    itemOptionValues?: Array<{
      itemOptionId: string;
      itemOptionValueId: string;
    }>;
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
interface CatalogItemOptionValue {
  id: string;
  type: 'ITEM_OPTION_VALUE';
  itemOptionValueData?: {
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
type CatalogObject = CatalogItem | CatalogImage | CatalogItemOption | CatalogItemOptionValue | CatalogCategory;

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
    // Square API does not return ITEM_OPTION_VALUE objects directly in list; must retrieve via ITEM_OPTION or other means if needed
    for await (const obj of page as AsyncIterable<CatalogObject>) {
      if (obj.type === 'ITEM') items.push(obj as CatalogItem);
      if (obj.type === 'IMAGE') images.push(obj as CatalogImage);
      if (obj.type === 'ITEM_OPTION') itemOptions.push(obj as CatalogItemOption);
      if (obj.type === 'CATEGORY') categories.push(obj as CatalogCategory);
    }
    // Log raw itemData for debugging categoryId, handling BigInt
    for (const item of items) {
      if (item.itemData) {
        console.log('DEBUG itemData:', JSON.stringify(item.itemData, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value, 2));
      }
    }
    // Build image_id -> url map
    const imageMap: Record<string, string> = {};
    for (const img of images) {
      if (img.id && img.imageData && img.imageData.url) {
        imageMap[img.id] = img.imageData.url;
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
    // Option values are not available here; color/size will be null unless you fetch them separately
    // Map products to include image URL and resolved variation options
    const products = items.map(item => {
      let image = '';
      if (item.itemData?.imageUrl) {
        image = item.itemData.imageUrl;
      } else if (item.itemData?.imageIds && item.itemData.imageIds.length > 0) {
        image = imageMap[item.itemData.imageIds[0]] || '';
      }
      // Get price from first variation
      let price = 'N/A';
      const variations = (item.itemData?.variations || []).map(variation => {
        const v = variation.itemVariationData || {};
        // Option values not available; color/size will be null
        const color = null;
        const size = null;
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
          image: v.imageIds && v.imageIds.length > 0 ? imageMap[v.imageIds[0]] || '' : image,
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
        variations,
        category,
      };
    });
    const safeProducts = JSON.parse(JSON.stringify({ products }, replacer));
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