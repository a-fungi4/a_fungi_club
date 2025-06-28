import React, { useEffect, useState } from "react";
import styles from "./HighlightedProject.module.css";
import HPThumbnail from "./HPThumbnail";
import HeirloomThumbnail from "./icons/HeirloomThumbnail";

interface HighlightedProjectProps {
  variant: "project1" | "project2" | "mobile";
  className?: string;
  thumbnailBackgroundColor?: string;
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

const HighlightedProject: React.FC<HighlightedProjectProps> = ({ variant, className = "", thumbnailBackgroundColor = "#D4CAFE" }) => {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  const effectiveVariant = isMobile && variant !== "mobile" ? "mobile" : variant;

  if (effectiveVariant === "project1") {
    return (
      <div className={styles.aspectRatioBox}>
        <div data-layer="HighlightedProject1" className={`${styles.Highlightedproject1} ${className}`}>
          <div data-layer="Project Thumbnail" className={styles.ProjectThumbnail} style={{ background: thumbnailBackgroundColor }}>
            <HPThumbnail svg={<HeirloomThumbnail />} backgroundColor={thumbnailBackgroundColor} />
          </div>
          <div data-layer="Project Description" className={styles.ProjectDescription}>
            {/* TextBox and Button components will go here */}
          </div>
        </div>
      </div>
    );
  }
  if (effectiveVariant === "project2") {
    return (
      <div className={styles.aspectRatioBox}>
        <div data-layer="HighlightedProject2" className={`${styles.Highlightedproject1} ${className}`}>
          <div data-layer="Project Description" className={styles.ProjectDescription} style={{borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
            {/* TextBox and Button components will go here */}
          </div>
          <div data-layer="Project Thumbnail" className={styles.ProjectThumbnail} style={{ background: thumbnailBackgroundColor, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 100, borderBottomRightRadius: 100 }}>
            <HPThumbnail svg={<HeirloomThumbnail />} backgroundColor={thumbnailBackgroundColor} />
          </div>
        </div>
      </div>
    );
  }
  // mobile state
  return (
    <div className={styles.aspectRatioBoxMobile}>
      <div data-layer="HighlightedProject1Mobile" className={styles.Highlightedproject1mobile}>
        <div data-layer="Project Thumbnail" className={styles.ProjectThumbnail} style={{ background: thumbnailBackgroundColor, borderTopLeftRadius: 100, borderTopRightRadius: 100, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 537 }}>
          <HPThumbnail svg={<HeirloomThumbnail />} backgroundColor={thumbnailBackgroundColor} />
        </div>
        <div data-layer="Project Description" className={styles.ProjectDescription} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
          {/* TextBox and Button components will go here */}
        </div>
      </div>
    </div>
  );
};

export default HighlightedProject; 