"use client";
import React, { useState, useEffect } from "react";
import BrandmarkIcon from "./icons/BrandmarkIcon";
import PortfolioIcon from "./icons/PortfolioIcon";
import AboutIcon from "./icons/AboutIcon";
import ArtIcon from "./icons/ArtIcon";
import TGIcon from "./icons/TGIcon";
import MiscIcon from "./icons/MiscIcon";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";
import MobileNavBar from "./MobileNavBar";

const NAV_ITEMS = [
  { label: "Portfolio", icon: <PortfolioIcon />, key: "portfolio" },
  { label: "About", icon: <AboutIcon />, key: "about" },
  { label: "Art", icon: <ArtIcon />, key: "art" },
  { label: "TG", icon: <TGIcon />, key: "tg" },
  { label: "Misc", icon: <MiscIcon />, key: "misc" },
];

const NavBar: React.FC<{
  selectedKey?: string;
  onSelect?: (key: string) => void;
}> = ({ selectedKey, onSelect }) => {
  const [active, setActive] = useState<string>(selectedKey || NAV_ITEMS[0].key);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (key: string) => {
    setActive(key);
    onSelect?.(key);
  };

  if (isMobile) {
    return <MobileNavBar />;
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <span className={styles.brandmark} style={{ width: 24.24, height: 22.16, position: "relative", display: "flex", alignItems: "center" }}>
          <BrandmarkIcon width={24.24} height={22.16} />
        </span>
        <div className={styles.navScroll}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleSelect(item.key)}
              className={styles.navButton}
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                selected={active === item.key}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 