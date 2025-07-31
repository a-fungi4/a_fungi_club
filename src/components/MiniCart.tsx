import React, { useState, useEffect } from 'react';
import styles from './MiniCart.module.css';
import { useCart } from './CartContext';
import CartItem from './CartItem'; // Added import for CartItem

interface MiniCartProps {
  onClose?: () => void;
  onCheckout?: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Added removeFromCart and updateQuantity
  console.log('MiniCart cart:', cart);
  const [zip, setZip] = useState('');
  const [shipping, setShipping] = useState<number | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);
  // Placeholder: Square calculates tax at checkout, so we use a fake rate for preview
  const taxRate = 0.09; // 9% example
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * taxRate;
  const total = subtotal + (shipping ?? 0) + taxes;
  const [variantMap, setVariantMap] = useState<Record<string, string>>({});
  useEffect(() => {
    fetch('/api/square-products')
      .then(res => res.json())
      .then(data => setVariantMap(data.variationToPrintful || {}));
  }, []);

  const handleCalculateShipping = async () => {
    setShippingLoading(true);
    setShippingError(null);
    setShipping(null);
    try {
      // Debug logging
      console.log('Cart contents:', cart);
      console.log('variantMap:', variantMap);
      console.log('Available variant IDs:', Object.keys(variantMap));
      
      // Use mapping to get Printful variant_id
      const items = cart
        .map(item => {
          const variant_id = variantMap[item.id];
          console.log(`Looking up variant_id for cart item ${item.id}:`, variant_id);
          if (!variant_id) {
            console.warn('No Printful variant_id for cart item', item.id, item);
            return null;
          }
          return { variant_id, quantity: item.quantity };
        })
        .filter(Boolean);
      console.log('Items array for Printful:', items);
      if (items.length === 0) {
        console.error('No valid Printful items in cart. Cart IDs:', cart.map(i => i.id), 'Mapping keys:', Object.keys(variantMap));
        setShippingError('No valid Printful items in cart');
        setShippingLoading(false);
        return;
      }
      const payload = {
        recipient: {
          country_code: 'US',
          zip,
        },
        items,
      };
      console.log('Sending shipping request with payload:', payload);
      const res = await fetch('/api/printful/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log('Printful API response:', data);
      if (!res.ok) throw new Error(data.error || 'Shipping error');
      
      // Handle Printful API response format
      // data.result is an object with a 'rate' property, not a direct number
      const shippingValue = typeof data.result === 'object' && data.result?.rate ? 
                           Number(data.result.rate) : 
                           typeof data.result === 'number' ? data.result : 
                           typeof data.result === 'string' ? parseFloat(data.result) || 0 : 0;
      console.log('Extracted shipping value:', shippingValue, 'Type:', typeof shippingValue);
      setShipping(shippingValue);
    } catch (err: unknown) {
      let message = 'Shipping error';
      if (err instanceof Error) message = err.message;
      else if (typeof err === 'object' && err !== null) {
        console.error('Shipping API error:', err);
        if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
          message = (err as { message: string }).message;
        } else {
          message = JSON.stringify(err);
        }
      }
      setShippingError(message);
    } finally {
      setShippingLoading(false);
    }
  };

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
      {/* Taxes & Shipping UI */}
      <div className={styles.taxesShippingSection}>
        <div className={styles.taxesShippingHeader}>
          <div className={styles.taxesShippingHeaderText}>Taxes & Shipping</div>
        </div>
        {/* Zip input and Calculate button row */}
        <div className={styles.zipCalculateRow}>
          <div className={styles.zipInputContainer}>
            <div className={styles.zipLabel}>Zip</div>
            <input
              type="text"
              placeholder="Enter ZIP code"
              className={styles.zipInput}
              maxLength={10}
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={styles.calculateButton}
            onClick={handleCalculateShipping}
            disabled={shippingLoading || !zip}
          >
            <div className={styles.calculateButtonText}>{shippingLoading ? '...' : 'Calculate'}</div>
          </button>
        </div>
        {shippingError && <div style={{ color: 'red', fontSize: 10 }}>{shippingError}</div>}
        <div className={styles.taxesShippingRow}>
          <div className={styles.taxesShippingLabel}>Subtotal:</div>
          <div className={styles.taxesShippingValue}>${subtotal.toFixed(2)}</div>
        </div>
        <div className={styles.taxesShippingRow}>
          <div className={styles.taxesShippingLabel}>Taxes:</div>
          <div className={styles.taxesShippingTaxRatePrice}>
            <div className={styles.taxesShippingTaxRate}>{(taxRate * 100).toFixed(1)}%</div>
            <div className={styles.taxesShippingValue}>${taxes.toFixed(2)}</div>
          </div>
        </div>
        <div className={styles.taxesShippingRow}>
          <div className={styles.taxesShippingLabel}>Shipping:</div>
          <div className={styles.taxesShippingValue}>
            {shippingLoading ? '...' : 
             shipping !== null ? 
               `$${typeof shipping === 'number' ? shipping.toFixed(2) : '0.00'}` : 
               '--'}
          </div>
        </div>
        <div className={styles.taxesShippingRow}>
          <div className={styles.taxesShippingLabel}>Total:</div>
          <div className={styles.taxesShippingValue}>${total.toFixed(2)}</div>
        </div>
      </div>
      <div className={styles.Addtocartbutton}>
        <button
          type="button"
          className={styles.CheckOut}
          onClick={onCheckout}
          disabled={!zip || shipping === null || !!shippingError}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: (!zip || shipping === null || !!shippingError) ? 'not-allowed' : 'pointer', padding: 0 }}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MiniCart; 