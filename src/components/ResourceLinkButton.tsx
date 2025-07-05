import React from "react";
import styles from "./ResourceLinkButton.module.css";

interface ResourceLinkButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const ResourceLinkButton: React.FC<ResourceLinkButtonProps> = ({ label, href, icon }) => {
  return (
    <a href={href} className={styles.Resourcelinkbutton} data-layer="ResourceLinkButton">
      <div className={styles.Titleicon} data-layer="TitleIcon">
        {icon ? (
          icon
        ) : (
          <div className={styles.Placeholdericon} data-layer="PlaceHolderIcon" />
        )}
        <span className={styles.LinkText} data-layer="Link">{label}</span>
      </div>
      <span className={styles.LinkIcon} data-svg-wrapper data-layer="link">
        <svg className={styles.LinkSvg} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_943_5446)">
            <path d="M5.62094 1.15165C6.35833 0.414261 7.35844 0 8.4013 0C10.5729 0 12.3333 1.76041 12.3333 3.93198C12.3333 4.97481 11.919 5.97492 11.1816 6.71231L9.6439 8.25L8.58325 7.18934L10.121 5.65165C10.5771 5.19557 10.8333 4.57698 10.8333 3.93198C10.8333 2.58884 9.7444 1.5 8.4013 1.5C7.75627 1.5 7.13769 1.75622 6.6816 2.21231L5.14391 3.75L4.08325 2.68934L5.62094 1.15165Z" fill="#2DA9E1"/>
            <path d="M5.9849 9.78772L7.52259 8.25L8.58325 9.31065L7.04556 10.8484C6.30817 11.5858 5.30806 12 4.26523 12C2.09366 12 0.333252 10.2396 0.333252 8.06805C0.333252 7.0252 0.747512 6.02508 1.4849 5.28769L3.02259 3.75L4.08325 4.81066L2.54556 6.34835C2.08947 6.80443 1.83325 7.42302 1.83325 8.06805C1.83325 9.41115 2.92209 10.5 4.26523 10.5C4.91023 10.5 5.52882 10.2438 5.9849 9.78772Z" fill="#2DA9E1"/>
            <path d="M4.61358 8.78032L9.11358 4.28033L8.05293 3.21967L3.55292 7.71968L4.61358 8.78032Z" fill="#2DA9E1"/>
          </g>
          <defs>
            <clipPath id="clip0_943_5446">
              <rect width="12" height="12" fill="white" transform="translate(0.333252)"/>
            </clipPath>
          </defs>
        </svg>
      </span>
    </a>
  );
};

export default ResourceLinkButton; 