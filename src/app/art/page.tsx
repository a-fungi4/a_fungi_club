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
          title="Art Project 1"
          description="This is a description for Art Project 1."
          svg={<FreeTherapy />}
          link="https://example.com/art1"
          iconPosition="left"
        />
        <ArtProject
          title="Art Project 2"
          description="This is a description for Art Project 2."
          svg={<EighthNLucas />}
          link="https://example.com/art2"
          iconPosition="right"
        />
        <ArtProject
          title="Art Project 3"
          description="This is a description for Art Project 3."
          svg={<LilBiscoff />}
          link="https://example.com/art3"
          iconPosition="left"
        />
        <ArtProject
          title="Art Project 4"
          description="This is a description for Art Project 4."
          svg={<Coloring />}
          link="https://example.com/art4"
          iconPosition="right"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 0, marginBottom: 48 }}>
        <ArtProject
          title="Art Project 5"
          description="This is a description for Art Project 5."
          svg={<TackyGarbageBig />}
          link="https://example.com/art5"
          iconPosition="left"
        />
      </div>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Art Page</h1>
      </div>
    </>
  );
} 