import React, { useState } from "react";
import styles from "./Dropdown3.module.css";

const Dropdown3: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <div data-layer="Dropdown3" className={styles.Dropdown3}>
        <div data-layer="TitleIconButton" className={styles.Titleiconbutton}>
          <div data-layer="TitleIcon" className={styles.Titleicon}>
            <div data-svg-wrapper data-layer="Placeholder" className={styles.Placeholder}>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8.5" r="8" fill="#D9D9D9"/>
              </svg>
            </div>
            <div data-layer="Title" className={styles.Title}>
              <div data-layer="Default" className={styles.Default}>Default</div>
            </div>
          </div>
          <div data-svg-wrapper data-layer="Button" className={styles.Button} onClick={() => setExpanded(true)}>
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.chevron}
            >
              <rect y="0.707108" width="18" height="17.5858" rx="8.79289" fill="#C0282D"/>
              <path d="M5 7.70711L8.29289 11C8.68342 11.3905 9.31658 11.3905 9.70711 11L13 7.70711" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-layer="Dropdown3" className={styles.Dropdown3Expanded}>
      <div data-layer="TitleIconButton" className={styles.Titleiconbutton}>
        <div data-layer="TitleIcon" className={styles.Titleicon}>
          <div data-svg-wrapper data-layer="Placeholder" className={styles.Placeholder}>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8.5" r="8" fill="#D9D9D9"/>
            </svg>
          </div>
          <div data-layer="Title" className={styles.Title}>
            <div data-layer="Default" className={styles.Default}>Default</div>
          </div>
        </div>
        <div data-svg-wrapper data-layer="Button" className={styles.Button} onClick={() => setExpanded(false)}>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.chevron + " " + styles["chevron-rotated"]}
          >
            <rect y="0.707108" width="18" height="17.5858" rx="8.79289" fill="#C0282D"/>
            <path d="M5 7.70711L8.29289 11C8.68342 11.3905 9.31658 11.3905 9.70711 11L13 7.70711" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div data-layer="Content" className={styles.Content} />
    </div>
  );
};

export default Dropdown3; 