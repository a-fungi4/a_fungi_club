import React from "react";
import styles from "./HPButton.module.css";

interface HPButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const HPButton: React.FC<HPButtonProps> = ({ children, label, onClick, className = "" }) => {
  return (
    <button
      data-layer="GoToProjectButton"
      className={`${styles.Gotoprojectbutton} ${className}`}
      onClick={onClick}
      type="button"
    >
      <div data-layer="Go To Project" className={styles.GoToProject}>
        {children || label}
      </div>
    </button>
  );
};

export default HPButton; 