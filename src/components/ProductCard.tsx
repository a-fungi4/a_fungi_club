import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import { Variation } from '@/types/Product';
import ProductLargePhotoOverlay from './ProductLargePhotoOverlay';
import ReactDOM from 'react-dom';

interface ProductCardProps {
  images?: string[];
  title: string;
  price: string | number;
  inStock?: boolean;
  onViewDetails?: () => void;
  selected?: boolean;
  variations?: Variation[];
}

const defaultImage = (
  <div className={styles.ProductCard__imageArea}>
    <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M129.375 0H8.625C3.85753 0 0 3.85753 0 8.625V129.375C0 134.142 3.85753 138 8.625 138H129.375C134.142 138 138 134.142 138 129.375V8.625C138 3.85753 134.142 0 129.375 0ZM17.25 17.25H120.75V87.7335L101.1 68.0836C97.732 64.722 92.2724 64.722 88.9043 68.0836L36.2358 120.75H17.25V17.25Z" fill="white"/>
      <path d="M51.75 69C61.2769 69 69 61.2769 69 51.75C69 42.2231 61.2769 34.5 51.75 34.5C42.2231 34.5 34.5 42.2231 34.5 51.75C34.5 61.2769 42.2231 69 51.75 69Z" fill="white"/>
    </svg>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ images, title, price, inStock, onViewDetails, selected }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const hasImages = images && images.length > 0;
  const showImage = hasImages ? images[currentIdx] : undefined;
  const totalImages = hasImages ? images.length : 1;
  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(idx => (idx - 1 + totalImages) % totalImages);
  };
  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(idx => (idx + 1) % totalImages);
  };

  return (
    <div className={selected ? styles.ProductCard + ' ' + styles.ProductCardSelected : styles.ProductCard}>
      {/* Image Section */}
      <div
        className={styles.ProductCard__imageArea}
        style={{ cursor: hasImages ? 'pointer' : undefined }}
        onClick={() => hasImages && setShowLargePhoto(true)}
      >
        {showImage ? (
          <div className={styles.ProductCard__imageArea}>
            <Image
              src={showImage}
              alt={title}
              fill
              className={styles.ProductCard__img}
            />
          </div>
        ) : (
          defaultImage
        )}
      </div>
      {/* Large Photo Overlay */}
      {showLargePhoto && showImage &&
        typeof window !== 'undefined' &&
        ReactDOM.createPortal(
          <ProductLargePhotoOverlay
            image={showImage}
            title={title}
            onClose={() => setShowLargePhoto(false)}
          />, document.body)
      }
      {/* Selection Dots */}
      <div className={styles.ProductCard__selectionDots}>
        {/* Left Arrow */}
        <div onClick={goLeft} style={{ cursor: totalImages > 1 ? 'pointer' : 'default', opacity: totalImages > 1 ? 1 : 0.3 }}>
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 4.61604C-0.1667 4.23114-0.1667 3.26889 0.5 2.88399L5 0.28591C5.66667-0.0989901 6.5 0.382135 6.5 1.15193V6.34809C6.5 7.11789 5.66667 7.59901 5 7.21411L0.5 4.61604Z" fill="#2DA9E1"/>
          </svg>
        </div>
        {/* Dots - dynamic based on totalImages */}
        {Array.from({ length: totalImages }).map((_, idx) => (
          <svg
            key={idx}
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); setCurrentIdx(idx); }}
          >
            <path
              d="M10.5 5.75C10.5 8.51142 8.26142 10.75 5.5 10.75C2.73858 10.75 0.5 8.51142 0.5 5.75C0.5 2.98858 2.73858 0.75 5.5 0.75C8.26142 0.75 10.5 2.98858 10.5 5.75Z"
              fill={idx === currentIdx ? "#2DA9E1" : "#C0282D"}
              fillOpacity={idx === currentIdx ? "0.56" : "0.54"}
            />
          </svg>
        ))}
        {/* Right Arrow */}
        <div onClick={goRight} style={{ cursor: totalImages > 1 ? 'pointer' : 'default', opacity: totalImages > 1 ? 1 : 0.3 }}>
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 5.61602C8.16666 5.23112 8.16667 4.26887 7.5 3.88397L2 0.708542C1.33334 0.323642 0.5 0.804766 0.5 1.57457V7.92542C0.5 8.69522 1.33333 9.17635 2 8.79144L7.5 5.61602Z" fill="#2DA9E1"/>
          </svg>
        </div>
      </div>
      {/* Name and Price */}
      <div className={styles.ProductCard__namePrice}>
        <div className={styles['ProductCard__pill--name']}>
          <div className={styles.ProductCard__pillText}>{title}</div>
        </div>
        <div className={styles['ProductCard__pill--price']}>
          <div className={styles.ProductCard__pillText}>${price}</div>
        </div>
      </div>
      {/* More Info Button */}
      <div
        className={styles.ProductCard__moreInfo}
        onClick={onViewDetails}
        style={{ cursor: onViewDetails ? 'pointer' : 'default' }}
      >
        <div className={styles.ProductCard__moreInfoText}>MORE INFO</div>
        <div>
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 5.11602C8.16666 4.73112 8.16667 3.76887 7.5 3.38397L2 0.208543C1.33334 -0.176357 0.5 0.304767 0.5 1.07457V7.42542C0.5 8.19522 1.33333 8.67635 2 8.29145L7.5 5.11602Z" fill="#2DA9E1"/>
          </svg>
        </div>
      </div>
      {/* In Stock */}
      <div className={styles.ProductCard__stock}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </div>
    </div>
  );
};

export default ProductCard; 