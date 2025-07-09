import React, { useState } from 'react';
import styles from './ProductExpanded.module.css';

interface SizeOption {
  label: string;
  selected: boolean;
}

// Define a Variation type for type safety
interface Variation {
  id: string;
  name?: string;
  price?: number | string;
  currency?: string;
  color?: string | null;
  size?: string | null;
  description?: string;
  image?: string;
}

interface ProductExpandedProps {
  image?: string;
  name: string;
  price: string | number;
  details: string;
  sizes: SizeOption[];
  onSelectSize: (size: string) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onCollapse: () => void;
  variations?: Variation[];
}

// Add parsing utility and color mapping helper
function parseVariations(variations: Variation[]) {
  const colors = new Set<string>();
  const sizes = new Set<string>();
  const byColor: Record<string, string[]> = {};
  const bySize: Record<string, string[]> = {};
  const variationMap: Record<string, Variation> = {};

  for (const variation of variations) {
    // Prefer explicit color/size fields, fallback to name split
    let color = variation.color || '';
    let size = variation.size || '';
    if ((!color || !size) && variation.name) {
      const [c, s] = variation.name.split(',').map(str => str.trim());
      color = color || c;
      size = size || s;
    }
    if (!color || !size) continue;
    colors.add(color);
    sizes.add(size);
    if (!byColor[color]) byColor[color] = [];
    if (!byColor[color].includes(size)) byColor[color].push(size);
    if (!bySize[size]) bySize[size] = [];
    if (!bySize[size].includes(color)) bySize[size].push(color);
    variationMap[`${color}|${size}`] = variation;
  }
  return {
    colors: Array.from(colors),
    sizes: Array.from(sizes),
    byColor,
    bySize,
    variationMap,
  };
}

function colorToHex(color: string) {
  const map: Record<string, string> = {
    Black: '#000000',
    Purple: '#422B71',
    Peach: '#C29769',
    'Blue Aqua': '#00C7BE',
    'Light Pink': '#F2A1EC',
    Mint: '#00C7BE',
    // Add more as needed
  };
  return map[color] || '#888';
}

const ProductExpanded: React.FC<ProductExpandedProps> = ({
  image,
  name,
  price,
  details,
  quantity,
  onQuantityChange,
  onAddToCart,
  onCollapse,
  variations = [],
}) => {
  // Parse variations
  const { colors, sizes, byColor, bySize, variationMap } = parseVariations(variations);
  // State for color and size
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState((byColor[colors[0]] && byColor[colors[0]][0]) || sizes[0] || '');

  // Update size if color changes and current size is not available
  React.useEffect(() => {
    if (!byColor[selectedColor]?.includes(selectedSize)) {
      setSelectedSize(byColor[selectedColor]?.[0] || '');
    }
  }, [selectedColor]);
  // Update color if size changes and current color is not available
  React.useEffect(() => {
    if (!bySize[selectedSize]?.includes(selectedColor)) {
      setSelectedColor(bySize[selectedSize]?.[0] || '');
    }
  }, [selectedSize]);

  // Get the selected variation
  const selectedVariation = variationMap[`${selectedColor}|${selectedSize}`] || null;

  // Helper to get price from selected variation, fallback to parent price
  const getPrice = () => {
    if (selectedVariation && selectedVariation.price) {
      return selectedVariation.price;
    }
    return price;
  };
  // Helper to get color, size, description, image from selected variation
  const getColor = () => selectedVariation?.color || selectedColor || '';
  const getSize = () => selectedVariation?.size || selectedSize || '';
  const getVarDescription = () => selectedVariation?.description || '';
  const getVarImage = () => selectedVariation?.image || image;

  return (
    <div className={styles.Productexpanded}>
      <div className={styles.Lessinfobutton} onClick={onCollapse}>
        <div className={styles.LessInfo}>Less Info</div>
        <div className={styles.Polygon4}>
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.25 4.22651C0.583335 4.61141 0.583334 5.57366 1.25 5.95856L6.75 9.13399C7.41666 9.51889 8.25 9.03776 8.25 8.26796L8.25 1.91711C8.25 1.14731 7.41667 0.666184 6.75 1.05108L1.25 4.22651Z" fill="#2DA9E1"/>
            </svg>
          </div>
      </div>
      <div className={styles.ContentButton}>
        <div className={styles.ProductexpandedContent}>
          {/* Product image and info */}
          <div className={styles.PhotoPrice}>
            <div className={styles.Photo}>
              {getVarImage() ? (
                <img src={getVarImage()} alt={name} className={styles.PhotoImg} />
              ) : (
                <div className={styles.DefaultSvg1}>
                  <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M129.375 0H8.625C3.85753 0 0 3.85753 0 8.625V129.375C0 134.142 3.85753 138 8.625 138H129.375C134.142 138 138 134.142 138 129.375V8.625C138 3.85753 134.142 0 129.375 0ZM17.25 17.25H120.75V87.7335L101.1 68.0836C97.732 64.722 92.2724 64.722 88.9043 68.0836L36.2358 120.75H17.25V17.25Z" fill="white"/>
                    <path d="M51.75 69C61.2769 69 69 61.2769 69 51.75C69 42.2231 61.2769 34.5 51.75 34.5C42.2231 34.5 34.5 42.2231 34.5 51.75C34.5 61.2769 42.2231 69 51.75 69Z" fill="white"/>
                  </svg>
                </div>
              )}
            </div>
            {/* Selection Dots */}
            <div className={styles.SelectionDots}>
              {/* ...SVGs for arrows and dots as in your design... */}
            </div>
            {/* Name and Price */}
            <div className={styles.Productnameandprice}>
              <div className={styles.Productname}><span>{name}</span></div>
              <div className={styles.Price}><span>${getPrice()}</span></div>
            </div>
          </div>
          {/* Vertical Line SVG */}
          <div className={styles.Line9}>
            <svg width="4" height="302" viewBox="0 0 4 302" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L1.99999 300" stroke="#C0282D" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={styles.SizeDesc}>
            {/* Color Selector */}
            {colors.filter(color => byColor[color] && byColor[color].length > 0).length > 0 && (
              <div className={styles.ColorSelector}>
                <div className={styles.ColorSelectorLabel}>COLOR</div>
                <div className={styles.ColorselectionRow}>
                  {colors.filter(color => byColor[color] && byColor[color].length > 0).map(color => (
                    <button
                      key={color}
                      className={
                        styles.ColorCircle +
                        (selectedColor === color ? ' ' + styles.ColorCircleSelected : '')
                      }
                      aria-label={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ background: colorToHex(color) }}
                    >
                      {/* SVG for border effect if selected */}
                      {selectedColor === color && (
                        <svg className={styles.ColorCircleBorder} width="100%" height="100%" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="11" stroke="#2DA9E1" strokeWidth="2" fill="none" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className={styles.SizeSelector}>
                <div className={styles.SizeSelectorLabel}>SIZE</div>
                <div className={styles.SizeSelectionRow}>
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={
                        styles.SizeCircle +
                        (selectedSize === size ? ' ' + styles.SizeCircleSelected : '') +
                        (!byColor[selectedColor]?.includes(size) ? ' ' + styles.SizeCircleDisabled : '')
                      }
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      disabled={!byColor[selectedColor]?.includes(size)}
                    >
                      <span className={styles.SizeCircleLabel}>{size}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Show selected variation details */}
            {selectedVariation && (
              <div style={{ margin: '12px 0', color: '#fff', fontSize: 14 }}>
                {getColor() && <div><b>Color:</b> {getColor()}</div>}
                {getSize() && <div><b>Size:</b> {getSize()}</div>}
                {getVarDescription() && <div><b>Description:</b> {getVarDescription()}</div>}
              </div>
            )}
            {/* Quantity Controls */}
            <div className={styles.QtyWrapper}>
              <div className={styles.Minus} onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
                {/* Minus SVG */}
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="22" height="22.499" rx="11" fill="#2DA9E1"/>
                  <path d="M14.346 11.953C14.346 12.317 14.157 12.499 13.779 12.499H8.067C7.689 12.499 7.5 12.317 7.5 11.953V10.567C7.5 10.189 7.689 10 8.067 10H13.779C14.157 10 14.346 10.189 14.346 10.567V11.953Z" fill="white"/>
                </svg>
              </div>
              <div className={styles.QtyBox}>
                <span className={styles.QtyLabel}>QTY</span>
                <span className={styles.QtyValue}>{quantity}</span>
              </div>
              <div className={styles.Plus} onClick={() => onQuantityChange(quantity + 1)}>
                {/* Plus SVG */}
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="22" height="20.86" rx="10.43" fill="#C0282D"/>
                  <path d="M15.86 11.12C15.86 11.4667 15.6867 11.64 15.34 11.64H12.5V14.32C12.5 14.68 12.32 14.86 11.96 14.86H10.38C10.02 14.86 9.84 14.68 9.84 14.32V11.64H7.04C6.68 11.64 6.5 11.4667 6.5 11.12V9.8C6.5 9.44 6.68 9.26 7.04 9.26H9.84V6.54C9.84 6.18 10.02 6 10.38 6H11.96C12.32 6 12.5 6.18 12.5 6.54V9.26H15.34C15.6867 9.26 15.86 9.44 15.86 9.8V11.12Z" fill="white"/>
                </svg>
              </div>
            </div>
            {/* Product Details */}
            <div className={styles.Productdetails}>
              <div className={styles.ProductDetails}>{details}</div>
            </div>
          </div>
        </div>
        {/* Add to Cart Button outside content for positioning */}
        <div className={styles.Addtocartbutton} onClick={onAddToCart}>
          <div className={styles.AddToCart}>Add to Cart</div>
        </div>
      </div>
    </div>
  );
};

export default ProductExpanded; 