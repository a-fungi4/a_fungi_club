"use client";
import React, { useState } from "react";
import Link from "next/link";
import BrandmarkIcon from "./icons/BrandmarkIcon";
import styles from "./MobileNavBar.module.css";
import PortfolioIcon from "./icons/PortfolioIcon";
import AboutIcon from "./icons/AboutIcon";
import ArtIcon from "./icons/ArtIcon";
import TGIcon from "./icons/TGIcon";
import MiscIcon from "./icons/MiscIcon";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Portfolio", icon: <PortfolioIcon />, key: "portfolio", href: "/portfolio" },
  { label: "About", icon: <AboutIcon />, key: "about", href: "/about" },
  { label: "Art", icon: <ArtIcon />, key: "art", href: "/art" },
  { label: "TG", icon: <TGIcon />, key: "tg", href: "/tg" },
  { label: "Misc", icon: <MiscIcon />, key: "misc", href: "/misc" },
];

const MobileNavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={expanded ? styles.mobileNavBarExpanded : styles.mobileNavBar}>
      <Link href="/" className={styles.brandmark}>
        <BrandmarkIcon className={styles.brandmarkIcon} />
      </Link>
      {expanded ? (
        <>
          <div className={styles.selectionItems}>
            {NAV_ITEMS.map((item) => {
              const isSelected = pathname === item.href && pathname !== "/";
              return (
                <span
                  key={item.key}
                  className={isSelected ? `${styles.navItem} ${styles.navItemSelected}` : styles.navItem}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setExpanded(false);
                    router.push(item.href);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpanded(false);
                      router.push(item.href);
                    }
                  }}
                >
                  <span className={styles.iconWrapper}>
                    {React.cloneElement(
                      item.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
                      { className: styles.iconSvg }
                    )}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </span>
              );
            })}
          </div>
          <button
            className={styles.collapseButton}
            aria-label="Collapse menu"
            onClick={() => setExpanded(false)}
            type="button"
          >
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={!expanded ? styles.rotated : undefined}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M1.5 8.28877C1.5 8.7444 1.86937 9.11377 2.325 9.11377H11.675C12.1306 9.11377 12.5 8.7444 12.5 8.28877C12.5 7.83313 12.1306 7.46377 11.675 7.46377H2.325C1.86937 7.46377 1.5 7.83313 1.5 8.28877Z" fill="var(--color-redC)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M2.875 5.63875C2.875 6.09438 3.24437 6.46375 3.7 6.46375H10.3C10.7556 6.46375 11.125 6.09438 11.125 5.63875C11.125 5.18311 10.7556 4.81375 10.3 4.81375H3.7C3.24437 4.81375 2.875 5.18311 2.875 5.63875Z" fill="var(--color-redC)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4.25 2.98872C4.25 3.44436 4.61937 3.81372 5.075 3.81372H8.925C9.38064 3.81372 9.75 3.44436 9.75 2.98872C9.75 2.53309 9.38064 2.16372 8.925 2.16372H5.075C4.61937 2.16372 4.25 2.53309 4.25 2.98872Z" fill="var(--color-redC)"/>
            </svg>
          </button>
        </>
      ) : (
        <button
          className={styles.expandButton}
          aria-label="Expand menu"
          onClick={() => setExpanded(true)}
          type="button"
        >
          <svg
            className={styles.expandIcon}
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={expanded ? { transform: 'rotate(180deg)' } : undefined}
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 3.43193C1.5 2.9763 1.86937 2.60693 2.325 2.60693H11.675C12.1306 2.60693 12.5 2.9763 12.5 3.43193C12.5 3.88757 12.1306 4.25693 11.675 4.25693H2.325C1.86937 4.25693 1.5 3.88757 1.5 3.43193Z" fill="var(--color-redC)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.875 6.08196C2.875 5.62632 3.24437 5.25696 3.7 5.25696H10.3C10.7556 5.25696 11.125 5.62632 11.125 6.08196C11.125 6.53759 10.7556 6.90696 10.3 6.90696H3.7C3.24437 6.90696 2.875 6.53759 2.875 6.08196Z" fill="var(--color-redC)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.25 8.73192C4.25 8.27629 4.61937 7.90692 5.075 7.90692H8.925C9.38064 7.90692 9.75 8.27629 9.75 8.73192C9.75 9.18756 9.38064 9.55692 8.925 9.55692H5.075C4.61937 9.55692 4.25 9.18756 4.25 8.73192Z" fill="var(--color-redC)"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default MobileNavBar; 