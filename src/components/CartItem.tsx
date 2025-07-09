import React from 'react';
import styles from './CartItem.module.css';
import Image from 'next/image';

interface CartItemProps {
  name: string;
  image?: string;
  price: number;
  quantity: number;
  variation?: string;
  onRemove: () => void;
  onQuantityChange: (qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, image, price, quantity, variation, onRemove, onQuantityChange }) => {
  return (
    <div data-layer="CartItem" className={styles.Cartitem}>
      <div data-layer="Frame206" className={styles.Frame206}>
        <div data-layer="RemoveProduct" className={styles.Removeproduct} onClick={onRemove}>
          <div data-layer="X" className={styles.X}>X</div>
        </div>
        <div data-layer="PlaceHolderPhoto" className={styles.Placeholderphoto}>
          {image ? (
            <Image src={image} alt={name} width={80} height={80} className={styles.Image} />
          ) : (
            <div data-svg-wrapper data-layer="Vector" className={styles.Vector}>
              <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M67.5 0H4.5C2.01262 0 0 2.01263 0 4.5V67.5C0 69.9874 2.01262 72 4.5 72H67.5C69.9874 72 72 69.9874 72 67.5V4.5C72 2.01263 69.9874 0 67.5 0ZM9 9H63V45.774L52.7479 35.5219C50.9906 33.768 48.1421 33.768 46.3849 35.5219L18.9056 63H9V9Z" fill="white"/>
                <path d="M27.0009 35.9999C31.9715 35.9999 36.0009 31.9705 36.0009 26.9999C36.0009 22.0294 31.9715 17.9999 27.0009 17.9999C22.0304 17.9999 18.0009 22.0294 18.0009 26.9999C18.0009 31.9705 22.0304 35.9999 27.0009 35.9999Z" fill="white"/>
              </svg>
            </div>
          )}
        </div>
        <div data-layer="ProductName" className={styles.Productname}>
          <div data-layer="Product Name" className={styles.ProductName}>{name}{variation ? ` (${variation})` : ''}</div>
        </div>
      </div>
      <div data-layer="Frame38" className={styles.Frame38}>
        <div data-layer="QTYPriceRow" className={styles.Qtypricerow}>
          <div data-svg-wrapper data-layer="Minus" className={styles.Minus} onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="22.499" rx="11" fill="#2DA9E1"/>
              <path d="M13.846 11.953C13.846 12.317 13.657 12.499 13.279 12.499H7.567C7.189 12.499 7 12.317 7 11.953V10.567C7 10.189 7.189 10 7.567 10H13.279C13.657 10 13.846 10.189 13.846 10.567V11.953Z" fill="white"/>
            </svg>
          </div>
          <div data-layer="QTY" className={styles.Qty}>
            <div className={styles.QtyLabel}>QTY</div>
            <div className={styles.QtyValue}>{quantity}</div>
          </div>
          <div data-svg-wrapper data-layer="Plus" className={styles.Plus} onClick={() => onQuantityChange(quantity + 1)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="21.4658" rx="10.7329" fill="#C0282D"/>
              <path d="M16 11.4701C16 11.8405 15.8148 12.0256 15.4444 12.0256H12.4103V14.8889C12.4103 15.2735 12.2179 15.4658 11.8333 15.4658H10.1453C9.76068 15.4658 9.56838 15.2735 9.56838 14.8889V12.0256H6.57692C6.19231 12.0256 6 11.8405 6 11.4701V10.0598C6 9.67521 6.19231 9.48291 6.57692 9.48291H9.56838V6.57692C9.56838 6.19231 9.76068 6 10.1453 6H11.8333C12.2179 6 12.4103 6.19231 12.4103 6.57692V9.48291H15.4444C15.8148 9.48291 16 9.67521 16 10.0598V11.4701Z" fill="white"/>
            </svg>
          </div>
          <div data-layer="ItemSubTotal" className={styles.Itemsubtotal}>
            <div className={styles.ItemsubtotalValue}>${(price * quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
