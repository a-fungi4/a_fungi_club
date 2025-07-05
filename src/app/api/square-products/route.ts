import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';

// Use environment variable for security
const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;

const client = new SquareClient({
  token: squareAccessToken!,
  environment: SquareEnvironment.Production, // Change to Sandbox for testing
});

export async function GET() {
  try {
    const response = await client.catalog.listCatalog({ types: 'ITEM' });
    const items = response.objects || [];

    // Map to simplified product data
    const products = items.map((item) => {
      // @ts-expect-error: itemData may not be in the type, but is present in the object
      const { id, itemData } = item;
      const name = itemData?.name || '';
      const description = itemData?.description || '';
      const imageId = itemData?.imageIds?.[0];
      const price = itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount || 0;
      const currency = itemData?.variations?.[0]?.itemVariationData?.priceMoney?.currency || 'USD';
      return {
        id,
        name,
        description,
        imageId,
        price: Number(price) / 100, // Convert cents to dollars
        currency,
      };
    });

    return NextResponse.json({ products });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
} 