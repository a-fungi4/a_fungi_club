import React from 'react';
import styles from './ProductExpanded.module.css';

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
}

const ProductExpanded: React.FC<ProductExpandedProps> = ({
  image,
  name,
  price,
  details,
  sizes,
  onSelectSize,
  quantity,
  onQuantityChange,
  onAddToCart,
  onCollapse,
}) => {
  return (
    <div className={styles.Productexpanded}>
      <div className={styles.PhotoPrice}>
        <div className={styles.Photo}>
          {/* Product image or fallback SVGs */}
          {image ? (
            <img src={image} alt={name} className={styles.PhotoImg} />
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
          <div className={styles.Price}><span>${price}</span></div>
        </div>
        {/* Add to Cart Button */}
        <div className={styles.Addtocartbutton} onClick={onAddToCart}>
          <div className={styles.AddToCart}>Add to Cart</div>
        </div>
      </div>
      {/* Vertical Line SVG */}
      <div className={styles.Line9}>
        <svg width="4" height="302" viewBox="0 0 4 302" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L1.99999 300" stroke="#C0282D" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <div className={styles.SizeDesc}>
        {/* Size Selection */}
        <div className={styles.Sizeselection}>
          {sizes.map((size) => (
            <div
              key={size.label}
              className={styles.Sizeselectionitem}
              onClick={() => onSelectSize(size.label)}
              style={{ opacity: size.selected ? 1 : 0.5, cursor: 'pointer' }}
            >
              <div className={styles.Ellipse6}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z" fill={size.selected ? '#2DA9E1' : 'rgba(192,40,45,0.54)'} fillOpacity={size.selected ? 1 : 0.54}/>
                </svg>
              </div>
              <div className={styles.SizeLabel}>{size.label}</div>
            </div>
          ))}
        </div>
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
      {/* Collapse Button */}
      <div className={styles.Lessinfobutton} onClick={onCollapse}>
        <div className={styles.LessInfo}>Less Info</div>
        <div className={styles.Polygon4}>
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25 4.22651C0.583335 4.61141 0.583334 5.57366 1.25 5.95856L6.75 9.13399C7.41666 9.51889 8.25 9.03776 8.25 8.26796L8.25 1.91711C8.25 1.14731 7.41667 0.666184 6.75 1.05108L1.25 4.22651Z" fill="#2DA9E1"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductExpanded; 