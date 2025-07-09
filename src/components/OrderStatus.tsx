import React, { useState } from 'react';
import styles from './OrderStatus.module.css';

interface OrderStatusProps {
  status?: string;
  email?: string;
  onClose?: () => void;
  onSendOtp?: () => void;
}

const statusList = [
  'FULFILLED',
  'PARTIAL',
  'ONHOLD',
  'IN PROCESS',
  'CANCEL',
  'FAILED',
  'PENDING',
  'DRAFT',
];

const OrderStatus: React.FC<OrderStatusProps> = ({ status = 'order status', email = 'Email', onClose, onSendOtp }) => {
  const [otpState, setOtpState] = useState(false);
  const [resultState, setResultState] = useState(false);

  return (
    <div className={styles.OrderstatusResultWrapper}>
      {resultState ? (
        <div className={styles.OrderstatusResult} data-layer="OrderStatus">
          <div className={styles.Frame166Result} data-layer="Frame 166">
            <div className={styles.ExitButton} data-svg-wrapper data-layer="Exit Button" onClick={onClose}>
              <svg width="100%" height="100%" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.964844" width="8.03535" height="7.97267" rx="3.98633" fill="#C0282D"/>
                <path d="M6.10324 2.14314C6.29412 1.9523 6.60352 1.95228 6.79438 2.14314C6.98522 2.33401 6.98522 2.64341 6.79438 2.83428L5.67367 3.95499L6.85707 5.13839C7.0479 5.32925 7.0479 5.63866 6.85707 5.82952C6.6662 6.02039 6.3568 6.02037 6.16593 5.82952L4.98253 4.64613L3.79914 5.82952C3.60827 6.02039 3.29887 6.02037 3.108 5.82952C2.91713 5.63865 2.91713 5.32926 3.108 5.13839L4.2914 3.95499L3.17068 2.83428C2.97981 2.64341 2.97981 2.33401 3.17068 2.14314C3.36156 1.9523 3.67096 1.95228 3.86182 2.14314L4.98253 3.26385L6.10324 2.14314Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className={styles.Frame180Result} data-layer="Frame 180">
            <div className={styles.OrderStatusTextResult} data-layer="ORDER STATUS">ORDER STATUS</div>
            <div className={styles.Timeline}>
              {statusList.map((status, i) => (
                <div className={styles.TimelineRow} key={status}>
                  <div className={styles.TimelineDotWrapper}>
                    <div className={styles.TimelineDot} />
                    {i < statusList.length - 1 && <div className={styles.TimelineLine} />}
                  </div>
                  <div className={styles.StatusLabel}>{status}</div>
                </div>
              ))}
            </div>
            <div className={styles.AddtocartbuttonResult} data-layer="AddToCartButton" onClick={onClose}>
              <div className={styles.CoolResult} data-layer="COOL">COOL</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.Orderstatus} data-layer="OrderStatus">
          <div className={styles.Frame166} data-layer="Frame 166">
            <div className={styles.ExitButton} data-svg-wrapper data-layer="Exit Button" onClick={onClose}>
              <svg width="100%" height="100%" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.964844" width="8.03535" height="7.97267" rx="3.98633" fill="#C0282D"/>
                <path d="M6.10324 2.14314C6.29412 1.9523 6.60352 1.95228 6.79438 2.14314C6.98522 2.33401 6.98522 2.64341 6.79438 2.83428L5.67367 3.95499L6.85707 5.13839C7.0479 5.32925 7.0479 5.63866 6.85707 5.82952C6.6662 6.02039 6.3568 6.02037 6.16593 5.82952L4.98253 4.64613L3.79914 5.82952C3.60827 6.02039 3.29887 6.02037 3.108 5.82952C2.91713 5.63865 2.91713 5.32926 3.108 5.13839L4.2914 3.95499L3.17068 2.83428C2.97981 2.64341 2.97981 2.33401 3.17068 2.14314C3.36156 1.9523 3.67096 1.95228 3.86182 2.14314L4.98253 3.26385L6.10324 2.14314Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className={styles.Frame180Outer} data-layer="Frame 180">
            <div className={styles.Frame180} data-layer="Frame 180">
              {otpState ? (
                <>
                  <div className={styles.OrderStatusText} data-layer="OTP">OTP</div>
                  <div className={styles.Frame169} data-layer="Frame 169">OTP</div>
                  <div className={styles.Addtocartbutton} data-layer="AddToCartButton" onClick={() => setResultState(true)}>
                    <div className={styles.SendOtp} data-layer="VIEW MY ORDER">VIEW MY ORDER</div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.OrderStatusText} data-layer="order status">{status}</div>
                  <div className={styles.Frame169} data-layer="Frame 169">
                    <div className={styles.Email} data-layer="Email">{email}</div>
                  </div>
                  <div className={styles.Addtocartbutton} data-layer="AddToCartButton" onClick={() => { setOtpState(true); if (onSendOtp) onSendOtp(); }}>
                    <div className={styles.SendOtp} data-layer="SEND OTP">SEND OTP</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus; 