import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import CookieConsentButton from "@/components/CookieConsentButton";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import Image from "next/image";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.b8momani.com'),
  title: {
    default: 'Khaled Momani — AI Systems Engineer & Designer',
    template: '%s | A Fungi Club',
  },
  description:
    'Portfolio of Khaled Momani — AI Systems Engineer & Designer. Building Shezzi, a locally-sovereign multi-model AI system, alongside UI/UX and creative research.',
  keywords: [
    'UI/UX designer',
    'front-end developer',
    'portfolio',
    'Khaled Momani',
    'product design',
    'creative direction',
    'Next.js',
    'Figma',
    'brand identity',
    'A Fungi Club',
  ],
  authors: [{ name: 'Khaled Momani', url: 'https://www.b8momani.com' }],
  creator: 'Khaled Momani',
  publisher: 'A Fungi Club',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.b8momani.com',
    siteName: 'A Fungi Club',
    title: 'Khaled Momani — AI Systems Engineer & Designer',
    description:
      'Portfolio of Khaled Momani: AI systems engineering, UI/UX design, and creative research.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'A Fungi Club — Khaled Momani Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khaled Momani — AI Systems Engineer & Designer',
    description:
      'Portfolio of Khaled Momani: AI systems engineering, UI/UX design, and creative research.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.b8momani.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Khaled Momani',
              url: 'https://www.b8momani.com',
              jobTitle: 'AI Systems Engineer & Designer',
              worksFor: {
                '@type': 'Organization',
                name: 'A Fungi Club',
                url: 'https://www.b8momani.com',
              },
            }),
          }}
        />
        <CartProvider>
          <CookieConsentProvider>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, paddingTop: 12 }}>
              <NavBar />
            </div>
            {children}
            <Footer />
            <CookieConsentBanner />
            <CookieConsentButton />
          </CookieConsentProvider>
        </CartProvider>
      </body>
    </html>
  );
}
