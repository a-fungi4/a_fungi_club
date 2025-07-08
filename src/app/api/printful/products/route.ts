import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Printful API key' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get('collection_id');
  if (!collectionId) {
    return NextResponse.json({ error: 'Missing collection_id query parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.printful.com/product-templates?collection_id=${encodeURIComponent(collectionId)}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.result || 'Failed to fetch product templates' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 