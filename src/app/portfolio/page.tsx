import React from "react";
import Banner from "@/components/Banner";
import HighlightedProject from "@/components/HighlightedProject";
import HPButton from "@/components/HPButton";
import styles from "./page.module.css";

export default function PortfolioPage() {
  return (
    <>
      <Banner
        title="Portfolio"
        variant="general"
        className="fullBleed"
      >
        <div className={styles.bannerProjectEmbed}>
          <div className={styles.bannerTextBox}>
            <p>This is the portfolio page content. Add your information here.</p>
          </div>
        </div>
      </Banner>
      <div className={styles.highlightedProjectWrapper}>
        <HighlightedProject variant="project1" button={<HPButton label="Go To Project" />} />
      </div>
      <div className={styles.highlightedProjectWrapper}>
        <HighlightedProject variant="project2" button={<HPButton label="Go To Project" />} />
      </div>

      {/* UI Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>UI</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/219795113?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="UI Project 1"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/220356837?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="UI Project 2"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/222677953?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="UI Project 3"
                className={styles.iframe}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Branding</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/220936077?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Branding Project 1"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/220075681?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Branding Project 2"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/219877053?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Branding Project 3"
                className={styles.iframe}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Marketing</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/204709819?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Marketing Project 1"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/199249521?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Marketing Project 2"
                className={styles.iframe}
              />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <iframe
                src="https://www.behance.net/embed/project/199256085?ilo0=1"
                height="316"
                width="404"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Marketing Project 3"
                className={styles.iframe}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 