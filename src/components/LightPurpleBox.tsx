import React from "react";
import styles from "./LightPurpleBox.module.css";

interface LightPurpleBoxProps {
  children: React.ReactNode;
  className?: string;
}

const LightPurpleBox: React.FC<LightPurpleBoxProps> = ({ children, className }) => {
  return (
    <div className={styles.Frame140 + (className ? ` ${className}` : "") }>
      <div className={styles.TextBox}>{children}</div>
    </div>
  );
};

export default LightPurpleBox; 