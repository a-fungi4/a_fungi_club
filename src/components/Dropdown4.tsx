import React, { useState, useEffect } from "react";
import styles from "./Dropdown4.module.css";

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

interface Dropdown4Props {
  title: string;
  options: string[];
  onSelect?: (option: string) => void;
  expanded?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  linkButtonGrid?: React.ReactNode;
  additionalContent?: React.ReactNode;
  icon?: React.ReactNode;
  hugContent?: boolean;
}

const Dropdown4: React.FC<Dropdown4Props> = ({ title, expanded, onCollapse, onExpand, linkButtonGrid, additionalContent, icon, hugContent }) => {
  const isMobile = useIsMobile();
  const [showGrid, setShowGrid] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  useEffect(() => {
    if (isMobile === false) {
      setShowGrid(true);
      setShowAdditional(true);
    } else if (isMobile === true) {
      setShowGrid(false);
      setShowAdditional(false);
    }
  }, [isMobile, expanded]);

  if (expanded) {
    return (
      <div data-layer="Dropdown4" className={hugContent ? styles.Dropdown4ExpandedHug : styles.Dropdown4Expanded}>
        <div data-svg-wrapper data-layer="PlaceHolder" className={styles.Placeholder}>
          {icon}
        </div>
        {isMobile ? (
          <>
            {/* Resource Button Grid Toggle */}
            {!showGrid && (
              <div
                data-layer="MobileResourcesCollapsed"
                className={styles.Mobileresourcescollapsed}
                onClick={() => setShowGrid((v) => !v)}
                style={{ marginBottom: '0.5em' }}
              >
                <div data-layer="TitleIcon" className={styles.Titleicon}>
                  <div data-layer="Title" className={styles.Title}>Resources</div>
                </div>
                <div data-svg-wrapper data-layer="Button" className={styles.Button}>
                  <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: showGrid ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                    <rect y="0.5" width="32" height="32" rx="16" fill="#C0282D"/>
                    <path d="M10 13.707L15.2929 18.9999C15.6834 19.3904 16.3166 19.3904 16.7071 18.9999L22 13.707" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            )}
            {showGrid && (
              <>
                <div
                  data-layer="MobileResourcesCollapsed"
                  className={styles.Mobileresourcescollapsed}
                  onClick={() => setShowGrid((v) => !v)}
                  style={{ marginBottom: '0.5em' }}
                >
                  <div data-layer="TitleIcon" className={styles.Titleicon}>
                    <div data-layer="Title" className={styles.Title}>Resources</div>
                  </div>
                  <div data-svg-wrapper data-layer="Button" className={styles.Button}>
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: showGrid ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                      <rect y="0.5" width="32" height="32" rx="16" fill="#C0282D"/>
                      <path d="M10 13.707L15.2929 18.9999C15.6834 19.3904 16.3166 19.3904 16.7071 18.9999L22 13.707" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                {linkButtonGrid && (
                  <div data-layer="LinkButtonGrid" className={styles.Linkbuttongrid}>{linkButtonGrid}</div>
                )}
              </>
            )}
            {/* Additional Content Toggle */}
            {!showAdditional && (
              <div
                data-layer="MobileResourcesCollapsed"
                className={styles.Mobileresourcescollapsed}
                onClick={() => setShowAdditional((v) => !v)}
                style={{ margin: '0.5em 0' }}
              >
                <div data-layer="TitleIcon" className={styles.Titleicon}>
                  <div data-layer="Title" className={styles.Title}>Details</div>
                </div>
                <div data-svg-wrapper data-layer="Button" className={styles.Button}>
                  <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: showAdditional ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                    <rect y="0.5" width="32" height="32" rx="16" fill="#C0282D"/>
                    <path d="M10 13.707L15.2929 18.9999C15.6834 19.3904 16.3166 19.3904 16.7071 18.9999L22 13.707" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            )}
            {showAdditional && (
              <>
                <div
                  data-layer="MobileResourcesCollapsed"
                  className={styles.Mobileresourcescollapsed}
                  onClick={() => setShowAdditional((v) => !v)}
                  style={{ margin: '0.5em 0' }}
                >
                  <div data-layer="TitleIcon" className={styles.Titleicon}>
                    <div data-layer="Title" className={styles.Title}>Details</div>
                  </div>
                  <div data-svg-wrapper data-layer="Button" className={styles.Button}>
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: showAdditional ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                      <rect y="0.5" width="32" height="32" rx="16" fill="#C0282D"/>
                      <path d="M10 13.707L15.2929 18.9999C15.6834 19.3904 16.3166 19.3904 16.7071 18.9999L22 13.707" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="AdditionalContent" className={hugContent ? styles.AdditionalcontentHug : styles.Additionalcontent}>
                  {additionalContent}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {linkButtonGrid ? (
              <div data-layer="LinkButtonGrid" className={styles.Linkbuttongrid}>{linkButtonGrid}</div>
            ) : (
              <div data-layer="LinkButtonGrid" className={styles.Linkbuttongrid} />
            )}
            <div data-layer="AdditionalContent" className={hugContent ? styles.AdditionalcontentHug : styles.Additionalcontent}>
              {additionalContent}
            </div>
          </>
        )}
        <button
          className={styles.collapseButton}
          onClick={onCollapse}
          aria-label="Collapse"
        >
          <svg className={styles.chevronRotated} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.269531" y="0.239746" width="39.6416" height="39.6416" rx="19.8208" fill="#C0282D"/>
            <path d="M10.6108 15.4993L19.4809 24.3695C19.8175 24.706 20.3631 24.706 20.6997 24.3695L29.5698 15.4993" stroke="white" strokeWidth="6.89419" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    );
  }
  // Collapsed state
  return (
    <div data-layer="Dropdown4Collapsed" className={styles.Dropdown4collapsed}>
      <div data-layer="TitleIcon" className={styles.TitleIcon}>
        <div data-layer="PlaceHolderSVG" className={styles.Placeholdersvg}>
          {icon}
        </div>
        <div data-layer="Title">
          <span className={styles.Title}>{title}</span>
        </div>
      </div>
      <button
        data-svg-wrapper
        data-layer="Button"
        className={styles.Button}
        onClick={onExpand}
        aria-label="Expand"
      >
        <svg className={styles.chevron} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.269531" y="0.239746" width="39.6416" height="39.6416" rx="19.8208" fill="#C0282D"/>
          <path d="M10.6108 15.4993L19.4809 24.3695C19.8175 24.706 20.3631 24.706 20.6997 24.3695L29.5698 15.4993" stroke="white" strokeWidth="6.89419" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Dropdown4; 