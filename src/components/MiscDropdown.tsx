'use client';
import React, { useState } from "react";
import styles from "./MiscDropdown.module.css";
import MiscIcon from "./icons/MiscIcon";

interface MiscDropdownProps {
  text: string;
  title?: string;
  content?: React.ReactNode;
}

const MiscDropdown: React.FC<MiscDropdownProps> = ({ text, title, content }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className={styles.Miscdropdownexpanded}>
        <div className={styles.Miscicon}>
          <MiscIcon width={49} height={48} />
        </div>
        <div className={styles.MiscTitleExpanded}>{title || text}</div>
        <div className={styles.Contentcontainer}>
          <div className={styles.Content}>{content}</div>
        </div>
        <button className={styles.Collapsebutton} onClick={() => setExpanded(false)}>
          <span className={styles.Chevron}>
            <svg width="39" height="23" viewBox="0 0 39 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_900_4438)">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.239 6.09307C21.86 3.47711 17.1397 3.47712 13.7607 6.09307L5.80875 12.2494C4.33488 13.3905 4.06508 15.5103 5.20615 16.9842C6.34721 18.4581 8.46705 18.7279 9.94092 17.5868L17.8929 11.4305C18.839 10.698 20.1607 10.698 21.1068 11.4305L29.0588 17.5868C30.5326 18.7279 32.6525 18.4581 33.7935 16.9842C34.9346 15.5103 34.6648 13.3905 33.1909 12.2494L25.239 6.09307L23.1729 8.76176L25.239 6.09307Z" fill="#C0282D"/>
              </g>
              <defs>
                <filter id="filter0_d_900_4438" x="0.5" y="0.131104" width="38" height="22.1622" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.176471 0 0 0 0 0.662745 0 0 0 0 0.882353 0 0 0 0.56 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_900_4438"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_900_4438" result="shape"/>
                </filter>
              </defs>
            </svg>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={hovered ? styles.Miscdropdownhover : styles.Miscdropdowndefault}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(true)}
      style={{ cursor: 'pointer' }}
    >
      {hovered ? (
        <>
          <div className={styles.Titleicon}>
            <span className={styles.Miscicon}>
              <MiscIcon width={48} height={48} />
            </span>
            <span className={styles.MiscTitle}>{title || text}</span>
          </div>
          <span className={styles.ButtonDropdown}>
            <svg width="36" height="22" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.739 16.1192C20.36 18.7352 15.6397 18.7352 12.2607 16.1192L4.30875 9.96285C2.83488 8.82179 2.56508 6.70196 3.70615 5.22808C4.84721 3.7542 6.96705 3.4844 8.44092 4.62547L16.3929 10.7818C17.339 11.5143 18.6607 11.5143 19.6068 10.7818L27.5588 4.62547C29.0326 3.4844 31.1525 3.7542 32.2935 5.22808C33.4346 6.70196 33.1648 8.82179 31.6909 9.96285L23.739 16.1192L21.6729 13.4505L23.739 16.1192Z" fill="#C0282D"/>
            </svg>
          </span>
        </>
      ) : (
        <>
          <div className={styles.MiscdropdowndefaultInner}>
            <span className={styles.Misicon}>
              <MiscIcon width={48} height={48} />
            </span>
          </div>
          <div className={styles.Text}>{text}</div>
        </>
      )}
    </div>
  );
};

export default MiscDropdown; 