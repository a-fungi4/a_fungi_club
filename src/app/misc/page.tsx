import React from "react";
import Banner from "@/components/Banner";
import MiscDropdown from "@/components/MiscDropdown";

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
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 32, marginTop: 48, marginBottom: 48 }}>
        <MiscDropdown text="Misc Item 1" content={<p>Content for Misc Item 1</p>} />
        <MiscDropdown text="Misc Item 2" content={<p>Content for Misc Item 2</p>} />
        <MiscDropdown text="Misc Item 3" content={<p>Content for Misc Item 3</p>} />
        <MiscDropdown text="Misc Item 4" content={<p>Content for Misc Item 4</p>} />
      </div>
    </>
  );
} 