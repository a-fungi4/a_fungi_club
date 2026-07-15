import type { Metadata } from 'next';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import TGPageClient from './TGPageClient';

export const metadata: Metadata = {
  // Storefront is intentionally not indexed until launch. Remove `robots`
  // (or set index:true) when you want it in search results.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default async function TGPage() {
  // The shop is available in the United States only. Vercel sets
  // `x-vercel-ip-country` on every request; it's absent in local dev (so dev
  // still works). Block anyone whose country is known and not US.
  const country = (await headers()).get('x-vercel-ip-country');
  if (country && country !== 'US') {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
          color: '#fff',
          fontFamily: 'Moby, sans-serif',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🇺🇸</div>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Shop unavailable in your region</h1>
        <p style={{ maxWidth: 420, color: '#CCBBE9', lineHeight: 1.5 }}>
          Our shop currently ships to and is available in the United States only.
          Thanks for stopping by!
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div style={{ color: '#fff', padding: 40, textAlign: 'center' }}>Loading store…</div>}>
      <TGPageClient />
    </Suspense>
  );
}
