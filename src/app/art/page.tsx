import React from "react";
import Banner from "@/components/Banner";
import ArtProject from "@/components/ArtProject";
import FreeTherapy from "@/components/icons/FreeTherapy";
import EighthNLucas from "@/components/icons/8thNLucas";
import LilBiscoff from "@/components/icons/LilBiscoff";
import Coloring from "@/components/icons/Coloring";
import TackyGarbageBig from "@/components/icons/TackyGarbageBig";

export default function ArtPage() {
  return (
    <>
      <Banner title="Art" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>This is the art page content. Add your information here.</p>
          </div>
        </div>
      </Banner>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 48, marginBottom: 48 }}>
        <ArtProject
          title="Free Therapy"
          description="This is a description for Free Therapy."
          svg={<FreeTherapy />}
          link="https://drive.google.com/drive/folders/1EzhZ1lYM_W7ddqVc5WPH0Y3xRhg9VwxP"
          iconPosition="left"
        />
        <ArtProject
          title="8th And Lucas"
          description="This is a description for 8th And Lucas."
          svg={<EighthNLucas />}
          link="https://opensea.io/collection/8thandlucas"
          iconPosition="right"
        />
        <ArtProject
          title="Lil Biscoff"
          description="This is a description for Lil Biscoff."
          svg={<LilBiscoff />}
          link="https://distrokid.com/hyperfollow/lilbiscoff/mr-uber?fbclid=PAZXh0bgNhZW0CMTEAAab1hlC-hTh7g5sqg5dFjpx_08-5D7PS812TAwemxqjEtjY9Qe2vbuWTdkg_aem_Z1H495rOnLtT3hJqrhQcpQ"
          iconPosition="left"
        />
        <ArtProject
          title="Coloring"
          description="This is a description for Coloring."
          svg={<Coloring />}
          link="https://www.amazon.com/dp/B0CHCPGYNB"
          iconPosition="right"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 0, marginBottom: 48 }}>
        <ArtProject
          title="Art Project 5"
          description="This is a description for Art Project 5."
          svg={<TackyGarbageBig />}
          link="/tg"
          iconPosition="left"
        />
      </div>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Art Page</h1>
      </div>
    </>
  );
} 