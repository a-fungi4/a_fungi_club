import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TGPage() {
  return (
    <div className={styles.container}>
      <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h1>Under Construction</h1>
        <p>We&apos;re working hard to bring you something amazing! Check back soon for updates.</p>
      </div>
      <div className={styles.constructionContent}>
        <div className={styles.constructionIcon}>🚧</div>
        <h1 className={styles.constructionTitle}>Under Construction</h1>
        <p className={styles.constructionMessage}>
          We&apos;re working hard to bring you something amazing!
        </p>
        <p className={styles.constructionSubtext}>
          Check back soon for updates.
        </p>
      </div>
    </div>
  );
} 