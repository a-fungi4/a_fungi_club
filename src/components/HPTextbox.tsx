import React from "react";
import styles from "./HPTextbox.module.css";

interface HPTextboxProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

const HPTextbox: React.FC<HPTextboxProps> = ({ children, text, className = "" }) => {
  return (
    <div data-layer="Text" className={`${styles.Text} ${className}`}>
      <div data-layer="Project DescriptionProject Description" className={styles.ProjectDescriptionprojectDescription}>
        {children || text}
      </div>
    </div>
  );
};

export default HPTextbox; 