"use client";
import React, { useState } from "react";
import BrandmarkIcon from "@/components/icons/BrandmarkIcon";
import NavItem from "@/components/NavItem";
import NavBar from "@/components/NavBar";
import MobileNavBar from "@/components/MobileNavBar";
import CarouselCard from "@/components/CarouselCard";
import Carousel from "@/components/Carousel";
import SocialLinks from '@/components/SocialLinks';
import BehanceIcon from '@/components/icons/BehanceIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import SpotifyIcon from '@/components/icons/SpotifyIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import Banner from '@/components/Banner';
import HighlightedProject from '@/components/HighlightedProject';
import Dropdown1 from '@/components/Dropdown1';
import Dropdown2 from '@/components/Dropdown2';
import Dropdown3 from '@/components/Dropdown3';
import ArtPageIcon from '@/components/ArtPageIcon';
import ArtProject from '@/components/ArtProject';
import MiscDropdown from '@/components/MiscDropdown';
import ProcessSelectionDropdown from '@/components/ProcessSelectionDropdown';

export default function ComponentGallery() {
  const [processDropdownExpanded, setProcessDropdownExpanded] = useState(false);
  return (
    <>
      <Banner title="Gallery Home Banner" variant="home">
        <p>This is a sample home banner. You can put any content here.</p>
      </Banner>
      <div style={{ width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', margin: '0 auto', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
        <HighlightedProject variant="project1" />
      </div>
      <div style={{ width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', margin: '0 auto', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
        <HighlightedProject variant="project2" />
      </div>
      <main style={{ background: "var(--background)", color: "var(--white)", minHeight: "100vh", width: '100vw', margin: 5, padding: 5 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Component Gallery</h1>
        <section style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Button Sample */}
          <button
            style={{
              background: "var(--primary)",
              color: "var(--white)",
              padding: "12px 32px",
              border: "none",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Primary Button
          </button>
          {/* Card Sample */}
          <div
            style={{
              background: "var(--blueC)",
              color: "var(--white)",
              padding: 24,
              borderRadius: 12,
              minWidth: 200,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Card Title</h2>
            <p>This is a card using the blueC color.</p>
          </div>
          {/* Alert Sample */}
          <div
            style={{
              background: "var(--redC)",
              color: "var(--white)",
              padding: 16,
              borderRadius: 8,
              minWidth: 200,
              fontWeight: 500,
            }}
          >
            <span>Alert: Something went wrong!</span>
          </div>
          {/* BrandmarkIcon Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <BrandmarkIcon width={50} height={46} />
            <span style={{ fontSize: 16 }}>BrandmarkIcon</span>
          </div>
          {/* SocialLinks Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <SocialLinks>
              <BehanceIcon />
              <InstagramIcon />
              <LinkedinIcon />
              <SpotifyIcon />
              <ThreadsIcon />
              <YoutubeIcon />
              <GithubIcon />
            </SocialLinks>
            <span style={{ fontSize: 16 }}>SocialLinks (hover to animate)</span>
          </div>
          {/* NavItem Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <NavItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
                </svg>
              }
              label="Item"
            />
            <span style={{ fontSize: 16 }}>NavItem (default)</span>
          </div>
          {/* NavBar Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <NavBar />
            <span style={{ fontSize: 16 }}>NavBar</span>
          </div>
          {/* MobileNavBar Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <MobileNavBar />
            <span style={{ fontSize: 16 }}>MobileNavBar (collapsed)</span>
          </div>
          {/* CarouselCard Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CarouselCard />
            <span style={{ fontSize: 16 }}>CarouselCard</span>
          </div>
          {/* Dropdown1 Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Dropdown1 />
            <span style={{ fontSize: 16 }}>Dropdown1 (click to expand/collapse)</span>
          </div>
          {/* Dropdown2 Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Dropdown2 />
            <span style={{ fontSize: 16 }}>Dropdown2 (click to expand/collapse)</span>
          </div>
          {/* Dropdown3 Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Dropdown3 />
            <span style={{ fontSize: 16 }}>Dropdown3 (click to expand/collapse)</span>
          </div>
          {/* ArtPageIcon Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ArtPageIcon
              svg={<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#D9D9D9" /></svg>}
              link="https://example.com"
            />
            <span style={{ fontSize: 16 }}>ArtPageIcon (hover & click)</span>
          </div>
          {/* ArtProject Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ArtProject
              title="Sample Art Project"
              description="BRIEF DESCRIPTION OF ART PROJECT."
              svg={<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#431D54" /></svg>}
              link="https://example.com"
              onButtonClick={() => window.open('https://example.com', '_blank')}
            />
            <span style={{ fontSize: 16 }}>ArtProject (with ArtPageIcon, text, and button)</span>
          </div>
          {/* CarouselCard Selected State Demo */}
          <CarouselCardSelectedDemo />
          {/* MiscDropdown Sample */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <MiscDropdown 
              text="Text" 
              title="Misc Title" 
              content={<span>Content</span>} 
            />
            <span style={{ fontSize: 16 }}>MiscDropdown (default, hover, and expanded states)</span>
          </div>
          {/* ProcessSelectionDropdown Sample (interactive) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ProcessSelectionDropdown
              icon={<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#D9D9D9" /></svg>}
              title="Process Selection"
              content={<span>This is the expanded content area for process selection.</span>}
              expanded={processDropdownExpanded}
              onCollapse={() => setProcessDropdownExpanded(false)}
              // When collapsed, clicking the card expands it
              {...(!processDropdownExpanded && { onClick: () => setProcessDropdownExpanded(true) })}
            />
            <span style={{ fontSize: 16 }}>ProcessSelectionDropdown (click to expand/collapse)</span>
          </div>
        </section>
        {/* Carousel in its own row at the bottom */}
        <section style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Carousel</h2>
          <div style={{ width: "100%", maxWidth: 700 }}>
            <Carousel />
          </div>
        </section>
      </main>
    </>
  );
}

// Demo component for selected state
function CarouselCardSelectedDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ cursor: "pointer" }} onClick={() => setSelected(true)}>
        <CarouselCard />
      </div>
      <span style={{ fontSize: 16 }}>Click the CarouselCard to expand</span>
      {selected && (
        <CarouselCard selected onClose={() => setSelected(false)} />
      )}
    </div>
  );
} 