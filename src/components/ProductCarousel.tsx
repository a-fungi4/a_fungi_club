import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductExpanded from './ProductExpanded';
import styles from './ProductCarousel.module.css';
import { useCart } from './CartContext';
import { Product } from '@/types/Product';

const VISIBLE_CARDS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_CARDS / 2);

interface ProductCarouselProps {
  products: Product[];
  categoryName?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, categoryName }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [center, setCenter] = useState(0); // index of the center card
  const [gridMode, setGridMode] = useState(false);
  const numProducts = products.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(900);
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Deduplicate products by id on the client side
  const uniqueProducts = products.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );
  console.log('Rendering product IDs:', uniqueProducts.map((p: Product) => p.id));
  console.log('uniqueProducts:', uniqueProducts);

  if (uniqueProducts.length === 0) {
    return <div className={styles.ProductCarousel} ref={containerRef}>No products found.</div>;
  }

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
  type ProductWithOffset = Product & { offset: number };
  let visible: ProductWithOffset[] = [];
  if (isMobile) {
    // Only show the center card on mobile
    const index = center % uniqueProducts.length;
    visible = [{ ...uniqueProducts[index], offset: 0 }];
  } else {
    for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
      const index = (center + i + numProducts) % numProducts;
      visible.push({ ...uniqueProducts[index], offset: i });
    }
  }

  // Each product is a parent ITEM. We use its id as the key and pass its variations for selection.
  // uniqueProducts is already deduplicated by id and should only contain ITEMs.

  // In grid mode:
  // The main return must be a single parent <div>.
  // Helper to filter only valid strings
  const filterValidImages = (arr: (string | undefined)[]) => arr.filter((img): img is string => typeof img === 'string' && !!img);
  // Helper to get one image per color variation
  function getImagesForProduct(product: Product): string[] {
    const images: string[] = [];
    const colorImageMap = new Map<string, string>();
    let hasColor = false;
    if (product.variations && product.variations.length > 0) {
      for (const v of product.variations) {
        if (v.color && v.image) {
          hasColor = true;
          if (!colorImageMap.has(v.color)) {
            colorImageMap.set(v.color, v.image);
          }
        }
      }
    }
    if (hasColor) {
      // Add main image first if it exists and is not already in the color images
      if (product.image && !Array.from(colorImageMap.values()).includes(product.image)) {
        images.push(product.image);
      }
      images.push(...Array.from(colorImageMap.values()));
    } else {
      // No color info: use all unique images from variations
      const uniqueImages = new Set<string>();
      if (product.variations) {
        for (const v of product.variations) {
          if (v.image) uniqueImages.add(v.image);
        }
      }
      if (product.image && !uniqueImages.has(product.image)) {
        images.push(product.image);
      }
      images.push(...Array.from(uniqueImages));
    }
    return filterValidImages(images);
  }
  return (
    <div className={styles.ProductCarousel} ref={containerRef}>
      {/* Category Dropdown */}
      <div className={styles.CategoryDropdown}>
        <div className={styles.Category}>{categoryName || 'Category'}</div>
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
          {uniqueProducts.map((product: Product, i) => (
            <ProductCard
              key={product.id}
              images={getImagesForProduct(product)}
              title={product.name}
              price={product.price}
              inStock={true}
              variations={product.variations || []}
              onViewDetails={() => setExpandedIdx(i)}
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
                {visible.map((product: ProductWithOffset, i) => {
                  const uniqueIdx = uniqueProducts.findIndex(p => p.id === product.id);
                  return (
                    <div key={product.id + '-' + i} style={{ zIndex: CENTER_INDEX - Math.abs(product.offset) }}>
                      {expandedIdx === uniqueIdx ? null : (
                        <ProductCard
                          images={getImagesForProduct(product)}
                          title={product.name}
                          price={product.price}
                          inStock={true}
                          variations={product.variations || []}
                          onViewDetails={() => setExpandedIdx(uniqueIdx)}
                          selected={expandedIdx === uniqueIdx}
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
            {uniqueProducts.map((_: Product, i: number) => (
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
      {/* Modal overlay for expanded product */}
      {expandedIdx !== null && uniqueProducts[expandedIdx] && (
        <div className={styles.ModalOverlay} onClick={() => setExpandedIdx(null)}>
          <div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
            <ProductExpanded
              name={uniqueProducts[expandedIdx]?.name}
              price={uniqueProducts[expandedIdx]?.price}
              details={uniqueProducts[expandedIdx]?.description || ''}
              image={uniqueProducts[expandedIdx]?.image}
              sizes={sizes}
              variations={uniqueProducts[expandedIdx]?.variations || []}
              onSelectSize={setSelectedSize}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={() => {
                const product = uniqueProducts[expandedIdx];
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                  image: product.image,
                  variation: selectedSize,
                }, quantity);
                setExpandedIdx(null);
              }}
              onCollapse={() => setExpandedIdx(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel; 