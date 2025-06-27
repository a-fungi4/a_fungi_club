"use client";

import React from 'react';
import styles from './NavItem.module.css';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  width?: number | string;
  iconSize?: number | string;
  fontSize?: number | string;
  selected?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  width = 85,
  iconSize = 24,
  fontSize = 12,
  selected = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const activated = selected || isHovered;

  return (
    <div
      className={
        activated
          ? `${styles.navItem} ${styles.navItemActivated}`
          : styles.navItem
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...(width ? { '--navitem-width': typeof width === 'number' ? `${width}px` : width } : {}),
        ...(iconSize ? { '--navitem-icon-size': typeof iconSize === 'number' ? `${iconSize}px` : iconSize } : {}),
        ...(fontSize ? { '--navitem-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize } : {}),
      } as React.CSSProperties}
    >
      <div className={styles.iconLabelRow}>
        <span className={styles.iconWrapper}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ width?: number | string; height?: number | string }>, {
                width: iconSize,
                height: iconSize,
              })
            : icon}
        </span>
        <span className={styles.label}>
          {label}
        </span>
      </div>
      <span className={styles.underline + (activated ? ' ' + styles.underlineActive : '')}>
        <svg width="100%" height="3" viewBox="0 0 100 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={styles.underlinePath} d="M1.5 1.5L98.5 1.5" stroke="var(--color-white)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
};

export default NavItem; 