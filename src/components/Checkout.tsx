import React from 'react';
import styles from './Checkout.module.css';

interface CheckoutProps {
  cartItems?: React.ReactNode[];
  onClose?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onClose }) => {
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
          </div>
          <div className={styles.Emailinput}>
            <div className={styles.Email}>Email</div>
          </div>
          <div className={styles.BillingAddress}>Billing Address</div>
          <div className={styles.Addressline1input}></div>
          <div className={styles.Addressline2input}></div>
          <div className={styles.Addressline3input}></div>
          <div className={styles.ShippingAddress}>Shipping Address</div>
          <div className={styles.Addressline1input}></div>
          <div className={styles.Addressline2input}></div>
          <div className={styles.Addressline3input}></div>
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
            <div className={styles.DebitCreditCardOption}>
              <div className={styles.Checkcircleselection}>
                <div className={styles.Frame173}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.1074 2.42309C9.58385 1.85897 8.73539 1.85897 8.21187 2.42309L3.47266 7.51752L2.28813 6.2439C1.76461 5.68324 0.915822 5.68324 0.392636 6.2439C-0.130879 6.80802 -0.130879 7.72169 0.392636 8.28235L2.5251 10.5769C3.04861 11.141 3.89706 11.141 4.42057 10.5769L10.1074 4.46155C10.6309 3.89742 10.6309 2.98375 10.1074 2.42309Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className={styles.DebitCreditCard}>DEBIT/CREDIT CARD</div>
            </div>
            <div className={styles.Nameoncardinput}>
              <div className={styles.NameOnCard}>Name ON CARD</div>
            </div>
            <div className={styles.CardNumber}>CARD NUMBER</div>
            <div className={styles.Cardnumber}>
              <div className={styles.Cardnumber1}><div>0000</div></div>
              <div className={styles.Cardnumber2}><div>0000</div></div>
              <div className={styles.Frame184}><div>0000</div></div>
              <div className={styles.Frame185}><div>0000</div></div>
            </div>
            <div className={styles.Expirationdateinput}>
              <div className={styles.ExpirationDate}>EXPIRATION DATE</div>
            </div>
            <div className={styles.CvvInput}>
              <div className={styles.Cvv}>CVV</div>
            </div>
            <div className={styles.Zipinput}>
              <div className={styles.Zip}>ZIP</div>
            </div>
            <div className={styles.Applepayplaceholder}></div>
            <div className={styles.Googleplaybuttonplaceholder}></div>
            <div className={styles.TermsAgreement}>TERMS AGREEMENT</div>
          </div>
          <div className={styles.Addtocartbutton}>
            <div className={styles.Purchase}>Purchase</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 