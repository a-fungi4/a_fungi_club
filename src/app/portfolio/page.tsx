import React from "react";
import Banner from "@/components/Banner";
import HighlightedProject from "@/components/HighlightedProject";
import HPButton from "@/components/HPButton";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

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

I was tasked with creating the visual identity of the app. The initial design I was given was a series of basic buttons and logic to display various backend calculations. It was up to me to bring it to life and make it intuitive to the user's needs.`}
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
              <Image src="/ProjectThumbnails/1-UIUserResearch.webp" alt="UI Project 1 - User Research" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/2-UIWireFramingCram.webp" alt="UI Project 2 - Wireframing CRM" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/3-UIPrototypingAndAnimation.webp" alt="UI Project 3 - Prototyping and Animation" className={styles.projectImage} width={400} height={300} />
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
              <Image src="/ProjectThumbnails/1-BrandingArea59.webp" alt="Branding Project 1 - Area 59" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/2-BrandingDevelopingGripNDrip.webp" alt="Branding Project 2 - Developing Grip N Drip" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/3-BrandingSqueezyDawgs.webp" alt="Branding Project 3 - Squeezy Dawgs" className={styles.projectImage} width={400} height={300} />
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
              <Image src="/ProjectThumbnails/1-MarketingVochos.webp" alt="Marketing Project 1 - Vochos" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/2-MarketingTheCreationOfEarl.webp" alt="Marketing Project 2 - The Creation of Earl" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.iframeWrapper}>
              <Image src="/ProjectThumbnails/3-MarketingPresentingMyArt.webp" alt="Marketing Project 3 - Presenting My Art" className={styles.projectImage} width={400} height={300} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 