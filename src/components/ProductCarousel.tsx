import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from './CartContext';
import ProductCard from './ProductCard';
import ProductExpanded from './ProductExpanded';
import styles from './ProductCarousel.module.css';

// Toast notification component
const Toast = ({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toastContent}>
        <span className={styles.toastMessage}>{message}</span>
        <button className={styles.toastClose} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

interface Product {
  id: string;
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  variations?: Variation[];
}

interface Variation {
  id: string;
  name: string;
  price?: string | number;
  color?: string;
  size?: string;
  description?: string;
  image?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const { addToCart } = useCart();
  const [center, setCenter] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Local state for expanded product color/size
  const [modalState, setModalState] = useState<{
    color: string;
    size: string;
  } | null>(null);

  // Get unique products (remove duplicates based on name)
  const uniqueProducts = useMemo(() => {
    const seen = new Set();
    return products.filter(product => {
      const duplicate = seen.has(product.name);
      seen.add(product.name);
      return !duplicate;
    });
  }, [products]);

  // When opening a product, set default color and size for that product
  useEffect(() => {
    if (expandedIdx !== null && uniqueProducts[expandedIdx]) {
      const product = uniqueProducts[expandedIdx];
      const variations = product.variations || [];
      
      if (variations.length === 0) {
        // For products without variations, set empty strings
        setModalState({ color: '', size: '' });
        setQuantity(1);
        return;
      }
      
      // Parse variations to get colors and sizes
      const colors = new Set<string>();
      const sizes = new Set<string>();
      
      for (const variation of variations) {
        let color = variation.color || '';
        let size = variation.size || '';
        
        // If color or size is missing, try to parse from name
        if ((!color || !size) && variation.name) {
          const nameParts = variation.name.split(',').map(str => str.trim());
          if (nameParts.length >= 2) {
            color = color || nameParts[0];
            size = size || nameParts[1];
          }
        }
        
        if (color) colors.add(color);
        if (size) sizes.add(size);
      }
      
      // Set default values
      const defaultColor = colors.size > 0 ? Array.from(colors)[0] : '';
      const defaultSize = sizes.size > 0 ? Array.from(sizes)[0] : '';
      
      // Always set the modal state when opening a product
      setModalState({ color: defaultColor, size: defaultSize });
      setQuantity(1); // Reset quantity on open
    } else if (expandedIdx === null) {
      setModalState(null); // Collapse modal
    }
  }, [expandedIdx, uniqueProducts]);

  // Show toast message
  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  // Hide toast message
  const hideToast = () => {
    setIsToastVisible(false);
  };

  const numProducts = uniqueProducts.length;
  const scrollLeft = () => setCenter((c) => (c - 1 + numProducts) % numProducts);
  const scrollRight = () => setCenter((c) => (c + 1) % numProducts);

  // Prepare visible cards (window centered on 'center')
  const visibleCards = useMemo(() => {
    const cards = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (center + i + numProducts) % numProducts;
      cards.push({
        idx,
        product: uniqueProducts[idx],
        position: i,
      });
    }
    return cards;
  }, [center, numProducts, uniqueProducts]);

  // Helper function to get images for a product
  const getImagesForProduct = (product: Product) => {
    if (product.variations && product.variations.length > 0) {
      return product.variations
        .map(v => v.image)
        .filter(Boolean) as string[];
    }
    return product.image ? [product.image] : [];
  };

  return (
    <div className={styles.container}>
      {/* Toast notification */}
      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={hideToast} 
      />

      {/* Navigation arrows */}
      <button className={styles.navButton} onClick={scrollLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className={styles.navButton} onClick={scrollRight}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Product cards */}
      <div className={styles.carousel}>
        {visibleCards.map(({ idx, product, position }) => (
          <div
            key={`${product.id}-${position}`}
            className={`${styles.card} ${styles[`position${position}`]}`}
          >
            <ProductCard
              images={getImagesForProduct(product)}
              title={product.name}
              price={product.price}
              inStock={true}
              variations={product.variations || []}
              onViewDetails={() => {
                setExpandedIdx(idx);
              }}
              selected={expandedIdx === idx}
            />
          </div>
        ))}
      </div>

      {/* Expanded product modal */}
      {expandedIdx !== null && uniqueProducts[expandedIdx] && modalState && (
        <div className={styles.modalOverlay} onClick={() => setExpandedIdx(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <ProductExpanded
              name={uniqueProducts[expandedIdx]?.name}
              price={uniqueProducts[expandedIdx]?.price}
              details={uniqueProducts[expandedIdx]?.description || ''}
              image={uniqueProducts[expandedIdx]?.image}
              variations={uniqueProducts[expandedIdx]?.variations || []}
              onSelectSize={size => setModalState(s => s ? { ...s, size } : s)}
              quantity={quantity}
              onQuantityChange={setQuantity}
              selectedColor={modalState.color}
              setSelectedColor={color => setModalState(s => s ? { ...s, color } : s)}
              selectedSize={modalState.size}
              setSelectedSize={size => setModalState(s => s ? { ...s, size } : s)}
              onAddToCart={() => {
                const product = uniqueProducts[expandedIdx];
                
                // Find the selected variation based on color and size
                let selectedVariation = product.variations?.find(v => 
                  v.color === modalState.color && v.size === modalState.size
                );
                
                // For simple products (like stickers) that don't have color/size, use the first variation
                if (!selectedVariation && product.variations && product.variations.length === 1) {
                  selectedVariation = product.variations[0];
                }
                
                // Use variation ID if available, otherwise fall back to product ID
                const itemId = selectedVariation?.id || product.id;
                
                addToCart({
                  id: itemId,
                  name: product.name,
                  price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                  image: product.image,
                  variation: selectedVariation ? `${modalState.color} / ${modalState.size}` : undefined,
                }, quantity);
                
                // Show success message
                showToast(`${product.name} added to cart!`);
                
                // Google Analytics event
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'add_to_cart', {
                    items: [{
                      id: itemId,
                      name: product.name,
                      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                      quantity: quantity,
                      variant: selectedVariation ? `${modalState.color} / ${modalState.size}` : undefined
                    }]
                  });
                }
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