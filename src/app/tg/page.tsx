import React from "react";
import Banner from "@/components/Banner";
import Head from 'next/head';

export default function TGPage() {
  return (
    <>
      <Head>
        <title>Tacky Garbage Collection | Khaled Momani</title>
        <meta name="description" content="Tacky Garbage Collection: Explore unique merch and creative designs by Khaled Momani." />
        <meta property="og:title" content="Tacky Garbage Collection | Khaled Momani" />
        <meta property="og:description" content="Tacky Garbage Collection: Explore unique merch and creative designs by Khaled Momani." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afungiclub.com/tg" />
        <meta property="og:image" content="/headshot-bw.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tacky Garbage Collection | Khaled Momani" />
        <meta name="twitter:description" content="Tacky Garbage Collection: Explore unique merch and creative designs by Khaled Momani." />
        <meta name="twitter:image" content="/headshot-bw.webp" />
      </Head>
      <Banner title="Tacky Garbage Collection" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>This is the TG page content. Add your information here.</p>
          </div>
        </div>
      </Banner>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>TG Page</h1>
        <p style={{ fontSize: '1.5rem', fontWeight: 500, marginTop: '1em', color: '#a78bfa' }}>Coming Soon</p>
      </div>
    </>
  );
} 