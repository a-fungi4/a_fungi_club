import React from "react";
import HeroSection from "@/components/HeroSection";
import Banner from "@/components/Banner";
import MyceliumAnimation from "@/components/MyceliumAnimation";

export default function HomePage() {
  return (
    <div style={{ minHeight: '200dvh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', zIndex: -50 }}>
        <MyceliumAnimation />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 4 }}>
        <HeroSection />
      </div>
      <div style={{ position: 'relative', zIndex: 80 }}>
        <Banner title="Welcome to A Fungi Club" variant="home" className="parallaxBanner" />
      </div>
    </div>
  );
} 