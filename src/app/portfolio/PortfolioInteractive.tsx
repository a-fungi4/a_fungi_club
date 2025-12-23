"use client";
import React from "react";
import Link from "next/link";
import HPButton from "@/components/HPButton";
import HighlightedProject from "@/components/HighlightedProject";
import Image from "next/image";
import styles from "./page.module.css";

function trackPortfolioClick(project: string, type: 'button' | 'photo') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_portfolio_project', { project, type });
  }
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'SelectPortfolioProject', { project, type });
  }
}

export default function PortfolioInteractive() {
  return (
    <>
      <div className={styles.highlightedProjectWrapper}>
        <HighlightedProject 
          variant="project1" 
          button={
            <Link href="/heirloom" onClick={() => trackPortfolioClick('Heirloom', 'button')}>
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
            <Link href="/designtocode" onClick={() => trackPortfolioClick('DesignToCode', 'button')}>
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
            <Link href="https://www.behance.net/gallery/219795113/INSTAGRAM-ADDING-FEATURES-UI-DESIGN" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('UIUserResearch', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/1-UIUserResearch.webp" alt="UI design concept for improving Instagram, featuring the Instagram logo with new feature icons based on user feedback. Project explores user interface enhancements and branding strategy by a front-end designer focused on marketing and UX innovation." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/220356837/Exploring-Figma-PT-1" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('UIWireFramingCram', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/2-UIWireFramingCram.webp" alt="UI design project created in Figma to build a marketing-focused CRM with automation features. Visual breakdown of front-end development, design thinking, and branding integration for streamlining AI-powered marketing workflows." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/222677953/Unpacking-Figma-PT-2" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('UIPrototypingAndAnimation', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/3-UIPrototypingAndAnimation.webp" alt="Experimental UI design prototype built in Figma with advanced animation and motion features. Focused on front-end development, branding design, and portfolio creation under budget constraints for marketing and food & beverage industry clients." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Branding</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/220936077/Area-59-Studios-Brand-Guidelines" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('BrandingArea59', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/1-BrandingArea59.webp" alt="Branding Project: Area 59 – Personalized brand identity design focused on client individuality, authenticity, and emotional connection. Custom branding strategy for small business, personal branding, and unique visual storytelling." className={styles.projectImage} width={400} height={300} unoptimized />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/220075681/Grip-N-Drip-Developing-An-Established-Brand" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('BrandingDevelopingGripNDrip', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/2-BrandingDevelopingGripNDrip.webp" alt="Branding Project: Developing Grip N Drip – Brand development and growth for an existing business, enhancing brand recognition, marketing readiness, and visual identity. Strategic branding for business growth and market expansion." className={styles.projectImage} width={400} height={300} unoptimized />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/219877053/Squeezy-Dawgs-Brand-Guidelines" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('BrandingSqueezyDawgs', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/3-BrandingSqueezyDawgs.webp" alt="Branding Project: Squeezy Dawgs – Complete brand creation for a regional audience, building a memorable brand world with storytelling, local engagement, and scalable brand lore. Regional branding, storytelling, and community-focused design." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Marketing</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/204709819/Vochos-Tacos" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('MarketingVochos', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/1-MarketingVochos.webp" alt="Marketing Project: Vocho's Tacos – Interactive marketing campaign focused on humanizing a food brand, making the concept relatable and engaging for customers. Creative marketing strategy, brand storytelling, and customer engagement for restaurant marketing." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/199249521/AJs-Hot-Chicken-The-Creation-of-Earl" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('MarketingTheCreationOfEarl', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/2-MarketingTheCreationOfEarl.webp" alt="Marketing Project: The Creation of Earl – Character creation and brand development, building a relatable persona to connect with audiences. Brand character design, audience engagement, and creative marketing for brand loyalty." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
          <div className={styles.projectCard}>
            <Link href="https://www.behance.net/gallery/199256085/Presenting-My-Art-on-Social-Media" target="_blank" rel="noopener noreferrer" onClick={() => trackPortfolioClick('MarketingPresentingMyArt', 'photo')}>
              <div className={styles.iframeWrapper}>
                <Image src="/ProjectThumbnails/3-MarketingPresentingMyArt.webp" alt="Marketing Project: Presenting My Art – Innovative marketing approaches to make art accessible and relatable, providing tangible ways for people to support independent artists. Art marketing, accessibility, and creative support strategies for artists." className={styles.projectImage} width={400} height={300} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 