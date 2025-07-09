import React, { Suspense } from "react";
import TGPageClient from './TGPageClient';

export default function TGPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TGPageClient />
    </Suspense>
  );
} 