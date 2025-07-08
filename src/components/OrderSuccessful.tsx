import React from 'react';
import styles from './OrderSuccessful.module.css';

interface OrderSuccessfulProps {
  onClose?: () => void;
}

const OrderSuccessful: React.FC<OrderSuccessfulProps> = ({ onClose }) => {
  return (
    <div data-layer="OrderSuccessfulOuter" className={styles.Ordersuccessfulouter}>
      <div data-layer="Frame166" className={styles.Frame166}>
        <div data-svg-wrapper data-layer="Exit Button" className={styles.ExitButton}>
          <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.964844" width="8.03535" height="7.97267" rx="3.98633" fill="#C0282D"/>
            <path d="M6.10324 2.14314C6.29412 1.9523 6.60352 1.95228 6.79438 2.14314C6.98522 2.33401 6.98522 2.64341 6.79438 2.83428L5.67367 3.95499L6.85707 5.13839C7.0479 5.32925 7.0479 5.63866 6.85707 5.82952C6.6662 6.02039 6.3568 6.02037 6.16593 5.82952L4.98253 4.64613L3.79914 5.82952C3.60827 6.02039 3.29887 6.02037 3.108 5.82952C2.91713 5.63865 2.91713 5.32926 3.108 5.13839L4.2914 3.95499L3.17068 2.83428C2.97981 2.64341 2.97981 2.33401 3.17068 2.14314C3.36156 1.9523 3.67096 1.95228 3.86182 2.14314L4.98253 3.26385L6.10324 2.14314Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div data-layer="OrderSuccessfulContent" className={styles.Ordersuccessfulcontent}>
        <div data-layer="OrderDetails" className={styles.Orderdetails}>
          <div data-layer="order number: ########" className={styles.OrderNumber}>order number: ########</div>
          <div data-layer="order successful!" className={styles.OrderSuccessful}>order successful!</div>
          <div data-layer="thank you!" className={styles.ThankYou}>thank you!</div>
        </div>
        <button
          data-layer="CoolButton"
          className={styles.Coolbutton}
          onClick={onClose}
          type="button"
        >
          <div data-layer="cool" className={styles.Cool}>cool</div>
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessful; 