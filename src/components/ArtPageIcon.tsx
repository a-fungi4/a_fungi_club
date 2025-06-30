import React, { ReactNode } from "react";
import styles from "./ArtPageIcon.module.css";

interface ArtPageIconProps {
  svg: ReactNode;
  link: string;
}

const ArtPageIcon: React.FC<ArtPageIconProps> = ({ svg, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkWrapper}>
      <div className={styles.Artpageicon}>
        <div className={styles.svgContainer}>{svg}</div>
      </div>
    </a>
  );
};

export default ArtPageIcon; 