"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: "Portfolio", icon: <PortfolioIcon />, key: "portfolio", href: "/portfolio" },
  { label: "About", icon: <AboutIcon />, key: "about", href: "/about" },
  { label: "Art", icon: <ArtIcon />, key: "art", href: "/art" },
  { label: "TG", icon: <TGIcon />, key: "tg", href: "/tg" },
  { label: "Misc", icon: <MiscIcon />, key: "misc", href: "/misc" },
];

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileNavBar />;
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <span className={styles.brandmark} style={{ width: 24.24, height: 22.16, position: "relative", display: "flex", alignItems: "center" }}>
          <Link href="/">
            <BrandmarkIcon width={24.24} height={22.16} />
          </Link>
        </span>
        <div className={styles.navScroll}>
          {NAV_ITEMS.map((item) => {
            // If on home page, none selected. Otherwise, match pathname to href
            const isSelected = pathname === item.href && pathname !== "/";
            return (
              <Link
                key={item.key}
                href={item.href}
                className={styles.navButton}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  selected={isSelected}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 