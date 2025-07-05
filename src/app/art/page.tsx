import React from "react";
import Banner from "@/components/Banner";
import ArtProject from "@/components/ArtProject";
import FreeTherapy from "@/components/icons/FreeTherapy";
import EighthNLucas from "@/components/icons/8thNLucas";
import LilBiscoff from "@/components/icons/LilBiscoff";
import Coloring from "@/components/icons/Coloring";
import TackyGarbageBig from "@/components/icons/TackyGarbageBig";
import Head from 'next/head';

export default function ArtPage() {
  return (
    <>
      <Head>
        <title>Art | Khaled Momani</title>
        <meta name="description" content="Discover the art projects and creative works of Khaled Momani, including collaborations, coloring books, and more." />
        <meta property="og:title" content="Art | Khaled Momani" />
        <meta property="og:description" content="Discover the art projects and creative works of Khaled Momani, including collaborations, coloring books, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afungiclub.com/art" />
        <meta property="og:image" content="/headshot-bw.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Art | Khaled Momani" />
        <meta name="twitter:description" content="Discover the art projects and creative works of Khaled Momani, including collaborations, coloring books, and more." />
        <meta name="twitter:image" content="/headshot-bw.webp" />
      </Head>
      <Banner title="Art" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>Emotions don't always present themselves as organized layers, style sheets, and file trees. They still lay the groundwork for everything we do. I spent a lot of time figuring out when it was okay to share emotions. 10 years ago interacting with me was like an entire dependency was missing. Everyone lays everything between the lines and expects you to know. There was a world of context missing. Then on top of that everyone just expects you not to say exactly what's on your mind and they call it being polite. They set a bunch of unspoken rules for how to act and what to do. This page is the only acceptable place that I found out it was okay to break all of those rules. It's glorified and appreciated when you break the rules here. I don't care if my art ever sells. It would be nice and validating if other people felt it was relatable enough to spend money on. But it's messy. It's where I dig my fingers in and learn like we do as babies. It's more important than anything else I create.</p>
          </div>
        </div>
      </Banner>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 48, marginBottom: 48 }}>
        <ArtProject
          title="Free Therapy"
          description="Redesigning worksheets my therapist gave me because it's the only way I'd actually read them."
          svg={<FreeTherapy />}
          link="https://drive.google.com/drive/folders/1EzhZ1lYM_W7ddqVc5WPH0Y3xRhg9VwxP"
          iconPosition="left"
        />
        <ArtProject
          title="8th And Lucas"
          description="Collaboration with 8th and Lucas St"
          svg={<EighthNLucas />}
          link="https://opensea.io/collection/8thandlucas"
          iconPosition="right"
        />
        <ArtProject
          title="Lil Biscoff"
          description="I worked at a radio station and took part in the whole process"
          svg={<LilBiscoff />}
          link="https://distrokid.com/hyperfollow/lilbiscoff/mr-uber?fbclid=PAZXh0bgNhZW0CMTEAAab1hlC-hTh7g5sqg5dFjpx_08-5D7PS812TAwemxqjEtjY9Qe2vbuWTdkg_aem_Z1H495rOnLtT3hJqrhQcpQ"
          iconPosition="left"
        />
        <ArtProject
          title="Coloring"
          description="I wrote a series of essays in college then made it into a coloring book ten years later"
          svg={<Coloring />}
          link="https://www.amazon.com/dp/B0CHCPGYNB"
          iconPosition="right"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 0, marginBottom: 48 }}>
        <ArtProject
          title="Art Project 5"
          description="The tacky garbage collection is where I sell my designs on merch. It was the first idea I had for a website."
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