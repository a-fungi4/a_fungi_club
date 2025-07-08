'use client';
import React, { useState } from "react";
import Banner from "@/components/Banner";
import ProductCarousel from "@/components/ProductCarousel";
import styles from './page.module.css';
import CartAndStatus from '@/components/CartAndStatus';
import TGLogoCircle from '@/components/icons/TGLogoCircle';
import OrderSuccessful from '../../components/OrderSuccessful';
import orderStyles from '../../components/OrderSuccessful.module.css';

export default function TGPage() {
  const [showOrderSuccess, setShowOrderSuccess] = useState(true);

  return (
    <>
      {showOrderSuccess && (
        <div className={orderStyles.OrderSuccessfulOverlay}>
          <OrderSuccessful onClose={() => setShowOrderSuccess(false)} />
        </div>
      )}
      <Banner title="Tacky Garbage Collection" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox">
            <p>This is the TG page content. Add your information here.</p>
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
        <ProductCarousel />
      </div>
    </>
  );
} 