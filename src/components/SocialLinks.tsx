import React from 'react';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  children: React.ReactNode;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ children }) => {
  return (
    <div className={styles.socialLinks}>
      {React.Children.map(children, (child, idx) => (
        <span className={styles.iconWrapper} key={idx}>
          {child}
        </span>
      ))}
    </div>
  );
};

export default SocialLinks; 