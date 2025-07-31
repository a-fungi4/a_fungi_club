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
import MiscDropdown from '@/components/MiscDropdown';
import PrintfullLogoIcon from '@/components/icons/PrintfullLogoIcon';
import AnalyticsIcon from '@/components/icons/AnalyticsIcon';
import EcommercePlatformIcon from '@/components/icons/EcommercePlatformIcon';

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
    console.log('Fetching products from /api/square-products...');
    setLoading(true);
    
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Fetch timeout - forcing loading to false');
      setLoading(false);
    }, 10000);
    
    fetch('/api/square-products')
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        clearTimeout(timeoutId);
        console.log('Received data:', data);
        console.log('Data type:', typeof data);
        console.log('Data keys:', Object.keys(data));
        if (data.products && Array.isArray(data.products)) {
          console.log('Setting products:', data.products.length);
          setProducts(data.products);
        } else {
          console.log('No products found in data');
          console.log('Data.products:', data.products);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      });
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
      {/* HowTo Container */}
      <div className={styles.HowToContainer}>
        <strong>HowTo</strong>
        <div className={styles.HowToDropdownsWrapper}>
          <MiscDropdown
            defaultText="Ecommerce"
            hoverText="Platform"
            content={<div>Choosing the right eCommerce platform is key to building a smooth, scalable online store—especially when working with a dropshipping provider. For this project, I chose Square because it integrates directly with Printful, is free to start, and lets me add products and categories without touching the site’s code. This made it easy to focus on designing a clean, intuitive user interface and optimizing the customer journey without getting bogged down in setup. As both a UI designer and front-end developer, I looked for a platform that supported responsive design, streamlined product management, and built-in SEO tools to help the store rank and perform well. Square gave me the flexibility to quickly prototype, launch, and refine a storefront that was functional, visually consistent, and optimized for both users and search engines.</div>}
            icon={<EcommercePlatformIcon width={48} height={48} />}
            iconTitle="Choosing the right eCommerce platform is key to building a smooth, scalable online store—especially when working with a dropshipping provider. For this project, I chose Square because it integrates directly with Printful, is free to start, and lets me add products and categories without touching the site’s code. This made it easy to focus on designing a clean, intuitive user interface and optimizing the customer journey without getting bogged down in setup. As both a UI designer and front-end developer, I looked for a platform that supported responsive design, streamlined product management, and built-in SEO tools to help the store rank and perform well. Square gave me the flexibility to quickly prototype, launch, and refine a storefront that was functional, visually consistent, and optimized for both users and search engines."
          />
          <MiscDropdown
            defaultText="Dropship"
            hoverText="Printful"
            content={<div>Dropshipping is a widely used eCommerce fulfillment method where the retailer doesn’t store inventory but instead partners with a supplier who ships products directly to customers. This reduces overhead and allows for greater flexibility in product offerings—ideal for small businesses and startups. When selecting a dropshipping partner, product quality, variety, and fulfillment speed are critical. I chose Printful for this project because of their extensive catalog of customizable products, premium materials, and professional-quality printing. Their integration with platforms like Square made it easy to launch an eCommerce website without needing backend development. As a UI designer, front-end developer, and graphic designer, I focused on creating a responsive, visually engaging storefront that followed UX/UI best practices and conversion-driven design principles. The site incorporated optimized product imagery, custom branding, and clean code to support key SEO strategies such as mobile optimization, fast loading speeds, keyword-rich product descriptions, and accessible alt text. This ensured strong visibility on search engines while delivering a seamless, on-brand shopping experience. SEO keywords related to eCommerce development, front-end web design, graphic design, and user interface design were embedded throughout the site to maximize discoverability and engagement.</div>}
            icon={<PrintfullLogoIcon width={48} height={48} />}
            iconTitle="Dropshipping is a widely used eCommerce fulfillment method where the retailer doesn’t store inventory but instead partners with a supplier who ships products directly to customers. This reduces overhead and allows for greater flexibility in product offerings—ideal for small businesses and startups. When selecting a dropshipping partner, product quality, variety, and fulfillment speed are critical. I chose Printful for this project because of their extensive catalog of customizable products, premium materials, and professional-quality printing. Their integration with platforms like Square made it easy to launch an eCommerce website without needing backend development. As a UI designer, front-end developer, and graphic designer, I focused on creating a responsive, visually engaging storefront that followed UX/UI best practices and conversion-driven design principles. The site incorporated optimized product imagery, custom branding, and clean code to support key SEO strategies such as mobile optimization, fast loading speeds, keyword-rich product descriptions, and accessible alt text. This ensured strong visibility on search engines while delivering a seamless, on-brand shopping experience. SEO keywords related to eCommerce development, front-end web design, graphic design, and user interface design were embedded throughout the site to maximize discoverability and engagement."
          />
          <MiscDropdown
            defaultText="Analytics"
            hoverText="Tracking"
            content={<div>Integrating tools like Google Analytics and Meta Pixel is essential for any clothing eCommerce store looking to make data-driven marketing decisions. These platforms use APIs—Application Programming Interfaces—which allow different software systems to communicate and share data in real time. APIs function as bridges between your website and services like Meta or Google, enabling the collection of valuable user behavior metrics such as page views, conversions, bounce rates, and customer demographics. This data allows UI designers, graphic designers, and front-end developers to refine user interfaces, streamline the buyer journey, and design visuals that align with audience behavior. For marketing professionals, these insights reduce advertising costs by improving campaign targeting, optimizing ad spend, and increasing return on investment (ROI). By analyzing which designs, content, and product categories perform best, teams can fine-tune everything from product placement to website layout—boosting engagement, conversion rates, and search visibility. Leveraging analytics tools is crucial for modern digital marketing, eCommerce SEO, brand design, and developing high-performing fashion retail websites that meet user expectations and drive sales efficiently.</div>}
            icon={<AnalyticsIcon width={48} height={48} />}
            iconTitle="Integrating tools like Google Analytics and Meta Pixel is essential for any clothing eCommerce store looking to make data-driven marketing decisions. These platforms use APIs—Application Programming Interfaces—which allow different software systems to communicate and share data in real time. APIs function as bridges between your website and services like Meta or Google, enabling the collection of valuable user behavior metrics such as page views, conversions, bounce rates, and customer demographics. This data allows UI designers, graphic designers, and front-end developers to refine user interfaces, streamline the buyer journey, and design visuals that align with audience behavior. For marketing professionals, these insights reduce advertising costs by improving campaign targeting, optimizing ad spend, and increasing return on investment (ROI). By analyzing which designs, content, and product categories perform best, teams can fine-tune everything from product placement to website layout—boosting engagement, conversion rates, and search visibility. Leveraging analytics tools is crucial for modern digital marketing, eCommerce SEO, brand design, and developing high-performing fashion retail websites that meet user expectations and drive sales efficiently."
          />
        </div>
      </div>
      <div className={styles.tgPageContentWrapper}>
        <div style={{ color: 'white', padding: '20px', background: '#333', margin: '20px', borderRadius: '8px' }}>
          <h3>Debug Information:</h3>
          <div>Loading state: {loading ? 'true' : 'false'}</div>
          <div>Products loaded: {products.length}</div>
          <div>Categories: {categories.join(', ')}</div>
          <div>First product: {products[0]?.name || 'None'}</div>
          <div>First product variations: {products[0]?.variations?.length || 0}</div>
          <button 
            onClick={() => {
              console.log('Manual fetch test');
              fetch('/api/square-products')
                .then(res => res.json())
                .then(data => {
                  console.log('Manual fetch result:', data);
                  alert('Check console for manual fetch result');
                })
                .catch(err => {
                  console.error('Manual fetch error:', err);
                  alert('Manual fetch error: ' + err.message);
                });
            }}
            style={{ background: '#2DA9E1', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Test API Manually
          </button>
        </div>
        {loading ? (
          <div>Loading products... (Products: {products.length})</div>
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {/* All Products Carousel */}
                <ProductCarousel products={products} />
                {/* Category Carousels */}
                {categories.map(cat => (
                  <div key={cat} style={{ marginTop: '2rem' }}>
                    <ProductCarousel products={categoryMap[cat]} />
                  </div>
                ))}
              </>
            ) : (
              <div>No products found</div>
            )}
          </>
        )}
      </div>
    </CartProvider>
  );
} 