"use client";
import React from "react";
import { createPortal } from "react-dom";
import styles from "./CarouselCard.module.css";
import Image from "next/image";

interface CarouselCardProps {
  photo?: string | React.ReactNode;
  selected?: boolean;
  onClose?: () => void;
  photoSize?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const Placeholder = () => (
  <div className={styles.placeholder}>
    <span className={styles.placeholderSvg1}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M187.5 0H12.5C5.59063 0 0 5.59063 0 12.5V187.5C0 194.409 5.59063 200 12.5 200H187.5C194.409 200 200 194.409 200 187.5V12.5C200 5.59063 194.409 0 187.5 0ZM25 25H175V127.15L146.522 98.6719C141.641 93.8 133.728 93.8 128.847 98.6719L52.5156 175H25V25Z" fill="white"/>
      </svg>
    </span>
    <span className={styles.placeholderSvg2}>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="white"/>
      </svg>
    </span>
  </div>
);

const CarouselCard: React.FC<CarouselCardProps> = ({ photo, selected = false, onClose, photoSize = 80, onPrev, onNext }) => {
  // Overlay content for selected state
  const overlay = (
    <div className={styles.overlay}>
      <div className={styles.selectedCard}>
        <div className={styles.closeBar}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close" type="button">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2473 0.439297C10.8331 -0.146404 11.7826 -0.146461 12.3684 0.439297C12.954 1.02506 12.954 1.97463 12.3684 2.56039L8.9289 5.99984L12.5607 9.63168C13.1464 10.2174 13.1464 11.167 12.5607 11.7528C11.975 12.3385 11.0254 12.3385 10.4396 11.7528L6.80781 8.12094L3.17597 11.7528C2.59022 12.3385 1.64067 12.3385 1.05488 11.7528C0.469093 11.167 0.469093 10.2175 1.05488 9.63168L4.68672 5.99984L1.24726 2.56039C0.661476 1.9746 0.661476 1.02508 1.24726 0.439297C1.83306 -0.146404 2.7826 -0.146461 3.36836 0.439297L6.80781 3.87875L10.2473 0.439297Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div className={styles.selectedPhotoArea}>
          {onPrev && (
            <button className={styles.overlayArrowLeft} onClick={onPrev} aria-label="Previous">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#2DA9E1"/>
                <path d="M28 34L20 24L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {photo ? (
            typeof photo === "string" ? (
              <Image src={photo} alt="carousel" className={styles.selectedPhotoImg} width={photoSize || 400} height={photoSize || 300} />
            ) : (
              React.isValidElement(photo)
                ? React.cloneElement(photo as React.ReactElement<{ width?: number | string; height?: number | string }>, { width: photoSize, height: photoSize })
                : photo
            )
          ) : (
            <div className={styles.selectedPlaceholder}>
              <span className={styles.selectedPlaceholderSvg1}>
                <svg width="432" height="432" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M405 0.137939H27C12.0758 0.137939 0 12.206 0 27.1207V404.879C0 419.794 12.0758 431.862 27 431.862H405C419.924 431.862 432 419.794 432 404.879V27.1207C432 12.206 419.924 0.137939 405 0.137939ZM54 54.1035H378V274.607L316.487 213.133C305.944 202.617 288.853 202.617 278.309 213.133L113.434 377.897H54V54.1035Z" fill="white"/>
                </svg>
              </span>
              <span className={styles.selectedPlaceholderSvg2}>
                <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M54 108C83.8234 108 108 83.8387 108 54.0344C108 24.23 83.8234 0.0688477 54 0.0688477C24.1766 0.0688477 0 24.23 0 54.0344C0 83.8387 24.1766 108 54 108Z" fill="white"/>
                </svg>
              </span>
            </div>
          )}
          {onNext && (
            <button className={styles.overlayArrowRight} onClick={onNext} aria-label="Next">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#2DA9E1"/>
                <path d="M20 34L28 24L20 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (selected && typeof window !== "undefined") {
    // Use portal for overlay if possible
    return createPortal(overlay, document.body);
  }

  return (
    <div className={styles.carouselCard}>
      <div className={styles.photoArea}>
        {photo ? (
          typeof photo === "string" ? (
            <Image src={photo} alt="carousel" className={styles.photoImg} width={photoSize || 400} height={photoSize || 300} />
          ) : (
            React.isValidElement(photo)
              ? React.cloneElement(photo as React.ReactElement<{ width?: number | string; height?: number | string }>, { width: photoSize, height: photoSize })
              : photo
          )
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

export default CarouselCard; 