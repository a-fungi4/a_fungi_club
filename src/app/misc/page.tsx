import React from "react";
import Banner from "@/components/Banner";

export default function MiscPage() {
  return (
    <>
      <Banner title="Misc" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>This is the misc page content. Add your information here.</p>
          </div>
        </div>
      </Banner>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Misc Page</h1>
      </div>
    </>
  );
} 