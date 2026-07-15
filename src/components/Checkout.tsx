'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';

// ── Minimal typing for the Square Web Payments SDK (loaded from CDN) ──
interface SquareCard {
  attach: (selector: string | HTMLElement) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy?: () => void;
}
interface SquarePayments {
  card: () => Promise<SquareCard>;
}
interface SquareSDK {
  payments: (appId: string, locationId: string) => SquarePayments;
}
declare global {
  interface Window {
    Square?: SquareSDK;
  }
}

interface ShippingOption {
  id: string;
  label: string;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  minDeliveryDays?: number;
  maxDeliveryDays?: number;
  token: string;
}

interface CheckoutProps {
  onClose?: () => void;
  onSuccess?: (orderId: string) => void;
}

const ENV = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox';
const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || '';
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || '';
const SDK_URL =
  ENV === 'production'
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js';

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

function loadSquareSdk(): Promise<SquareSDK> {
  return new Promise((resolve, reject) => {
    if (window.Square) return resolve(window.Square);
    const existing = document.querySelector(`script[src="${SDK_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Square!));
      existing.addEventListener('error', () => reject(new Error('Failed to load Square SDK')));
      return;
    }
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.onload = () => (window.Square ? resolve(window.Square) : reject(new Error('Square SDK unavailable')));
    script.onerror = () => reject(new Error('Failed to load Square SDK'));
    document.head.appendChild(script);
  });
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', marginBottom: 8, borderRadius: 6,
  border: '1px solid #3a2f5a', background: '#0f0b1e', color: '#fff',
  fontFamily: 'Hack, monospace', fontSize: 14, boxSizing: 'border-box',
};

const Checkout: React.FC<CheckoutProps> = ({ onClose, onSuccess }) => {
  const { cart, clearCart } = useCart();

  const [recipient, setRecipient] = useState({
    name: '', email: '', phone: '',
    address1: '', address2: '', city: '', state_code: 'CA', country_code: 'US', zip: '',
  });

  const [options, setOptions] = useState<ShippingOption[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<SquareCard | null>(null);
  const [cardReady, setCardReady] = useState(false);

  const subtotalCents = cart.reduce((s, i) => s + Math.round(i.price * 100) * i.quantity, 0);
  const selected = options?.find((o) => o.id === selectedId) || null;

  const setField = (k: keyof typeof recipient, v: string) => {
    setRecipient((r) => ({ ...r, [k]: v }));
    // Any address change invalidates the quote.
    setOptions(null);
    setSelectedId(null);
  };

  const addressComplete =
    recipient.name && recipient.email && recipient.address1 && recipient.city &&
    recipient.state_code && recipient.zip;

  const handleQuote = async () => {
    setQuoting(true);
    setError(null);
    setOptions(null);
    setSelectedId(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, recipient }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not calculate shipping & tax');
      if (!data.options?.length) throw new Error('No shipping options available');
      setOptions(data.options);
      setSelectedId(data.options[0].id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Quote failed');
    } finally {
      setQuoting(false);
    }
  };

  // Mount the Square card form once an option is selected.
  useEffect(() => {
    if (!selected || cardReady) return;
    let cancelled = false;
    (async () => {
      try {
        if (!APP_ID || !LOCATION_ID) {
          throw new Error('Square is not configured (missing app/location id)');
        }
        const sdk = await loadSquareSdk();
        if (cancelled) return;
        const payments = sdk.payments(APP_ID, LOCATION_ID);
        const card = await payments.card();
        if (cancelled) return;
        await card.attach('#sq-card');
        cardRef.current = card;
        setCardReady(true);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load card form');
      }
    })();
    return () => { cancelled = true; };
  }, [selected, cardReady]);

  const handlePay = async () => {
    if (!selected || !cardRef.current) return;
    setPaying(true);
    setError(null);
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== 'OK' || !result.token) {
        throw new Error(result.errors?.[0]?.message || 'Card was declined or invalid');
      }
      const res = await fetch('/api/square-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: result.token, token: selected.token, cart, recipient }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Payment failed');
      clearCart();
      onSuccess?.(data.orderId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment error');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div style={{
      background: '#151029', color: '#fff', borderRadius: 16, padding: 24,
      width: 'min(460px, 92vw)', maxHeight: '88vh', overflowY: 'auto',
      fontFamily: 'Hack, monospace', boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <strong style={{ fontSize: 18 }}>Checkout</strong>
        <button onClick={onClose} aria-label="Close checkout"
          style={{ background: '#C0282D', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
      </div>

      {/* Shipping address */}
      <div style={{ color: '#2DA9E1', fontSize: 13, margin: '4px 0 8px' }}>Shipping address</div>
      <input style={inputStyle} placeholder="Full name" value={recipient.name} onChange={(e) => setField('name', e.target.value)} />
      <input style={inputStyle} placeholder="Email" type="email" value={recipient.email} onChange={(e) => setField('email', e.target.value)} />
      <input style={inputStyle} placeholder="Phone (optional)" value={recipient.phone} onChange={(e) => setField('phone', e.target.value)} />
      <input style={inputStyle} placeholder="Address line 1" value={recipient.address1} onChange={(e) => setField('address1', e.target.value)} />
      <input style={inputStyle} placeholder="Address line 2 (optional)" value={recipient.address2} onChange={(e) => setField('address2', e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ ...inputStyle, flex: 2 }} placeholder="City" value={recipient.city} onChange={(e) => setField('city', e.target.value)} />
        <select style={{ ...inputStyle, flex: 1 }} value={recipient.state_code} onChange={(e) => setField('state_code', e.target.value)}>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input style={{ ...inputStyle, flex: 1 }} placeholder="ZIP" value={recipient.zip} onChange={(e) => setField('zip', e.target.value)} />
      </div>

      {!options && (
        <button onClick={handleQuote} disabled={!addressComplete || quoting}
          style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: 'none',
            background: addressComplete ? '#2DA9E1' : '#3a3a3a', color: '#fff',
            cursor: addressComplete && !quoting ? 'pointer' : 'not-allowed', fontFamily: 'Hack, monospace' }}>
          {quoting ? 'Calculating…' : 'Calculate shipping & tax'}
        </button>
      )}

      {/* Shipping options */}
      {options && (
        <>
          <div style={{ color: '#2DA9E1', fontSize: 13, margin: '14px 0 6px' }}>Shipping method</div>
          {options.map((o) => (
            <label key={o.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
              padding: '8px 10px', marginBottom: 6, borderRadius: 8, cursor: 'pointer',
              border: `1px solid ${selectedId === o.id ? '#2DA9E1' : '#3a2f5a'}`,
              background: selectedId === o.id ? '#1c1636' : '#0f0b1e',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="radio" name="ship" checked={selectedId === o.id} onChange={() => setSelectedId(o.id)} />
                <span style={{ fontSize: 13 }}>
                  {o.label}
                  {o.minDeliveryDays != null && (
                    <span style={{ color: '#9a8fc0', display: 'block', fontSize: 11 }}>
                      {o.minDeliveryDays}–{o.maxDeliveryDays} business days
                    </span>
                  )}
                </span>
              </span>
              <span>{money(o.shippingCents)}</span>
            </label>
          ))}

          {/* Order summary */}
          <div style={{ borderTop: '1px solid #2DA9E1', margin: '12px 0 8px', paddingTop: 8, fontSize: 14 }}>
            <Row label="Subtotal" value={money(subtotalCents)} />
            {selected && <Row label="Shipping" value={money(selected.shippingCents)} />}
            {selected && selected.taxCents > 0 && <Row label="Sales tax" value={money(selected.taxCents)} />}
            {selected && (
              <Row label="Total" value={money(selected.totalCents)} bold />
            )}
          </div>

          {/* Square card form */}
          <div style={{ color: '#2DA9E1', fontSize: 13, margin: '8px 0 6px' }}>Card details</div>
          <div id="sq-card" style={{ background: '#fff', borderRadius: 6, padding: 4, minHeight: 44 }} />
          {!cardReady && <div style={{ fontSize: 12, color: '#9a8fc0', marginTop: 6 }}>Loading secure card form…</div>}

          <button onClick={handlePay} disabled={!cardReady || paying}
            style={{ width: '100%', padding: 12, marginTop: 12, borderRadius: 8, border: 'none',
              background: cardReady ? '#2DA9E1' : '#3a3a3a', color: '#fff', fontSize: 16,
              cursor: cardReady && !paying ? 'pointer' : 'not-allowed', fontFamily: 'Hack, monospace' }}>
            {paying ? 'Processing…' : selected ? `Pay ${money(selected.totalCents)}` : 'Pay'}
          </button>
        </>
      )}

      {error && <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </div>
  );
};

const Row: React.FC<{ label: string; value: string; bold?: boolean }> = ({ label, value, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2px 0', fontWeight: bold ? 700 : 400 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);

export default Checkout;
