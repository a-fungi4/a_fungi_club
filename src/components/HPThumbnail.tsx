import React from "react";

interface HPThumbnailProps {
  svg: React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

const HPThumbnail: React.FC<HPThumbnailProps> = ({ svg, backgroundColor, className = "" }) => {
  // If svg is a valid React element, inject width/height as 50%
  let svgBackgroundColor: string | undefined = undefined;
  let sizedSvg = svg;
  if (React.isValidElement(svg)) {
    // Try to extract backgroundColor from the svg's props using a more specific type
    const svgElement = svg as React.ReactElement<{ backgroundColor?: string; width?: string | number; height?: string | number }>;
    svgBackgroundColor = svgElement.props.backgroundColor;
    sizedSvg = React.cloneElement(svgElement, {
      width: "75%",
      height: "75%",
    });
  }

  // Use the backgroundColor prop if provided, otherwise use the svg's backgroundColor prop
  const effectiveBackgroundColor = backgroundColor || svgBackgroundColor;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        background: effectiveBackgroundColor,
        width: '100%',
        height: '100%',
      }}
    >
      {sizedSvg}
    </div>
  );
};

export default HPThumbnail; 