"use client";

import React, { useState, ReactNode } from "react";
import styles from "./Dropdown2.module.css";

interface Dropdown2Props {
  icon?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
}

const DefaultIcon = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="#D9D9D9"/>
  </svg>
);

const ChevronPath = (
  <path d="M10 13.2071L15.2929 18.5C15.6834 18.8905 16.3166 18.8905 16.7071 18.5L22 13.2071" stroke="white" strokeWidth="4" strokeLinecap="round"/>
);

const Dropdown2: React.FC<Dropdown2Props> = ({ icon, title, content }) => {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <div data-layer="Dropdown2Expanded" className={styles.Dropdown2expanded}>
        <div data-layer="TitleIconParent" className={styles.Titleiconparent} style={{flex: '1 1 0'}}>
          <div data-layer="TitleIcon" className={styles.TitleiconCollapsed}>
            <div data-svg-wrapper data-layer="Icon" className={styles.IconCollapsed}>
              {icon || DefaultIcon}
            </div>
            <div data-layer="Default" className={styles.DefaultCollapsed}>
              {title || "Default"}
            </div>
          </div>
          <div data-svg-wrapper data-layer="Button" className={styles.Button} onClick={() => setExpanded(true)}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.chevron}
            >
              <rect width="32" height="32" rx="16" fill="#C0282D"/>
              {ChevronPath}
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-layer="Dropdown2Expanded" className={styles.Dropdown2expandedExpanded}>
      <div data-layer="TitleIconParent" className={styles.Titleiconparent}>
        <div data-layer="TitleIcon" className={styles.TitleiconExpanded}>
          <div data-svg-wrapper data-layer="Icon" className={styles.IconExpanded}>
            {icon || DefaultIcon}
          </div>
          <div data-layer="Title" className={styles.TitleExpanded}>
            <div data-layer="Default" className={styles.DefaultExpanded}>{title || "Default"}</div>
          </div>
        </div>
        <div data-svg-wrapper data-layer="Button" className={styles.ButtonExpanded} onClick={() => setExpanded(false)}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.chevron + " " + styles["chevron-rotated"]}
          >
            <rect width="32" height="32" rx="16" fill="#C0282D"/>
            {ChevronPath}
          </svg>
        </div>
      </div>
      <div data-layer="Content" className={styles.Content}>{content}</div>
    </div>
  );
};

export default Dropdown2; 