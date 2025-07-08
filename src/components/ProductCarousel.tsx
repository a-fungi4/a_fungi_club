import React, { useState, useRef, useLayoutEffect } from 'react';
import ProductCard from './ProductCard';
import ProductExpanded from './ProductExpanded';
// import ProductLargePhotoOverlay from './ProductLargePhotoOverlay';
import styles from './ProductCarousel.module.css';

const sampleProducts = [
  { title: 'Sample 1', price: 29.99 },
  { title: 'Sample 2', price: 39.99 },
  { title: 'Sample 3', price: 49.99 },
  { title: 'Sample 4', price: 59.99 },
  { title: 'Sample 5', price: 69.99 },
  { title: 'Sample 6', price: 79.99 },
  { title: 'Sample 7', price: 89.99 },
  { title: 'Sample 8', price: 99.99 },
  { title: 'Sample 9', price: 109.99 },
  { title: 'Sample 10', price: 119.99 },
  { title: 'Sample 11', price: 129.99 },
  { title: 'Sample 12', price: 139.99 },
  { title: 'Sample 13', price: 149.99 },
  { title: 'Sample 14', price: 159.99 },
  { title: 'Sample 15', price: 169.99 },
];

const VISIBLE_CARDS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_CARDS / 2);
const SCALE_STEP = 0.13;

const ProductCarousel: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [center, setCenter] = useState(0); // index of the center card
  const [gridMode, setGridMode] = useState(false);
  const numProducts = sampleProducts.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(900);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive base size: max 80% of carousel height, max 32% of width, min 120px, max 250px
  let BASE_WIDTH = Math.min(containerWidth * 0.22, 250);
  let BASE_HEIGHT = BASE_WIDTH * 1.4;
  BASE_WIDTH = Math.max(120, BASE_WIDTH);
  BASE_HEIGHT = Math.max(168, BASE_HEIGHT);

  const scrollLeft = () => setCenter((c) => (c - 1 + numProducts) % numProducts);
  const scrollRight = () => setCenter((c) => (c + 1) % numProducts);

  const sizes = [
    { label: 'S', selected: selectedSize === 'S' },
    { label: 'M', selected: selectedSize === 'M' },
    { label: 'L', selected: selectedSize === 'L' },
    { label: 'XL', selected: selectedSize === 'XL' },
  ];

  // Prepare visible cards (window centered on 'center')
  const visible = [];
  for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
    const idx = (center + i + numProducts) % numProducts;
    visible.push({ ...sampleProducts[idx], idx, offset: i });
  }

  // Handler for clicking the image area
  const handleImageClick = (idx: number) => {
    // setLargePhotoIdx(idx); // This state is no longer used
  };

  return (
    <div className={styles.ProductCarousel} ref={containerRef}>
      {/* Modal overlay for expanded product */}
      {expandedIdx !== null && (
        <div className={styles.ModalOverlay} onClick={() => setExpandedIdx(null)}>
          <div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
            <ProductExpanded
              name={sampleProducts[expandedIdx].title}
              price={sampleProducts[expandedIdx].price}
              details={`This is a sample product description for ${sampleProducts[expandedIdx].title}.`}
              sizes={sizes}
              onSelectSize={setSelectedSize}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={() => alert('Added to cart!')}
              onCollapse={() => setExpandedIdx(null)}
            />
          </div>
        </div>
      )}
      {/* Overlay for large photo */}
      {/* {largePhotoIdx !== null && (
        <ProductLargePhotoOverlay
          image={sampleProducts[largePhotoIdx].image}
          title={sampleProducts[largePhotoIdx].title}
          onClose={() => setLargePhotoIdx(null)}
        />
      )} */}
      {/* Category Dropdown */}
      <div className={styles.CategoryDropdown}>
        <div className={styles.Category}>Category</div>
        <div className={styles.Line8}>
          <svg width="100%" height="20" viewBox="0 0 1354 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_975_2603)">
              <path d="M10 3H1344" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </g>
            <defs>
              <filter id="filter0_d_975_2603" x="0" y="0" width="1354" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="7"/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.752941 0 0 0 0 0.156863 0 0 0 0 0.176471 0 0 0 0.54 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_975_2603"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_975_2603" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
        <div className={styles.Button}>
          <div
            data-layer="GalleryGridToggle"
            className={styles.GalleryGridToggle}
            onClick={() => setGridMode(g => !g)}
            aria-label={gridMode ? 'Switch to carousel view' : 'Switch to grid view'}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setGridMode(g => !g); }}
          >
            <div
              data-svg-wrapper
              data-layer="CarouselView"
              className={gridMode ? styles.Carouselview + ' ' + styles.inactive : styles.Carouselview + ' ' + styles.active}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12.2276" y="9.09091" width="7.81818" height="7.81818" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
                <rect x="4.22763" y="9.09091" width="7.81818" height="7.81818" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
                <rect x="6.22763" y="7.09091" width="11.8182" height="11.8182" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
              </svg>
            </div>
            <div
              data-svg-wrapper
              data-layer="GridView"
              className={gridMode ? styles.Gridview + ' ' + styles.active : styles.Gridview + ' ' + styles.inactive}
              style={{ position: 'relative' }}
            >
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.59091" y="5.09073" width="7.49815" height="7.49838" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
                <rect x="4.59091" y="13.4109" width="7.49815" height="7.49838" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
                <rect x="12.9112" y="5.09073" width="7.49815" height="7.49838" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
                <rect x="12.9112" y="13.4109" width="7.49815" height="7.49838" rx="1.36364" fill="#C0282D" stroke="#2DA9E1" strokeWidth="0.181818"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel or Grid Row */}
      {gridMode ? (
        <div className={styles.GridView}>
          {sampleProducts.map((product, i) => (
            <ProductCard
              key={i}
              title={product.title}
              price={product.price}
              inStock={true}
              onViewDetails={() => setExpandedIdx(i)}
              onImageClick={() => handleImageClick(i)}
              selected={expandedIdx === i}
            />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.CarouselRow}>
            <style>{`:root { --carousel-row-height: ${BASE_HEIGHT + 20}px; --cards-row-outer-height: ${BASE_HEIGHT}px; }`}</style>
            <div className={styles.ArrowLeft} onClick={scrollLeft}>
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3568 5.848C0.730128 5.45633 0.730129 4.54367 1.3568 4.152L6.47 0.956249C7.13605 0.539969 8 1.01881 8 1.80425L8 8.19575C8 8.98119 7.13605 9.46003 6.47 9.04375L1.3568 5.848Z" fill="white"/>
              </svg>
            </div>
            <div className={styles.CardsRowOuter}>
              <div className={styles.CardsRow}>
                {visible.map((product) => {
                  const offset = product.offset;
                  const scale = 1 - Math.abs(offset) * SCALE_STEP;
                  const width = BASE_WIDTH * scale;
                  const height = BASE_HEIGHT * scale;
                  const zIndex = 10 - Math.abs(offset);
                  const translateX = offset * (BASE_WIDTH * 0.7); // overlap a bit for effect
                  return (
                    <div
                      key={product.idx}
                      className={
                        expandedIdx === product.idx
                          ? styles.ProductCardAnimated + ' ' + styles.ExpandedCard
                          : styles.ProductCardAnimated
                      }
                      style={
                        (expandedIdx === product.idx
                          ? { zIndex: 100 }
                          : {
                              '--card-width': `${width}px`,
                              '--card-height': `${height}px`,
                              '--card-z': zIndex,
                              '--card-transform': `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                              '--card-shadow': offset === 0 ? '0 4px 24px rgba(44,44,44,0.12)' : 'none',
                            }) as React.CSSProperties
                      }
                    >
                      {expandedIdx === product.idx ? (
                        <></>
                      ) : (
                        <ProductCard
                          title={product.title}
                          price={product.price}
                          inStock={true}
                          onViewDetails={() => setExpandedIdx(product.idx)}
                          onImageClick={() => handleImageClick(product.idx)}
                          selected={expandedIdx === product.idx}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.ArrowRight} onClick={scrollRight}>
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6432 5.848C7.26987 5.45633 7.26987 4.54367 6.6432 4.152L1.53 0.956249C0.86395 0.539969 -3.45518e-07 1.01881 -3.36152e-07 1.80425L-2.59934e-07 8.19575C-2.50568e-07 8.98119 0.863951 9.46003 1.53 9.04375L6.6432 5.848Z" fill="white"/>
              </svg>
            </div>
          </div>
          {/* Selection Dots */}
          <div className={styles.SelectionDots}>
            {sampleProducts.map((_, i) => (
              <div
                key={i}
                className={`${styles[`Ellipse${(i%8)+3}`]} ${styles.SelectionDot}`}
                style={{ '--dot-opacity': center === i ? 1 : 0.5 } as React.CSSProperties}
                onClick={() => setCenter(i)}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z" fill={center === i ? '#2DA9E1' : '#C0282D'} fillOpacity={center === i ? '0.56' : '0.54'} />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel; 