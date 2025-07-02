'use client';
import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Contactform}>
      <form className={styles.ContactformForm} onSubmit={handleSubmit}>
        <div className={styles.NameSection}>
          <span className={styles.Nameinputicon}>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7803 5.38234C11.7803 6.91401 10.5483 8.15568 9.02866 8.15568C7.509 8.15568 6.27707 6.91401 6.27707 5.38234C6.27707 3.85067 7.509 2.60901 9.02866 2.60901C10.5483 2.60901 11.7803 3.85067 11.7803 5.38234Z" fill="var(--Color---Light-Purple, #CCBBE9)"/>
              <path d="M4.5 13.269C4.5 10.7641 6.51472 8.73345 9 8.73345C11.4853 8.73345 13.5 10.7641 13.5 13.269V14.1646C13.5 14.9623 12.8584 15.609 12.0669 15.609H5.93312C5.14163 15.609 4.5 14.9623 4.5 14.1646V13.269Z" fill="var(--Color---Light-Purple, #CCBBE9)"/>
            </svg>
          </span>
          <div className={styles.Nameinput}>
            <input
              className={styles.NameinputField}
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>
        <div className={styles.Useremail}>
          <span className={styles.Mailiconcontainer}>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7354 4.73499C14.7863 4.73499 15.6387 5.60568 15.6387 6.67932V6.77893L15.6826 6.85999L15.6387 6.88928V11.5387C15.6387 12.6123 14.7863 13.483 13.7354 13.483H4.2207C3.16972 13.483 2.31738 12.6123 2.31738 11.5387V6.67932C2.31738 5.60568 3.16972 4.73499 4.2207 4.73499H13.7354ZM3.74512 11.5387C3.74512 11.8071 3.95796 12.025 4.2207 12.025H13.7354C13.9981 12.025 14.2109 11.8071 14.2109 11.5387V7.85999L10.8496 10.1471C9.78789 10.8691 8.45533 10.8689 7.39355 10.1471L3.74512 7.66565V11.5387ZM4.1543 6.19885L8.08398 8.8717C8.72108 9.30493 9.52111 9.30493 10.1582 8.8717L13.9873 6.26721C13.9142 6.22048 13.8279 6.19299 13.7354 6.19299H4.2207C4.19813 6.19299 4.17603 6.19575 4.1543 6.19885Z" fill="var(--Color---Light-Purple, #CCBBE9)"/>
            </svg>
          </span>
          <input
            className={styles.Emailinput}
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.Emailsubject}>
          <span className={styles.Subjecticoncontainer}>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.88442 10.3412C7.88442 9.94319 7.9598 9.57074 8.11055 9.2238C8.19598 9.04013 8.30653 8.85646 8.44221 8.67278C8.58291 8.48911 8.76131 8.28758 8.97739 8.06819L9.65578 7.38707C9.80151 7.23911 9.92965 7.0988 10.0402 6.96615C10.1558 6.8284 10.2412 6.70595 10.2965 6.5988C10.4171 6.37942 10.4774 6.13962 10.4774 5.87942C10.4774 5.63962 10.4322 5.43044 10.3417 5.25187C10.2513 5.06819 10.1332 4.91258 9.98744 4.78503C9.82161 4.64217 9.62814 4.53758 9.40704 4.47125C9.19095 4.39983 8.94975 4.36411 8.68342 4.36411C8.27136 4.36411 7.84673 4.45085 7.40955 4.62431C7.18342 4.71105 6.95226 4.82074 6.71608 4.9534C6.48492 5.08605 6.24623 5.23911 6 5.41258V3.9738C6.24121 3.82585 6.48241 3.69829 6.72362 3.59115C6.96985 3.47891 7.20603 3.38962 7.43216 3.32329C7.66332 3.25187 7.8995 3.19829 8.1407 3.16258C8.38693 3.12687 8.6407 3.10901 8.90201 3.10901C9.40452 3.10901 9.84422 3.17534 10.2211 3.30799C10.603 3.43554 10.9221 3.61411 11.1784 3.8437C11.4497 4.0886 11.6533 4.37942 11.7889 4.71615C11.9296 5.04778 12 5.40493 12 5.78758C12 6.19574 11.9146 6.56564 11.7437 6.89727C11.5628 7.23911 11.2437 7.63962 10.7864 8.0988L10.1231 8.75697C9.77136 9.10391 9.55025 9.37942 9.4598 9.5835C9.36432 9.78758 9.31658 9.99931 9.31658 10.2187V11.1906H7.88442V10.3412ZM8.63065 15.109C8.3191 15.109 8.05779 15.0019 7.84673 14.7876C7.73618 14.6753 7.65327 14.5478 7.59799 14.4049C7.54774 14.257 7.52261 14.1014 7.52261 13.9381C7.52261 13.7748 7.54774 13.6218 7.59799 13.4789C7.65327 13.336 7.73367 13.211 7.8392 13.1039C7.92462 13.0172 8.03266 12.9432 8.16332 12.882C8.29899 12.8156 8.45226 12.7825 8.62312 12.7825C8.78392 12.7825 8.92965 12.8105 9.0603 12.8667C9.19095 12.9228 9.30653 13.0019 9.40704 13.1039C9.61809 13.3182 9.72362 13.5963 9.72362 13.9381C9.72362 14.285 9.61809 14.5656 9.40704 14.7799C9.19095 14.9993 8.93216 15.109 8.63065 15.109Z" fill="white"/>
            </svg>
          </span>
          <input
            className={styles.Subjectinput}
            type="text"
            placeholder="Subject"
            required
            value={subject}
            onChange={e => setSubject(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.Emailbody} style={{ flex: 1, minHeight: 0, width: '100%' }}>
          <textarea
            className={styles.Emailbodyinput}
            placeholder="Talk to me"
            required
            rows={6}
            style={{ flex: 1, minHeight: 0, width: '100%' }}
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`${styles.SubmitButton} ${styles.Sendbutton}`}
          disabled={loading}
        >
          <div className={styles.Send}>
            {loading ? 'Sending...' : 'Send'}
          </div>
        </button>
        {success && <div className={styles.SuccessMessage}>{success}</div>}
        {error && <div className={styles.ErrorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default ContactForm; 