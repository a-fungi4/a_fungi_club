import React from "react";
import Banner from "@/components/Banner";

export default function TGPage() {
  return (
    <>
      <Banner title="Tacky Garbage Collection" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>This is the TG page content. Add your information here.</p>
          </div>
        </div>
      </Banner>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>TG Page</h1>
      </div>
    </>
  );
} 