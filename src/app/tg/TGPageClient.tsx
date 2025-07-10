'use client';
import React, { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import ProductCarousel from "@/components/ProductCarousel";
import styles from './page.module.css';
import CartAndStatus from '@/components/CartAndStatus';
import TGLogoCircle from '@/components/icons/TGLogoCircle';
import OrderSuccessful from '../../components/OrderSuccessful';
import orderStyles from '../../components/OrderSuccessful.module.css';
import { CartProvider, CartItem } from '../../components/CartContext';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/Product';

interface ShippingInfo {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country?: string;
  zip: string;
  phone?: string;
  email?: string;
}

export default function TGPageClient() {
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [showOrderError, setShowOrderError] = useState(false);
  const [showPrintfulConfirm, setShowPrintfulConfirm] = useState(false);
  const [printfulCart, setPrintfulCart] = useState<CartItem[] | null>(null);
  const [shipping, setShipping] = useState<ShippingInfo | null>(null);
  const [printfulLoading, setPrintfulLoading] = useState(false);
  const [printfulError, setPrintfulError] = useState<string | null>(null);
  const [printfulSuccess, setPrintfulSuccess] = useState(false);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show overlay if redirected from Square with ?order=success&orderNumber=xxxx
    if (searchParams.get('order') === 'success') {
      setShowOrderSuccess(true);
      setOrderNumber(searchParams.get('orderNumber'));
      // Retrieve cart from localStorage
      const cartStr = localStorage.getItem('afungi_cart_checkout');
      if (cartStr) {
        try {
          const parsedCart: CartItem[] = JSON.parse(cartStr);
          setPrintfulCart(parsedCart);
        } catch {
          setPrintfulCart(null);
        }
      }
    } else if (searchParams.get('order') === 'error') {
      setShowOrderError(true);
    }
  }, [searchParams]);

  // Fetch shipping info from Square when orderNumber and cart are available
  useEffect(() => {
    if (showOrderSuccess && orderNumber && printfulCart) {
      setPrintfulLoading(true);
      setPrintfulError(null);
      fetch('/api/square-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) setPrintfulError(data.error);
          else {
            setShipping(data.shipping);
            setShowPrintfulConfirm(true);
          }
        })
        .catch(e => setPrintfulError(e.message || 'Failed to fetch shipping info'))
        .finally(() => setPrintfulLoading(false));
    }
  }, [showOrderSuccess, orderNumber, printfulCart]);

  // Handler for confirming shipping and sending to Printful
  const handlePrintfulConfirm = async () => {
    setPrintfulLoading(true);
    setPrintfulError(null);
    try {
      const res = await fetch('/api/printful-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, cart: printfulCart, shipping }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Printful order failed');
      setPrintfulSuccess(true);
      setShowPrintfulConfirm(false);
      // Optionally clear cart from localStorage
      localStorage.removeItem('afungi_cart_checkout');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setPrintfulError(e.message || 'Printful order error');
      } else {
        setPrintfulError('Printful order error');
      }
    } finally {
      setPrintfulLoading(false);
    }
  };

  // Handler for editing shipping info
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping!, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch('/api/square-products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group products by category
  const categoryMap: Record<string, Product[]> = {};
  products.forEach(product => {
    const cat = product.category || 'Uncategorized';
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(product);
  });
  const categories = Object.keys(categoryMap).sort();

  return (
    <CartProvider>
      {showOrderSuccess && (
        <div className={orderStyles.OrderSuccessfulOverlay}>
          <OrderSuccessful orderNumber={orderNumber || undefined} onClose={() => setShowOrderSuccess(false)} />
        </div>
      )}
      {showOrderError && (
        <div className={orderStyles.OrderSuccessfulOverlay}>
          <div style={{ background: '#151029', color: '#fff', borderRadius: 16, padding: 32, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ fontSize: 22, color: '#C0282D', marginBottom: 16 }}>oops something went wrong. Try again.</div>
            <button style={{ background: '#2DA9E1', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontSize: 18, cursor: 'pointer' }} onClick={() => setShowOrderError(false)}>close</button>
          </div>
        </div>
      )}
      {/* Printful shipping confirmation overlay */}
      {showPrintfulConfirm && shipping && (
        <div className={orderStyles.OrderSuccessfulOverlay}>
          <div style={{ background: '#151029', color: '#fff', borderRadius: 16, padding: 32, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ fontSize: 20, marginBottom: 12 }}>Confirm your shipping info for fulfillment:</div>
            <form onSubmit={e => { e.preventDefault(); handlePrintfulConfirm(); }}>
              <input name="name" value={shipping.name || ''} onChange={handleShippingChange} placeholder="Name" style={{ margin: 4, padding: 6, width: '90%' }} required />
              <input name="address1" value={shipping.address1 || ''} onChange={handleShippingChange} placeholder="Address 1" style={{ margin: 4, padding: 6, width: '90%' }} required />
              <input name="address2" value={shipping.address2 || ''} onChange={handleShippingChange} placeholder="Address 2" style={{ margin: 4, padding: 6, width: '90%' }} />
              <input name="city" value={shipping.city || ''} onChange={handleShippingChange} placeholder="City" style={{ margin: 4, padding: 6, width: '90%' }} required />
              <input name="state" value={shipping.state || ''} onChange={handleShippingChange} placeholder="State" style={{ margin: 4, padding: 6, width: '90%' }} required />
              <input name="zip" value={shipping.zip || ''} onChange={handleShippingChange} placeholder="ZIP" style={{ margin: 4, padding: 6, width: '90%' }} required />
              <input name="country" value={shipping.country || 'US'} onChange={handleShippingChange} placeholder="Country" style={{ margin: 4, padding: 6, width: '90%' }} />
              <input name="email" value={shipping.email || ''} onChange={handleShippingChange} placeholder="Email" style={{ margin: 4, padding: 6, width: '90%' }} />
              <input name="phone" value={shipping.phone || ''} onChange={handleShippingChange} placeholder="Phone" style={{ margin: 4, padding: 6, width: '90%' }} />
              <button type="submit" style={{ background: '#2DA9E1', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontSize: 18, cursor: 'pointer', marginTop: 12 }} disabled={printfulLoading}>
                {printfulLoading ? 'Submitting...' : 'Confirm & Fulfill'}
              </button>
              {printfulError && <div style={{ color: '#C0282D', marginTop: 8 }}>{printfulError}</div>}
              {printfulSuccess && <div style={{ color: '#2DA9E1', marginTop: 8 }}>Order sent to Printful!</div>}
            </form>
          </div>
        </div>
      )}
      <Banner title="Tacky Garbage Collection" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox">
          </div>
        </div>
      </Banner>
      <div className={styles.Cartstatuscontainer}>
        <TGLogoCircle className={styles.TGLogoCircle} />
        <div className={styles.CartAndStatusWrapper}>
          <CartAndStatus />
        </div>
        <div className={styles.ItSGoodTackyGarbage} style={{ marginTop: 4 }}>
          It&apos;s good tacky garbage
        </div>
      </div>
      <div className={styles.tgPageContentWrapper}>
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <>
            {/* All Products Carousel */}
            <ProductCarousel products={products} categoryName="All Products" />
            {/* Category Carousels */}
            {categories.map(cat => (
              <div key={cat} style={{ marginTop: '2rem' }}>
                <ProductCarousel products={categoryMap[cat]} categoryName={cat} />
              </div>
            ))}
          </>
        )}
      </div>
    </CartProvider>
  );
} 