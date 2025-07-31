import styles from './page.module.css';

export default function TGPage() {
  return (
    <div className={styles.container}>
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