import React, { ReactNode } from "react";
import styles from "./ProcessSelectionDropdown.module.css";

interface ProcessSelectionDropdownProps {
  icon?: ReactNode;
  title?: string;
  content?: ReactNode;
  expanded?: boolean;
  onCollapse?: () => void;
}

const CollapseIcon = (
  <span className={styles.Vector1} data-svg-wrapper data-layer="Vector 1">
    <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.70654 14.2933L14.8665 2.1333L27.0265 14.2933" stroke="black" strokeWidth="3.54667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

const ProcessSelectionDropdown: React.FC<ProcessSelectionDropdownProps & { onClick?: () => void }> = ({
  icon,
  title = "Title",
  content = "Text",
  expanded = false,
  onCollapse,
  onClick,
}) => {
  if (expanded) {
    return (
      <div className={styles.Automation} data-layer="Automation">
        <div className={styles.Placeholder} data-layer="PlaceHolder">
          {icon}
        </div>
        <div className={styles.Title} data-layer="Title">
          {title}
        </div>
        <div className={styles.Content} data-layer="Content">
          <div className={styles.Text} data-layer="Text">
            {content}
          </div>
        </div>
        <button className={styles.Collapsebutton} data-layer="CollapseButton" onClick={onCollapse}>
          {CollapseIcon}
        </button>
      </div>
    );
  }
  return (
    <div className={styles.Collapsed} data-layer="Collapsed" onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <div className={styles.Placeholder} data-layer="PlaceHolder">
        {icon}
      </div>
      <div className={styles.Title} data-layer="Title">
        {title}
      </div>
    </div>
  );
};

export default ProcessSelectionDropdown; 