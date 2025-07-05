import React from "react";
import styles from "./Banner.module.css";

interface BannerProps {
  backgroundImage?: string;
  title: string;
  variant?: "home" | "general";
  height?: string | number;
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
  skillPillCont?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  backgroundImage = "/BG.png",
  title,
  variant = "general",
  height = 400,
  overlay = true,
  children,
  className = "",
  skillPillCont,
}) => {
  const isHome = variant === "home";
  const bannerStyle: React.CSSProperties = isHome
    ? {}
    : {
    backgroundImage: `url(${backgroundImage})`,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <section
      className={`${styles.banner} ${styles[variant]} ${className}`}
      style={bannerStyle}
    >
      {isHome ? (
        <div
          className={styles.parallax}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}
      {overlay && <div className={styles.overlay} />}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {children}
        {skillPillCont && (
          <div className={styles.BannerSkillPillWrapper}>
            {skillPillCont}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner; 