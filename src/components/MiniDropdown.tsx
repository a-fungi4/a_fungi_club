'use client';
import React, { useState } from 'react';
import styles from './MiniDropdown.module.css';

interface MiniDropdownProps {
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

export default function MiniDropdown({ icon, title = "Default", children }: MiniDropdownProps) {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    // Collapsed state
    return (
      <div data-layer="MiniDropDown" className={styles.Minidropdown}>
        <div data-layer="TitleIcon" className={styles.Titleicon}>
          <div data-layer="SVGPlaceholder" className={styles.Svgplaceholder}>
            {icon}
          </div>
          <div data-layer="Title" className={styles.Title}>{title}</div>
        </div>
        <div
          data-svg-wrapper
          data-layer="Button"
          className={styles.Button}
          onClick={() => setExpanded(true)}
          role="button"
          tabIndex={0}
          aria-label="Expand dropdown"
          style={{ outline: 'none' }}
        >
          <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="32" height="32" rx="16" fill="#C0282D"/>
            <path d="M10 13.7072L15.2929 19C15.6834 19.3906 16.3166 19.3906 16.7071 19L22 13.7072" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    );
  }

  // Expanded state
  return (
    <div data-layer="MiniDropDownExpanded" className={styles.Minidropdownexpanded}>
      <div data-layer="TitleIconButton" className={styles.Titleiconbutton}>
        <div data-layer="TitleIcon" className={styles.Titleicon}>
          <div data-layer="SVGPlaceholder" className={styles.Svgplaceholder}>
            {icon}
          </div>
          <div data-layer="Title" className={styles.Title}>{title}</div>
        </div>
        <div
          data-svg-wrapper
          data-layer="Button"
          className={styles.Button}
          onClick={() => setExpanded(false)}
          role="button"
          tabIndex={0}
          aria-label="Collapse dropdown"
          style={{ outline: 'none' }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" transform="matrix(1 0 0 -1 0 32)" fill="#C0282D"/>
            <path d="M10 18.7928L15.2929 13.5C15.6834 13.1094 16.3166 13.1094 16.7071 13.5L22 18.7928" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div data-layer="Content" className={styles.Content}>{children}</div>
    </div>
  );
} 