import React, { useEffect } from 'react';
import styles from './ProductLargePhotoOverlay.module.css';

interface ProductLargePhotoOverlayProps {
  image?: string;
  title: string;
  onClose: () => void;
}

const ProductLargePhotoOverlay: React.FC<ProductLargePhotoOverlayProps> = ({ image, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.ProductLargePhoto} onClick={e => e.stopPropagation()}>
        <div className={styles.Frame127}>
          <button className={styles.CloseButton} onClick={onClose} aria-label="Close large photo overlay">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.247 0.439297C10.8328 -0.146404 11.7823 -0.146461 12.3681 0.439297C12.9537 1.02506 12.9537 1.97463 12.3681 2.56039L8.9286 5.99984L12.5604 9.63168C13.1461 10.2174 13.1461 11.167 12.5604 11.7528C11.9747 12.3385 11.0251 12.3385 10.4393 11.7528L6.8075 8.12094L3.17567 11.7528C2.58991 12.3385 1.64037 12.3385 1.05457 11.7528C0.468788 11.167 0.468788 10.2175 1.05457 9.63168L4.68641 5.99984L1.24696 2.56039C0.661171 1.9746 0.661171 1.02508 1.24696 0.439297C1.83275 -0.146404 2.78229 -0.146461 3.36805 0.439297L6.8075 3.87875L10.247 0.439297Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div className={styles.Placeholder}>
          {image ? (
            <img src={image} alt={title} className={styles.LargeImg} />
          ) : (
            <div className={styles.VectorPlaceholder}>
              <svg width="432" height="432" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M405 0.137939H27C12.0758 0.137939 0 12.206 0 27.1207V404.879C0 419.794 12.0758 431.862 27 431.862H405C419.924 431.862 432 419.794 432 404.879V27.1207C432 12.206 419.924 0.137939 405 0.137939ZM54 54.1035H378V274.607L316.487 213.133C305.944 202.617 288.853 202.617 278.309 213.133L113.434 377.897H54V54.1035Z" fill="white"/>
              </svg>
              <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M54 108C83.8234 108 108 83.8388 108 54.0345C108 24.2302 83.8234 0.0689697 54 0.0689697C24.1766 0.0689697 0 24.2302 0 54.0345C0 83.8388 24.1766 108 54 108Z" fill="white"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductLargePhotoOverlay; 