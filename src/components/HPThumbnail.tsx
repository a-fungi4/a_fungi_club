import React from "react";

interface HPThumbnailProps {
  svg: React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

const HPThumbnail: React.FC<HPThumbnailProps> = ({ svg, backgroundColor, className = "" }) => {
  // If svg is a valid React element, inject width/height as 50%
  const sizedSvg = React.isValidElement(svg)
    ? React.cloneElement(svg as React.ReactElement<{ width?: string | number; height?: string | number }>, {
        width: "50%",
        height: "50%",
      })
    : svg;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        background: backgroundColor,
        width: '100%',
        height: '100%',
      }}
    >
      {sizedSvg}
    </div>
  );
};

export default HPThumbnail; 