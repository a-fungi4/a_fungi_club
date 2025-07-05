import React from "react";
import Banner from "@/components/Banner";
import HighlightedProject from "@/components/HighlightedProject";
import HPButton from "@/components/HPButton";
import Link from "next/link";
import styles from "./page.module.css";
import Image from 'next/image';
import Head from 'next/head';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio | Khaled Momani</title>
        <meta name="description" content="Explore the portfolio of Khaled Momani, featuring UI/UX design, branding, marketing, and development projects." />
        <meta property="og:title" content="Portfolio | Khaled Momani" />
        <meta property="og:description" content="Explore the portfolio of Khaled Momani, featuring UI/UX design, branding, marketing, and development projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afungiclub.com/portfolio" />
        <meta property="og:image" content="/headshot-bw.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Khaled Momani" />
        <meta name="twitter:description" content="Explore the portfolio of Khaled Momani, featuring UI/UX design, branding, marketing, and development projects." />
        <meta name="twitter:image" content="/headshot-bw.webp" />
      </Head>
      <Banner
        title="Portfolio"
        variant="general"
        className="fullBleed"
      >
        <div className={styles.bannerProjectEmbed}>
          <div className={styles.bannerTextBox}>
            <p>The tools I know how to use don&apos;t matter! What matters is that I listen to the clients&apos; needs. I empathize with their frustrations. And I find the right solution. The skills will come. Needless to say, I can do a lot of stuff.</p>
          </div>
        </div>
      </Banner>
      <div className={styles.highlightedProjectWrapper}>
        <HighlightedProject 
          variant="project1" 
          button={
            <Link href="/heirloom">
              <HPButton label="Go To Project" />
            </Link>
          }
          text={`Heirloom is a web app created by the developers at PRJCT Lazrus. We are a team of dedicated developers, specializing in work management software. This project was the vision of Marcus Workman and Zachary Hendon.

I met Marcus at an art show in Austin. I had just finished designing my first CRM. I was just about to start learning development and he was about to graduate college. This project was his Capstone project. An app that worked hand in tandem with the users therapist to document mood fluctuation and provide resources for mental health. This project integrated several AI tools and showed a lot of potential for future improvements.

I met with Marcus a few times and showed him my work. As a designer with a passion for building work management finding a team of developers that build CRMs and mental health related software felt almost cosmic.

The backend for the app was incredible. It featured various AI integrations, and an incredible amount of potential to be the future of psychiatric diagnostics.

I was tasked with creating the visual identity of the app. The initial design I was given was a series of basic buttons and logic to display various backend calculations. It was up to me to bring it to life and make it intuitive to the user&apos;s needs.`}
        />
      </div>
      <div className={styles.highlightedProjectWrapper}>
        <HighlightedProject 
          variant="project2" 
          button={
            <Link href="/designtocode">
              <HPButton label="Go To Project" />
            </Link>
          }
          text={`After learning about vibe coding and testing the limits of Cursor AI, I was able to explore implementing my projects. As a designer I wanted my portfolio to be a demonstration of my skills. Prior to this website I was using Adobe Portfolio. It was fast and already included in my creative cloud package. Instead, I wanted to bring one of my Figma creations to life.`}
        />
      </div>

      {/* UI Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>UI</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/219795113/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/1-UIUserResearch.webp" alt="UI Design Project 1 - User Research by Khaled Momani, Designer, UI Designer, Software Developer, Marketing" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/220356837/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/2-UIWireFramingCram.webp" alt="UI Design Project 2 - Wireframing CRM by Khaled Momani, Designer, UI Designer, Software Developer, Marketing" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/222677953/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/3-UIPrototypingAndAnimation.webp" alt="UI Design Project 3 - Prototyping and Animation by Khaled Momani, Designer, UI Designer, Software Developer, Marketing" className={styles.projectImage} width={400} height={316} />
              </a>
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
              <a href="https://www.behance.net/gallery/220936077/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/1-BrandingArea59.webp" alt="Branding Project 1 - Area 59 by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/220075681/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/2-BrandingDevelopingGripNDrip.webp" alt="Branding Project 2 - Developing Grip N Drip by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/219877053/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/3-BrandingSqueezyDawgs.webp" alt="Branding Project 3 - Squeezy Dawgs by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
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
              <a href="https://www.behance.net/gallery/204709819/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/1-MarketingVochos.webp" alt="Marketing Project 1 - Vochos by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/199249521/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/2-MarketingTheCreationOfEarl.webp" alt="Marketing Project 2 - The Creation of Earl by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <a href="https://www.behance.net/gallery/199256085/Project-Name" target="_blank" rel="noopener noreferrer">
                <Image src="/ProjectThumbnails/3-MarketingPresentingMyArt.webp" alt="Marketing Project 3 - Presenting My Art by Khaled Momani, Designer, UI Designer, Marketing, Software Developer" className={styles.projectImage} width={400} height={316} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 