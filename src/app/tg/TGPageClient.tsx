'use client';
import React, { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import ProductCarousel from "@/components/ProductCarousel";
import styles from './page.module.css';
import CartAndStatus from '@/components/CartAndStatus';
import TGLogoCircle from '@/components/icons/TGLogoCircle';
import { CartProvider } from '../../components/CartContext';
import { Product } from '@/types/Product';
import MiscDropdown from '@/components/MiscDropdown';
import PrintfullLogoIcon from '@/components/icons/PrintfullLogoIcon';
import AnalyticsIcon from '@/components/icons/AnalyticsIcon';
import EcommercePlatformIcon from '@/components/icons/EcommercePlatformIcon';

export default function TGPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => setLoading(false), 10000);

    fetch('/api/square-products')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        clearTimeout(timeoutId);
        setProducts(data.products && Array.isArray(data.products) ? data.products : []);
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
        <p style={{ fontSize: 11, color: '#888', marginTop: 8, maxWidth: 320, textAlign: 'center', lineHeight: 1.4 }}>
          By placing an order you agree to our{' '}
          <a href="/terms" style={{ textDecoration: 'underline', color: '#CCBBE9' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" style={{ textDecoration: 'underline', color: '#CCBBE9' }}>Privacy Policy</a>.
          Orders are fulfilled by Printful and payments processed by Square.
          All sales are final; see our <a href="/terms" style={{ textDecoration: 'underline', color: '#CCBBE9' }}>Refund Policy</a>.
        </p>
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
        {loading ? (
          <div style={{ color: '#fff', textAlign: 'center', padding: 40 }}>Loading products…</div>
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