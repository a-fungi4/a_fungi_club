import React from 'react';
import styles from './MiniCart.module.css';
import { useCart } from './CartContext';
import CartItem from './CartItem';

interface MiniCartProps {
  onClose?: () => void;
  onCheckout?: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.Minicart}>
      <div className={styles.XBar}>
        <div className={styles.XButton}>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="12" height="12" rx="6" fill="#C0282D"/>
              <path d="M7.66636 3.21619C7.95016 2.92795 8.4102 2.92792 8.69398 3.21619C8.97773 3.50446 8.97773 3.97176 8.69398 4.26003L7.02764 5.95266L8.78719 7.73997C9.07094 8.02824 9.07094 8.49554 8.78719 8.78381C8.5034 9.07208 8.04337 9.07205 7.75957 8.78381L6.00002 6.9965L4.24047 8.78381C3.95669 9.07208 3.49665 9.07205 3.21285 8.78381C2.92905 8.49553 2.92905 8.02825 3.21285 7.73997L4.9724 5.95266L3.30606 4.26003C3.02226 3.97175 3.02226 3.50447 3.30606 3.21619C3.58986 2.92795 4.04989 2.92792 4.33368 3.21619L6.00002 4.90882L7.66636 3.21619Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.CartItemsContainer}>
        {cart.length > 0 ? cart.map(item => (
          <CartItem
            key={item.id + (item.variation || '')}
            name={item.name}
            image={item.image}
            price={item.price}
            quantity={item.quantity}
            variation={item.variation}
            onRemove={() => removeFromCart(item.id, item.variation)}
            onQuantityChange={qty => updateQuantity(item.id, qty, item.variation)}
          />
        )) : <div style={{ color: '#fff', textAlign: 'center', marginTop: 16 }}>Your cart is empty.</div>}
      </div>
      <div className={styles.taxesShippingSection}>
        <div className={styles.taxesShippingRow}>
          <div className={styles.taxesShippingLabel}>Subtotal:</div>
          <div className={styles.taxesShippingValue}>${subtotal.toFixed(2)}</div>
        </div>
        <div style={{ fontSize: 10, color: '#9a8fc0', textAlign: 'center', marginTop: 4 }}>
          Shipping &amp; tax calculated at checkout
        </div>
      </div>
      <div className={styles.Addtocartbutton}>
        <button
          type="button"
          className={styles.CheckOut}
          onClick={onCheckout}
          disabled={cart.length === 0}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MiniCart;
