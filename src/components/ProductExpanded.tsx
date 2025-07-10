import React, { useState } from 'react';
import styles from './ProductExpanded.module.css';
import Image from 'next/image';
import { Variation } from '@/types/Product';
import ProductLargePhotoOverlay from './ProductLargePhotoOverlay';
import ReactDOM from 'react-dom';

interface SizeOption {
  label: string;
  selected: boolean;
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
    // Printful sidebar filter colors
    Beige:   "#d9be87",
    Black:   "#141313",
    Blue:    "#a3cef1",
    Brown:   "#322622",
    Green:   "#077949",
    Grey:    "#7f7f7f",
    Khaki:   "#a6925d",
    Navy:    "#1a2330",
    Orange:  "#ff5f2e",
    Pink:    "#fdbfc7",
    Purple:  "#48197d",
    Red:     "#d80019",
    White:   "#fffefa",
    Yellow:  "#ffd667",
    // Old custom colors (keep these as well)
    'Custom Black': '#000000',
    'Custom Purple': '#422B71',
    Peach: '#C29769',
    'Blue Aqua': '#00C7BE',
    'Light Pink': '#ffd4d5',
    Mint: '#a5f4bd',
    // Color-picker HTML colors (previous and new)
    "Black Heather": "#0b0b0b",
    "Vintage Black": "#151515",
    "Team Purple": "#230f46",
    "Cardinal": "#c21b3a",
    "Dark Grey": "#2a2929",
    "Heather Midnight Navy": "#302d4b",
    "Maroon": "#47001b",
    "Heather Navy": "#303643",
    "Dark Grey Heather": "#3E3C3D",
    "Military Green": "#4d4c36",
    "Heather Olive": "#5c5531",
    "Heather Clay": "#994836",
    "Heather Slate": "#4C626E",
    "Kelly": "#1a9462",
    "Heather Mauve": "#b2736f",
    "Charity Pink": "#FF6284",
    "Pebble": "#9a8479",
    "Heather Aqua": "#27a8c8",
    "Heather Team Purple": "#b680c1",
    "Burnt Orange": "#ed8043",
    "Heather Columbia Blue": "#7d95e8",
    "Toast": "#cf8d4c",
    "Sage": "#9eab96",
    "Mustard": "#eda027",
    "Teal": "#00e3cf",
    "Heather Prism Lilac": "#deafcd",
    "Tan": "#ddb792",
    "Turquoise": "#54d9eb",
    "Heather Prism Dusty Blue": "#a5c8bc",
    "Heather Prism Mint": "#aad5b9",
    "Heather Prism Peach": "#f3c2b2",
    "Athletic Heather": "#cececc",
    "Light Blue": "#d9efff",
    "Baby Blue": "#c7d7ef",
    "Soft Cream": "#e7d4c0",
    "Heather Prism Ice Blue": "#c3e2e3",
    "Natural": "#e8dacd",
    "Vintage White": "#fcf4e8",
    "Heather Ice Blue": "#e8fdff",
    "Citron": "#f7fee5",
    "Oxblood Black": "#2c1013",
    "Forest": "#223e25",
    "Forest Green": "#1a3b23",
    "True Royal": "#01408d",
    "Heather Forest": "#425040",
    "Berry": "#c02773",
    "Asphalt": "#52514f",
    "Army": "#5f5849",
    "Olive": "#5b642f",
    "Heather Raspberry": "#d23d62",
    "Autumn": "#c85313",
    "Heather Deep Teal": "#447085",
    "Heather True Royal": "#536ba7",
    "Aqua": "#008db5",
    "Heather Red": "#ed5359",
    "Heather Kelly": "#00a263",
    "Mauve": "#bf6e6e",
    "Leaf": "#5c9346",
    "Heather Orange": "#ff6f4e",
    "Heather Orchid": "#c2878e",
    "Gold": "#ffb22d",
    "Lilac": "#efbbe3",
    "Ocean Blue": "#a9dff6",
    "Heather Dust": "#e5d9c9",
    "Heather Mint": "#b2ebcf",
    "Soft Pink": "#ffd8e1",
    "Silver": "#e3e3dd",
    "Ash": "#f3f3f3",
    "Steel Blue": "#668ea7",
    "Dark Heather": "#595959",
    "Royal": "#175ac7",
    "Carolina Blue": "#96bbff",
    "Turf Green": "#187532",
    "Sapphire": "#007AB3",
    "Heliconia": "#E33F7A",
    "Charcoal": "#6a6967",
    "Tropical Blue": "#00A0B3",
    "Graphite Heather": "#858585",
    "Brown Savana": "#9f8971",
    "Irish Green": "#00ba69",
    "Azalea": "#ff98c6",
    "Sport Grey": "#c4c0be",
    "Sand": "#d6c0ab",
    "Lime": "#A3E05A",
    "Daisy": "#ffc946",
    "Sky": "#8ee0ff",
    "Yellow Haze": "#FFD99C",
    "Ice Grey": "#E9DDDC",
    "Dark Chocolate": "#301f13",
    "Dark Heather Grey": "#4D4D4D",
    "Heather Indigo": "#677B90",
    "Heather Royal": "#6288C5",
    "Coral Silk": "#ff7b71",
    "Cornsilk": "#FFEA8A",
    // Add more as needednom
    // New, non-duplicate colors from latest HTML snippet
    "True Navy": "#243b59",
    "Graphite": "#3e3737",
    "Midnight": "#3a4e63",
    "Hemp": "#4F5232",
    "Pepper": "#514f4c",
    "Grape": "#644E6D",
    "Brick": "#8d4b54",
    "Denim": "#565a67",
    "Blue Spruce": "#4c6151",
    "Crimson": "#bb5151",
    "Mystic Blue": "#5068AB",
    "Espresso": "#87634a",
    "Flo Blue": "#5669be",
    "Moss": "#6b7053",
    "Paprika": "#fe4747",
    "Watermelon": "#d15c68",
    "Light Green": "#608267",
    "Yam": "#db642f",
    "Blue Jean": "#707e8d",
    "Ice Blue": "#7a9096",
    "Violet": "#9a8ad2",
    "Crunchberry": "#ff748e",
    "Seafoam": "#69a999",
    "Terracotta": "#ff9364",
    "Granite": "#a6abaa",
    "Washed Denim": "#98aed1",
    "Bay": "#b8bfab",
    "Lagoon Blue": "#92dedb",
    "Orchid": "#f4d1ea",
    "Blossom": "#ffd1d6",
    "Chalky Mint": "#a1f2dc",
    "Butter": "#ffe09e",
    "Island Reef": "#b8ffca",
    "Chambray": "#d9f3ff",
    "Ivory": "#fff4d9",
  };
  return map[color] || '#888'; // fallback to grey if not found
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
  const [showLargePhoto, setShowLargePhoto] = useState(false);

  // Gather all unique images: main image + all variation images
  const allImages = Array.from(
    new Set([
      image,
      ...variations.map(v => v.image).filter(Boolean)
    ].filter(Boolean))
  ) as string[];
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasImages = allImages.length > 0;
  const showImage = hasImages ? allImages[currentIdx] : undefined;
  const totalImages = hasImages ? allImages.length : 1;
  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(idx => (idx - 1 + totalImages) % totalImages);
  };
  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(idx => (idx + 1) % totalImages);
  };

  // Update size if color changes and current size is not available
  React.useEffect(() => {
    if (!byColor[selectedColor]?.includes(selectedSize)) {
      setSelectedSize(byColor[selectedColor]?.[0] || '');
    }
  }, [selectedColor, byColor, selectedSize]);
  // Update color if size changes and current color is not available
  React.useEffect(() => {
    if (!bySize[selectedSize]?.includes(selectedColor)) {
      setSelectedColor(bySize[selectedSize]?.[0] || '');
    }
  }, [selectedSize, bySize, selectedColor]);

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
            <div className={styles.Photo} style={{ cursor: hasImages ? 'pointer' : undefined }} onClick={() => hasImages && setShowLargePhoto(true)}>
              {showImage ? (
                <Image
                  src={showImage}
                  alt={name}
                  width={138}
                  height={138}
                />
              ) : (
                <Image src="/file.svg" alt="No image" width={138} height={138} />
              )}
            </div>
            {/* Large Photo Overlay */}
            {showLargePhoto && showImage && typeof window !== 'undefined' &&
              ReactDOM.createPortal(
                <ProductLargePhotoOverlay
                  image={showImage}
                  title={name}
                  onClose={() => setShowLargePhoto(false)}
                />, document.body)
            }
            {/* Selection Dots */}
            <div className={styles.SelectionDots}>
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