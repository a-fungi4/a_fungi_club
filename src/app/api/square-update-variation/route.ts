import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(req: NextRequest) {
  try {
    const { variationId, printfulVariantId } = await req.json();
    if (!variationId || !printfulVariantId) {
      return NextResponse.json({ error: 'Missing variationId or printfulVariantId' }, { status: 400 });
    }
    
    // Fetch the existing variation object
    const catalogApi = client.catalogApi;
    const { result } = await catalogApi.retrieveCatalogObject(variationId, true);
    const variation = result.object;
    
    if (!variation || variation.type !== 'ITEM_VARIATION') {
      return NextResponse.json({ error: 'Variation not found or wrong type' }, { status: 404 });
    }
    
    // Update metadata using proper type assertion for Square's API
    const variationWithData = variation as typeof variation & {
      itemVariationData: {
        metadata?: Record<string, string>;
      };
    };
    
    const updatedVariation = {
      ...variation,
      itemVariationData: {
        ...variationWithData.itemVariationData,
        metadata: {
          ...(variationWithData.itemVariationData?.metadata || {}),
          printful_variant_id: printfulVariantId,
        },
      },
    };
    
    // Upsert the updated variation
    const updateRes = await catalogApi.upsertCatalogObject({
      idempotencyKey: Math.random().toString(36).substring(2),
      object: updatedVariation,
    });
    
    return NextResponse.json({ success: true, updated: updateRes.result.catalogObject });
  } catch (error: unknown) {
    let message = 'Failed to update variation';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 