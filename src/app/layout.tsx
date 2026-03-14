import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import Image from "next/image";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://a-fungi.club'),
  title: {
    default: 'Khaled Momani — Design, Development & Creative Direction',
    template: '%s | A Fungi Club',
  },
  description:
    'A Fungi Club is the creative practice of Khaled Momani — UI/UX designer, front-end developer, and creative director. Portfolio spanning product design, brand identity, automation, and digital art.',
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
  authors: [{ name: 'Khaled Momani', url: 'https://a-fungi.club' }],
  creator: 'Khaled Momani',
  publisher: 'A Fungi Club',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://a-fungi.club',
    siteName: 'A Fungi Club',
    title: 'Khaled Momani — Design, Development & Creative Direction',
    description:
      'Portfolio of Khaled Momani: UI/UX design, front-end development, and creative direction.',
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
    title: 'Khaled Momani — Design, Development & Creative Direction',
    description:
      'Portfolio of Khaled Momani: UI/UX design, front-end development, and creative direction.',
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
    canonical: 'https://a-fungi.club',
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
              url: 'https://a-fungi.club',
              jobTitle: 'UI/UX Designer & Front-End Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'A Fungi Club',
                url: 'https://a-fungi.club',
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
