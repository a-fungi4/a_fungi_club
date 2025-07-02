import React from "react";
import styles from "./ArtProject.module.css";
import ArtPageIcon from "./ArtPageIcon";

interface ArtProjectProps {
  title: string;
  description: string;
  svg: React.ReactNode;
  link: string;
  iconPosition?: 'left' | 'right';
}

const ArtProject: React.FC<ArtProjectProps> = ({ title, description, svg, link, iconPosition = 'left' }) => {
  return (
    <div className={styles.Artproject} style={{ flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row' }}>
      <ArtPageIcon svg={svg} link={link} />
      <div className={styles.Textbutton}>
        <div className={styles.Titledescription}>
          <div className={styles.Title}>{title}</div>
          <div className={styles.Description}>{description}</div>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.Gotoprojectbutton}>
          <span className={styles.GoToProject}>Go to project</span>
          <span className={styles.Link}>
            {/* SVG icon */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_900_3847)">
                <path d="M14.1005 3.07106C16.0669 1.1047 18.7338 0 21.5148 0C27.3056 0 32 4.69442 32 10.4853C32 13.2662 30.8954 15.9331 28.929 17.8995L24.8284 22L22 19.1716L26.1006 15.0711C27.3168 13.8548 28 12.2053 28 10.4853C28 6.90356 25.0964 4 21.5148 4C19.7947 4 18.1452 4.68326 16.9289 5.8995L12.8284 10L10 7.17158L14.1005 3.07106Z" fill="#2DA9E1"/>
                <path d="M15.0711 26.1006L19.1716 22L22 24.8284L17.8995 28.929C15.9331 30.8954 13.2662 32 10.4853 32C4.69442 32 0 27.3056 0 21.5148C0 18.7339 1.10469 16.0669 3.07106 14.1005L7.17158 10L10 12.8284L5.8995 16.9289C4.68326 18.1452 4 19.7947 4 21.5148C4 25.0964 6.90356 28 10.4853 28C12.2053 28 13.8548 27.3168 15.0711 26.1006Z" fill="#2DA9E1"/>
                <path d="M11.4144 23.4142L23.4144 11.4142L20.586 8.58578L8.58594 20.5858L11.4144 23.4142Z" fill="#2DA9E1"/>
              </g>
              <defs>
                <clipPath id="clip0_900_3847">
                  <rect width="32" height="32" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
};

export default ArtProject; 