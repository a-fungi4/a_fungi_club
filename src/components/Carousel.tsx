"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import CarouselCard from "./CarouselCard";
import styles from "./Carousel.module.css";
import PortfolioIcon from "./icons/PortfolioIcon";
import AboutIcon from "./icons/AboutIcon";
import ArtIcon from "./icons/ArtIcon";
import TGIcon from "./icons/TGIcon";
import MiscIcon from "./icons/MiscIcon";

const PHOTOS = [
  <PortfolioIcon key="portfolio1" width={80} height={80} />, // 0
  <AboutIcon key="about1" width={80} height={80} />,         // 1
  <ArtIcon key="art1" width={80} height={80} />,             // 2
  <TGIcon key="tg1" width={80} height={80} />,              // 3
  <MiscIcon key="misc1" width={80} height={80} />,          // 4
  <PortfolioIcon key="portfolio2" width={80} height={80} />, // 5
  <AboutIcon key="about2" width={80} height={80} />,         // 6
  <ArtIcon key="art2" width={80} height={80} />,             // 7
  <TGIcon key="tg2" width={80} height={80} />,              // 8
];

const Carousel: React.FC = () => {
  const [center, setCenter] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(682);
  const [containerHeight, setContainerHeight] = useState<number>(300);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive base size: max 80% of carousel height, max 32% of width, min 80px, max 220px
  let BASE_WIDTH = Math.min(containerWidth * 0.28, (containerHeight - 48) * 0.8, 220);
  let BASE_HEIGHT = BASE_WIDTH;
  BASE_WIDTH = Math.max(80, BASE_WIDTH);
  BASE_HEIGHT = Math.max(80, BASE_HEIGHT);
  const VISIBLE_COUNT = 9;
  const CENTER_INDEX = Math.floor(VISIBLE_COUNT / 2);
  const SCALE_STEP = 0.13;
  const SPACING = BASE_WIDTH * 0.8;

  const showLeft = () => setCenter((c) => (c - 1 + PHOTOS.length) % PHOTOS.length);
  const showRight = () => setCenter((c) => (c + 1) % PHOTOS.length);

  const visible = [];
  for (let i = -4; i <= 4; i++) {
    const photoIndex = (center + i + PHOTOS.length) % PHOTOS.length;
    visible.push(PHOTOS[photoIndex]);
  }

  return (
    <div className={styles.carouselRoot} ref={containerRef}>
      <div className={styles.carouselFrame} style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative' }}>
        {/* Edge gradients */}
        <div className={styles.leftFade} />
        <div className={styles.rightFade} />
        {/* Cards */}
        {visible.map((photo, i) => {
          const offset = i - CENTER_INDEX;
          const scale = 1 - Math.abs(offset) * SCALE_STEP;
          const width = BASE_WIDTH * scale;
          const height = BASE_HEIGHT * scale;
          const left = `calc(50% + ${offset * SPACING}px)`;
          const zIndex = 10 - Math.abs(offset);
          return (
            <div
              key={i + center - 4}
              style={{
                position: "absolute",
                width,
                height,
                left,
                top: '50%',
                zIndex,
                cursor: "pointer",
                transform: "translate(-50%, -50%)",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 80,
                minHeight: 80,
                maxWidth: 400,
                maxHeight: 400,
              }}
              onClick={() => setSelected(i + center - 4)}
            >
              <CarouselCard photo={photo} photoSize={width * 0.5} />
            </div>
          );
        })}
        {/* Navigation arrows */}
        <button className={styles.arrowLeft} onClick={showLeft} aria-label="Previous">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="24" rx="12" fill="#2DA9E1"/>
            <path d="M27.3568 12.848C26.7301 12.4563 26.7301 11.5437 27.3568 11.152L32.47 7.95625C33.1361 7.53997 34 8.01881 34 8.80425L34 15.1958C34 15.9812 33.136 16.46 32.47 16.0438L27.3568 12.848Z" fill="white"/>
          </svg>
        </button>
        <button className={styles.arrowRight} onClick={showRight} aria-label="Next">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="24" rx="12" fill="#2DA9E1"/>
            <path d="M32.6432 12.848C33.2699 12.4563 33.2699 11.5437 32.6432 11.152L27.53 7.95625C26.8639 7.53997 26 8.01881 26 8.80425L26 15.1958C26 15.9812 26.864 16.46 27.53 16.0438L32.6432 12.848Z" fill="white"/>
          </svg>
        </button>
      </div>
      {/* Selected overlay */}
      {selected !== null && (
        <CarouselCard selected onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Carousel; 