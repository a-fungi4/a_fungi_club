import React, { useState } from 'react';
import styles from './CartAndStatus.module.css';
import MiniCart from './MiniCart';
import CartItem from './CartItem';
import Checkout from './Checkout';
import OrderStatus from './OrderStatus';
import { useCart } from './CartContext';

export default function CartAndStatus() {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleClose = () => {
    setShowMiniCart(false);
    setShowCheckout(false);
    setShowOrderStatus(false);
  };

  // Render CartItem for each cart item
  const cartItemNodes = cart.map(item => (
    <CartItem
      key={item.id + (item.variation || '')}
      id={item.id}
      name={item.name}
      image={item.image}
      price={item.price}
      quantity={item.quantity}
      variation={item.variation}
      onRemove={() => removeFromCart(item.id, item.variation)}
      onQuantityChange={qty => updateQuantity(item.id, qty, item.variation)}
    />
  ));

  return (
    <div className={styles.CartandstatusWrapper} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div data-layer="CartAndStatus" className={styles.Cartandstatus}>
        <button
          type="button"
          aria-label="Open cart"
          className={styles.ShoppingCartSvgrepoCom}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          onClick={() => { setShowMiniCart((v) => !v); setShowCheckout(false); }}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11 21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078 15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884 6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18 13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906 10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489 17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938 20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938 8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617 20Z" fill="#C0282D"/>
          </svg>
        </button>
        <div data-svg-wrapper data-layer="Layer_1" className={styles.Layer1} onClick={() => { setShowOrderStatus(true); setShowMiniCart(false); setShowCheckout(false); }} style={{ cursor: 'pointer' }}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_976_3186)">
              <path d="M13.2173 1.14548C13.2639 0.954068 13.3476 0.773698 13.4639 0.614667C13.5801 0.455635 13.7265 0.321057 13.8948 0.218614C14.063 0.116172 14.2498 0.0478733 14.4445 0.0176168C14.6391 -0.0126396 14.8378 -0.00426091 15.0292 0.0422746C17.1918 0.571193 19.1678 1.68332 20.7421 3.25756C22.3164 4.8318 23.4286 6.80779 23.9575 8.97037C24.0515 9.35694 23.988 9.76501 23.7811 10.1048C23.5742 10.4446 23.2408 10.6883 22.8542 10.7823C22.4677 10.8762 22.0596 10.8128 21.7198 10.6059C21.38 10.399 21.1363 10.0656 21.0424 9.67898C20.2437 6.39435 17.6053 3.75599 14.3205 2.95767C14.1291 2.91113 13.9487 2.82735 13.7896 2.71109C13.6306 2.59483 13.496 2.44837 13.3935 2.28009C13.2911 2.11181 13.2228 1.92499 13.1926 1.73031C13.1623 1.53563 13.1708 1.33691 13.2173 1.14548Z" fill="#2DA9E1"/>
              <path d="M22.8543 12.9158C22.4677 12.8218 22.0597 12.8853 21.7199 13.0922C21.3801 13.2991 21.1364 13.6325 21.0424 14.019C20.5609 16.0127 19.4215 17.786 17.8082 19.0526C16.195 20.3192 14.202 21.0052 12.1509 20.9998C7.10509 20.9998 3.00001 16.8948 3.00001 11.8489C2.99472 9.79793 3.68074 7.80497 4.94733 6.19175C6.21392 4.57854 7.98718 3.4392 9.98087 2.95765C10.1723 2.91112 10.3527 2.82735 10.5117 2.71111C10.6708 2.59487 10.8054 2.44844 10.9079 2.28018C11.0103 2.11192 11.0786 1.92513 11.1089 1.73047C11.1392 1.53581 11.1308 1.33709 11.0843 1.14567C11.0378 0.954239 10.954 0.77385 10.8377 0.614799C10.7215 0.455747 10.5751 0.321148 10.4068 0.218686C10.2386 0.116225 10.0518 0.0479075 9.85711 0.0176348C9.66245 -0.0126379 9.46374 -0.004273 9.27231 0.0422519C6.62666 0.685399 4.27402 2.19923 2.59237 4.34053C0.910719 6.48182 -0.0023003 9.12625 4.35239e-06 11.8489C-0.00175898 14.1356 0.641974 16.3763 1.85716 18.3133C3.07234 20.2503 4.80962 21.8049 6.86916 22.7984C8.92869 23.7919 11.2268 24.1838 13.4992 23.9291C15.7716 23.6745 17.926 22.7835 19.7145 21.3588C21.8223 19.6774 23.3143 17.3458 23.9578 14.7275C24.0044 14.5361 24.0127 14.3374 23.9824 14.1427C23.9522 13.9481 23.8838 13.7613 23.7814 13.593C23.6789 13.4248 23.5443 13.2784 23.3852 13.1622C23.2261 13.0459 23.0457 12.9623 22.8543 12.9158Z" fill="#C0282D"/>
              <path d="M13.2178 13.4788C13.2178 13.7528 13.0373 13.972 12.8118 13.972H11.6238C11.3982 13.972 11.2178 13.7528 11.2178 13.4788V6.46514C11.2178 6.19116 11.3982 5.97198 11.6238 5.97198H12.8118C13.0373 5.97198 13.2178 6.19116 13.2178 6.46514V13.4788Z" fill="#C0282D"/>
              <path d="M14.2178 17.5182C14.2178 17.7703 13.9813 17.972 13.6858 17.972H10.7498C10.4542 17.972 10.2178 17.7703 10.2178 17.5182V16.409C10.2178 16.1737 10.4542 15.972 10.7498 15.972H13.6858C13.9813 15.972 14.2178 16.1737 14.2178 16.409V17.5182Z" fill="#2DA9E1"/>
            </g>
            <defs>
              <clipPath id="clip0_976_3186">
                <rect width="100%" height="100%" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      {showMiniCart && !showCheckout && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(60px + 2vw)',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}>
          <MiniCart onClose={handleClose} cartItems={cartItemNodes} onCheckout={handleCheckout} />
        </div>
      )}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(60px + 2vw)',
          transform: 'translateX(-50%)',
          zIndex: 2000,
        }}>
          <Checkout cartItems={cartItemNodes} onClose={handleClose} onOrder={() => { clearCart(); setShowCheckout(false); setShowOrderStatus(true); }} />
        </div>
      )}
      {showOrderStatus && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(60px + 2vw)',
          transform: 'translateX(-50%)',
          zIndex: 2000,
        }}>
          <OrderStatus onClose={handleClose} />
        </div>
      )}
    </div>
  );
} 