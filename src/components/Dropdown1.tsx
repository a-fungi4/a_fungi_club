import React, { useState, ReactNode } from "react";
import styles from "./Dropdown1.module.css";

interface Dropdown1Props {
  title?: string;
  content?: ReactNode;
  chevronIcon?: ReactNode;
}

const DefaultChevron = (
  <svg className={styles.ButtonIcon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7 15.8L19.6 24.7C19.9 25.1 20.4 25.1 20.8 24.7L29.7 15.8" stroke="white" strokeWidth="6.9" strokeLinecap="round"/>
  </svg>
);

const Dropdown1: React.FC<Dropdown1Props> = ({
  title = "Default",
  content = "Content",
  chevronIcon,
}) => {
  const [expanded, setExpanded] = useState(false);

  const buttonSvg = React.cloneElement(
    chevronIcon ? chevronIcon as React.ReactElement : DefaultChevron,
    {
      className:
        styles.ButtonIcon + (expanded ? ' ' + styles.chevronRotated : ''),
    }
  );

  if (!expanded) {
    return (
      <div className={styles.dropdown}>
        <div className={styles.Placeholder} />
        <div className={styles.Title}>
          <div className={styles.Default}>{title}</div>
        </div>
        <div data-svg-wrapper data-layer="Button" className={styles.Button} onClick={() => setExpanded(true)}>
          {buttonSvg}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Dropdown1expanded}>
      <div className={styles.Content}>{content}</div>
      <div className={styles.ButtonRect} onClick={() => setExpanded(false)}>
        {buttonSvg}
      </div>
    </div>
  );
};

export default Dropdown1; 