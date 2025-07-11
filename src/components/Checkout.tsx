import React, { useState } from 'react';
import styles from './Checkout.module.css';
import { useCart, CartItem } from './CartContext';

// Simple US state tax rates (example, not legal advice)
const STATE_TAX_RATES: Record<string, number> = {
  CA: 0.0725,
  NY: 0.04,
  TX: 0.0625,
  FL: 0.06,
  IL: 0.0625,
  PA: 0.06,
  OH: 0.0575,
  GA: 0.04,
  NC: 0.0475,
  MI: 0.06,
  NJ: 0.06625,
  VA: 0.053,
  WA: 0.065,
  AZ: 0.056,
  MA: 0.0625,
  TN: 0.07,
  IN: 0.07,
  MO: 0.04225,
  MD: 0.06,
  WI: 0.05,
  CO: 0.029,
  MN: 0.06875,
  SC: 0.06,
  AL: 0.04,
  LA: 0.0445,
  KY: 0.06,
  OR: 0.0,
  OK: 0.045,
  CT: 0.0635,
  IA: 0.06,
  AR: 0.065,
  KS: 0.065,
  NV: 0.0685,
  UT: 0.0485,
  MS: 0.07,
  NE: 0.055,
  NM: 0.05125,
  WV: 0.06,
  ID: 0.06,
  HI: 0.04,
  NH: 0.0,
  ME: 0.055,
  RI: 0.07,
  MT: 0.0,
  DE: 0.0,
  SD: 0.045,
  ND: 0.05,
  AK: 0.0,
  VT: 0.06,
  WY: 0.04,
};
const US_STATES = Object.keys(STATE_TAX_RATES);

interface CheckoutProps {
  cartItems?: React.ReactNode[];
  onClose?: () => void;
  onOrder?: () => void;
}

declare global {
  interface Window {
    Square?: unknown;
  }
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onClose, onOrder }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart } = useCart();
  // New shipping info state
  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state_code: 'CA',
    country_code: 'US',
    zip: '',
  });

  // Calculate subtotal, tax, discount, and total
  const subtotalCents = cart.reduce((sum: number, item: CartItem) => sum + Math.round(item.price * 100) * item.quantity, 0);
  const taxRate = STATE_TAX_RATES[shipping.state_code] || 0;
  const totalTaxCents = Math.round(subtotalCents * taxRate);
  const totalDiscountCents = cart.reduce((sum: number, item: CartItem) => sum + Math.round(item.discount ? item.discount * 100 * item.quantity : 0), 0);
  const totalCents = subtotalCents + totalTaxCents - totalDiscountCents;

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    try {
      // Send cart and shipping to backend to get Square checkout URL
      const res = await fetch('/api/square-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shipping }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Failed to create checkout');
      if (onOrder) onOrder();
      window.location.href = data.url;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Checkout error');
      } else {
        setError('Checkout error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Checkout}>
      <div className={styles.XBar}>
        <button
          type="button"
          aria-label="Close checkout"
          className={styles.XButton}
          onClick={onClose}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="12" height="12" rx="6" fill="#C0282D"/>
            <path d="M8.22181 2.34591C8.60022 1.96756 9.2136 1.96752 9.59198 2.34591C9.97031 2.72429 9.97031 3.33768 9.59198 3.71607L7.37019 5.93786L9.71625 8.28392C10.0946 8.66231 10.0946 9.2757 9.71625 9.65408C9.33787 10.0325 8.72449 10.0324 8.34609 9.65408L6.00003 7.30802L3.65397 9.65408C3.27558 10.0325 2.66221 10.0324 2.2838 9.65408C1.9054 9.27568 1.9054 8.66232 2.2838 8.28392L4.62986 5.93786L2.40807 3.71607C2.02967 3.33767 2.02967 2.72431 2.40807 2.34591C2.78648 1.96756 3.39986 1.96752 3.77824 2.34591L6.00003 4.56769L8.22181 2.34591Z" fill="white"/>
          </svg>
        </button>
      </div>
      <div className={styles.CheckoutMainContent}>
        <div className={styles.CheckoutContainer1}>
          {cartItems && cartItems.length > 0 ? cartItems : null}
        </div>
        <div className={styles.CheckoutContainer2}>
          <div className={styles.Nameinput}>
            <div className={styles.Name}>Name</div>
            <input
              type="text"
              value={shipping.name}
              onChange={e => setShipping({ ...shipping, name: e.target.value })}
              placeholder="Full Name"
              required
            />
          </div>
          <div className={styles.Emailinput}>
            <div className={styles.Email}>Email</div>
            <input
              type="email"
              value={shipping.email}
              onChange={e => setShipping({ ...shipping, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.BillingAddress}>Billing Address</div>
          <div className={styles.Addressline1input}></div>
          <div className={styles.Addressline2input}></div>
          <div className={styles.Addressline3input}></div>
          <div className={styles.ShippingAddress}>Shipping Address</div>
          <div className={styles.Addressline1input}>
            <input
              type="text"
              value={shipping.address1}
              onChange={e => setShipping({ ...shipping, address1: e.target.value })}
              placeholder="Address 1"
              required
            />
          </div>
          <div className={styles.Addressline2input}>
            <input
              type="text"
              value={shipping.address2 || ''}
              onChange={e => setShipping({ ...shipping, address2: e.target.value })}
              placeholder="Address 2 (optional)"
            />
          </div>
          <div className={styles.Addressline3input}>
            <input
              type="text"
              value={shipping.city}
              onChange={e => setShipping({ ...shipping, city: e.target.value })}
              placeholder="City"
              required
            />
            <select
              id="shipping-state"
              value={shipping.state_code}
              onChange={e => setShipping({ ...shipping, state_code: e.target.value })}
              style={{ fontSize: 14, padding: 4, borderRadius: 6, marginLeft: 8, marginRight: 8 }}
              required
            >
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <input
              type="text"
              value={shipping.zip}
              onChange={e => setShipping({ ...shipping, zip: e.target.value })}
              placeholder="ZIP"
              required
              style={{ marginLeft: 8 }}
            />
            <input
              type="text"
              value={shipping.country_code}
              onChange={e => setShipping({ ...shipping, country_code: e.target.value })}
              placeholder="Country (e.g. US)"
              required
              style={{ marginLeft: 8 }}
            />
          </div>
          <div className={styles.Signupforemail}>
            <div className={styles.Agreetoterms}>
              <div className={styles.Checkcircle}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.4765 1.7294C12.7785 0.977243 11.6472 0.977243 10.9492 1.7294L4.63022 8.52197L3.05084 6.82382C2.35282 6.07627 1.2211 6.07627 0.523514 6.82382C-0.174505 7.57598 -0.174505 8.79421 0.523514 9.54176L3.3668 12.6012C4.06482 13.3533 5.19607 13.3533 5.89409 12.6012L13.4765 4.44734C14.1745 3.69518 14.1745 2.47695 13.4765 1.7294Z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className={styles.SignUpForEmailMarketingUpdates}>Sign Up for Email marketing updates</div>
          </div>
        </div>
        <div className={styles.CheckoutContainer3}>
          <div className={styles.Paymentinfo}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* Order summary display */}
            <div style={{ fontWeight: 'bold', fontSize: 16, color: '#2DA9E1', marginBottom: 12, textAlign: 'right' }}>
              <div style={{ fontWeight: 'normal', color: '#fff', fontSize: 15 }}>Subtotal: ${ (subtotalCents / 100).toFixed(2) }</div>
              {totalTaxCents > 0 && <div style={{ fontWeight: 'normal', color: '#fff', fontSize: 15 }}>Tax: ${ (totalTaxCents / 100).toFixed(2) }</div>}
              {totalDiscountCents > 0 && <div style={{ fontWeight: 'normal', color: '#fff', fontSize: 15 }}>Discount: -${ (totalDiscountCents / 100).toFixed(2) }</div>}
              <div style={{ borderTop: '1px solid #2DA9E1', margin: '6px 0' }} />
              Order Total: ${ (totalCents / 100).toFixed(2) }
            </div>
            <div className={styles.Addtocartbutton} onClick={handlePurchase} style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}>
              <div className={styles.Purchase}>{loading ? 'Processing...' : 'Purchase'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 