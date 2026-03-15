import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-01VLT28STB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-01VLT28STB');
          `}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3536806596455673');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=3536806596455673&ev=PageView&noscript=1"
            alt=""
            width={1}
            height={1}
            style={{ display: 'none' }}
          />
        </noscript>
      </head>
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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, paddingTop: 12 }}>
          <NavBar />
        </div>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
