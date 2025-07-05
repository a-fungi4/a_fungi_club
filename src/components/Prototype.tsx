import React from "react";
import styles from "./Prototype.module.css";

interface PrototypeProps {
  src?: string;
  className?: string;
}

const DEFAULT_SRC = "https://embed.figma.com/proto/vgGDjqXkQcfBDkveawmprF/Heirloom---Redesign?page-id=&node-id=8-252&starting-point-node-id=8%3A252&embed-host=share";

const Prototype: React.FC<PrototypeProps> = ({ src = DEFAULT_SRC, className }) => {
  return (
    <div className={`${styles.prototypeMask} ${className || ""}`.trim()}>
      <iframe
        className={styles.prototypeIframe}
        src={src}
        allowFullScreen
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        title="Prototype Embed"
      />
    </div>
  );
};

export default Prototype; 