import React from "react";

interface CompanionGalleryProps {
  children?: React.ReactNode;
  className?: string;
}

const CompanionGallery: React.FC<CompanionGalleryProps> = ({ children, className }) => {
  return (
    <div className={className} style={{ padding: '2em', background: '#2DA9E1', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
      {children || <span>CompanionGallery component placeholder</span>}
    </div>
  );
};

export default CompanionGallery; 