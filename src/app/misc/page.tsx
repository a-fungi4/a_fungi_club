import React from "react";
import Banner from "@/components/Banner";
import MiscDropdown from "@/components/MiscDropdown";
import MiscPrint from "@/components/icons/MiscPrint";
import MiscHTown from "@/components/icons/MiscHTown";
import MiscMail from "@/components/icons/MiscMail";
import MiscPrivacy from "@/components/icons/MiscPrivacy";
import ArtPageIcon from "@/components/ArtPageIcon";
import MarketingIcon1 from "@/components/icons/MarketingIcon1";
import MarketingIcon2 from "@/components/icons/MarketingIcon2";
import MarketingIcon3 from "@/components/icons/MarketingIcon3";
import ContactForm from "@/components/ContactForm";
import Head from 'next/head';

export default function MiscPage() {
  return (
    <>
      <Head>
        <title>Miscellaneous | Khaled Momani</title>
        <meta name="description" content="Explore old work, side projects, and compliance resources by Khaled Momani." />
        <meta property="og:title" content="Miscellaneous | Khaled Momani" />
        <meta property="og:description" content="Explore old work, side projects, and compliance resources by Khaled Momani." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afungiclub.com/misc" />
        <meta property="og:image" content="/headshot-bw.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Miscellaneous | Khaled Momani" />
        <meta name="twitter:description" content="Explore old work, side projects, and compliance resources by Khaled Momani." />
        <meta name="twitter:image" content="/headshot-bw.webp" />
      </Head>
      <Banner title="Misc" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>Old work, side projects, and compliance.</p>
          </div>
        </div>
      </Banner>
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 32, marginTop: 48, marginBottom: 48 }}>
        <MiscDropdown
          defaultText="Sidehustles"
          hoverText="Print N Stuff"
          icon={<MiscPrint />}
          content={
            <div>
              <p>For print solutions&nbsp;please call: <a href="tel:832-899-9703">832-899-9703</a>.<br />Prices will be quoted upon order.</p>
              <p>Services include:</p>
              <ul>
                <li>Large Format prints</li>
                <li>Wraps</li>
                <li>Business Cards</li>
                <li>Fliers</li>
                <li>Posters</li>
                <li>Art Photography</li>
                <li>And more</li>
              </ul>
            </div>
          }
        />
        <MiscDropdown
          defaultText="Old Projects"
          hoverText="Marketing"
          icon={<MiscHTown />}
          content={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
              height: '100%',
              width: '100%',
            }}>
              <div style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: 'clamp(8px, 2vw, 20px)',
                fontFamily: 'Hack, monospace',
                fontWeight: 700,
                fontSize: 'clamp(14px, 3vw, 20px)',
                color: '#431D54',
                padding: 'clamp(4px, 1vw, 12px)',
              }}>
                I WORKED ON THESE BEFORE MARCH 2025
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(40px, 1fr))',
                gap: 'clamp(8px, 2vw, 24px)',
                justifyItems: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                placeItems: 'center',
                padding: 'clamp(4px, 2vw, 16px) 0',
                flexGrow: 1,
              }}>
                <div style={{ width: 'clamp(32px, 8vw, 64px)', height: 'clamp(32px, 8vw, 64px)' }}>
                  <ArtPageIcon svg={<MarketingIcon1 />} link="https://www.instagram.com/ajshotchick/" />
                </div>
                <div style={{ width: 'clamp(32px, 8vw, 64px)', height: 'clamp(32px, 8vw, 64px)' }}>
                  <ArtPageIcon svg={<MarketingIcon2 />} link="https://www.instagram.com/vochostacos?igsh=NjVqa3d0cWx4YWh5" />
                </div>
                <div style={{ width: 'clamp(32px, 8vw, 64px)', height: 'clamp(32px, 8vw, 64px)' }}>
                  <ArtPageIcon svg={<MarketingIcon3 />} link="https://www.instagram.com/flounderfishchicken?igsh=MTVzYzZ3NmNrMnRiMw==" />
                </div>
              </div>
            </div>
          }
        />
        <MiscDropdown
          defaultText="HMU"
          hoverText="Email"
          icon={<MiscMail />}
          content={<ContactForm />}
        />
        <MiscDropdown
          defaultText="SHSHSHSH"
          hoverText="Privacy Policy"
          icon={<MiscPrivacy />}
          content={<p>Content for Misc Item 4</p>}
        />
      </div>
    </>
  );
} 