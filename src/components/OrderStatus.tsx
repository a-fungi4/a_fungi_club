'use client';
import React, { useState } from 'react';

interface OrderStatusProps {
  onClose?: () => void;
}

interface Shipment {
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}
interface StatusResult {
  orderId: string;
  createdAt?: string;
  squareState?: string;
  totalCents?: number;
  items: { name: string; quantity: number }[];
  printfulStatus?: string;
  shipments: Shipment[];
}

// Friendly labels + a simple 3-step progression for the Printful status.
const PF_LABELS: Record<string, string> = {
  draft: 'Order received', pending: 'Order received',
  inprocess: 'In production', onhold: 'On hold',
  partial: 'Shipped', fulfilled: 'Shipped',
  canceled: 'Canceled', failed: 'Failed',
};
const STEPS = ['Order received', 'In production', 'Shipped'];
function stepIndex(status?: string): number {
  const label = status ? PF_LABELS[status] : undefined;
  const i = label ? STEPS.indexOf(label) : -1;
  return i;
}

const money = (c?: number) => (c == null ? '' : `$${(c / 100).toFixed(2)}`);

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 10px', marginBottom: 10, borderRadius: 6,
  border: '1px solid #3a2f5a', background: '#0f0b1e', color: '#fff',
  fontFamily: 'Hack, monospace', fontSize: 14, boxSizing: 'border-box',
};
const btnStyle = (enabled: boolean): React.CSSProperties => ({
  width: '100%', padding: 11, borderRadius: 8, border: 'none', fontSize: 15,
  background: enabled ? '#2DA9E1' : '#3a3a3a', color: '#fff',
  cursor: enabled ? 'pointer' : 'not-allowed', fontFamily: 'Moby, sans-serif',
});

const OrderStatus: React.FC<OrderStatusProps> = ({ onClose }) => {
  const [step, setStep] = useState<'form' | 'otp' | 'result'>('form');
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [challenge, setChallenge] = useState('');
  const [result, setResult] = useState<StatusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/order-status/request', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send code');
      setChallenge(data.challenge);
      setStep('otp');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/order-status/verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge, otp: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not verify code');
      setResult(data);
      setStep('result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally { setLoading(false); }
  };

  const activeStep = result ? stepIndex(result.printfulStatus) : -1;
  const isTerminal = result?.printfulStatus === 'canceled' || result?.printfulStatus === 'failed';

  return (
    <div style={{
      background: '#151029', color: '#fff', borderRadius: 16, padding: 22,
      width: 'min(420px, 92vw)', maxHeight: '86vh', overflowY: 'auto',
      fontFamily: 'Hack, monospace', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <strong style={{ fontFamily: 'Moby, sans-serif', fontSize: 18 }}>Order Status</strong>
        <button onClick={onClose} aria-label="Close"
          style={{ background: '#C0282D', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
      </div>

      {step === 'form' && (
        <>
          <p style={{ fontSize: 12, color: '#9a8fc0', marginBottom: 12 }}>
            Enter your order number (from your confirmation email) and the email you used at checkout.
          </p>
          <input style={inputStyle} placeholder="Order number" value={orderId} onChange={e => setOrderId(e.target.value)} />
          <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <button style={btnStyle(!!orderId.trim() && !!email.trim() && !loading)}
            disabled={!orderId.trim() || !email.trim() || loading} onClick={requestOtp}>
            {loading ? 'Sending…' : 'Send code'}
          </button>
        </>
      )}

      {step === 'otp' && (
        <>
          <p style={{ fontSize: 13, color: '#9a8fc0', marginBottom: 12 }}>
            We emailed a 6-digit code to <strong style={{ color: '#fff' }}>{email}</strong>. Enter it below.
          </p>
          <input style={{ ...inputStyle, letterSpacing: 6, textAlign: 'center', fontSize: 20 }}
            placeholder="••••••" inputMode="numeric" maxLength={6}
            value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} />
          <button style={btnStyle(otp.trim().length === 6 && !loading)}
            disabled={otp.trim().length !== 6 || loading} onClick={verifyOtp}>
            {loading ? 'Checking…' : 'View my order'}
          </button>
          <button onClick={() => { setStep('form'); setOtp(''); setError(null); }}
            style={{ background: 'none', border: 'none', color: '#2DA9E1', cursor: 'pointer', marginTop: 10, fontSize: 12 }}>
            ← Use a different order/email
          </button>
        </>
      )}

      {step === 'result' && result && (
        <>
          <div style={{ fontSize: 12, color: '#9a8fc0', marginBottom: 4 }}>Order #{result.orderId}</div>
          {result.createdAt && (
            <div style={{ fontSize: 12, color: '#9a8fc0', marginBottom: 12 }}>
              Placed {new Date(result.createdAt).toLocaleDateString()}
            </div>
          )}

          {/* Progress */}
          {isTerminal ? (
            <div style={{ background: 'rgba(192,40,45,0.2)', border: '1px solid #C0282D', borderRadius: 8, padding: 10, marginBottom: 12, textAlign: 'center' }}>
              This order was {result.printfulStatus}.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {STEPS.map((label, i) => (
                <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 6, borderRadius: 3, background: i <= activeStep ? '#2DA9E1' : '#3a2f5a', marginBottom: 6 }} />
                  <div style={{ fontSize: 10, color: i <= activeStep ? '#fff' : '#9a8fc0' }}>{label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ fontSize: 13, marginBottom: 12 }}>
            Status: <strong style={{ color: '#2DA9E1' }}>
              {result.printfulStatus ? (PF_LABELS[result.printfulStatus] || result.printfulStatus) : 'Processing'}
            </strong>
          </div>

          {/* Items */}
          {result.items.length > 0 && (
            <div style={{ borderTop: '1px solid #2DA9E1', paddingTop: 8, marginBottom: 8 }}>
              {result.items.map((it, idx) => (
                <div key={idx} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{it.name}</span><span>× {it.quantity}</span>
                </div>
              ))}
              {result.totalCents != null && (
                <div style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', marginTop: 6, fontWeight: 700 }}>
                  <span>Total</span><span>{money(result.totalCents)}</span>
                </div>
              )}
            </div>
          )}

          {/* Tracking */}
          {result.shipments.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ color: '#2DA9E1', fontSize: 13, marginBottom: 6 }}>Tracking</div>
              {result.shipments.map((s, idx) => (
                <div key={idx} style={{ fontSize: 13, marginBottom: 4 }}>
                  {s.carrier ? `${s.carrier}: ` : ''}
                  {s.trackingUrl
                    ? <a href={s.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#CCBBE9' }}>{s.trackingNumber || 'Track package'}</a>
                    : (s.trackingNumber || '—')}
                </div>
              ))}
            </div>
          )}

          <button style={{ ...btnStyle(true), marginTop: 14 }} onClick={onClose}>Done</button>
        </>
      )}

      {error && <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default OrderStatus;
