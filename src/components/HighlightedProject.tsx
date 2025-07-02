"use client";
import React, { useEffect, useState } from "react";
import styles from "./HighlightedProject.module.css";
import HPThumbnail from "./HPThumbnail";
import HeirloomThumbnail from "./icons/HeirloomThumbnail";
import DesignToCodeThumbnail from "./icons/DesignToCodeThumbnail";
import HPTextbox from "./HPTextbox";

interface HighlightedProjectProps {
  variant: "project1" | "project2" | "mobile";
  className?: string;
  thumbnailBackgroundColor?: string;
  button?: React.ReactNode;
}

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

const HighlightedProject: React.FC<HighlightedProjectProps> = ({ variant, className = "", thumbnailBackgroundColor = "#D4CAFE", button }) => {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  const effectiveVariant = isMobile && variant !== "mobile" ? "mobile" : variant;

  if (effectiveVariant === "project1") {
    return (
      <div className={styles.desktopAspectRatioBox}>
        <div data-layer="HighlightedProject1" className={`${styles.highlightedProjectContainer} ${className}`}>
          <div data-layer="Project Thumbnail" className={styles.projectThumbnailSection} style={{ background: thumbnailBackgroundColor }}>
            <HPThumbnail svg={<HeirloomThumbnail />} backgroundColor={thumbnailBackgroundColor} />
          </div>
          <div data-layer="Project Description" className={styles.projectDescriptionSection}>
            <HPTextbox text="Project DescriptionProject Description" />
            <div className={styles.buttonWrapper}>
              {button}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (effectiveVariant === "project2") {
    return (
      <div className={styles.desktopAspectRatioBox}>
        <div data-layer="HighlightedProject2" className={`${styles.highlightedProjectContainer} ${className}`}>
          <div data-layer="Project Description" className={`${styles.projectDescriptionSection} ${styles.project2LeftRadius}`}>
            <HPTextbox text="DesignToCode project description" />
            <div className={styles.buttonWrapper}>
              {button}
            </div>
          </div>
          <div data-layer="Project Thumbnail" className={`${styles.projectThumbnailSection} ${styles.project2RightRadius}`} style={{ background: "#000" }}>
            <HPThumbnail svg={<DesignToCodeThumbnail backgroundColor="#000" />} />
          </div>
        </div>
      </div>
    );
  }
  // mobile state
  return (
    <div className={styles.mobileAspectRatioBox}>
      <div data-layer="HighlightedProject1Mobile" className={styles.highlightedProjectMobileContainer}>
        <div
          data-layer="Project Thumbnail"
          className={styles.projectThumbnailSection}
          style={{
            background: variant === "project2" ? "#000" : thumbnailBackgroundColor,
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: 537,
          }}
        >
          <HPThumbnail
            svg={
              variant === "project2"
                ? <DesignToCodeThumbnail backgroundColor="#000" />
                : <HeirloomThumbnail />
            }
            backgroundColor={variant === "project2" ? "#000" : thumbnailBackgroundColor}
          />
        </div>
        <div data-layer="Project Description" className={styles.projectDescriptionSection} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
          <HPTextbox text="Project DescriptionProject Description" />
          <div className={styles.buttonWrapper}>
            {button}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightedProject; 