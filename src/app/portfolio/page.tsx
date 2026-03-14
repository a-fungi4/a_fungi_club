import React from "react";
import type { Metadata } from "next";
import Banner from "@/components/Banner";
import PortfolioInteractive from "./PortfolioInteractive";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected work by Khaled Momani — UI/UX design, branding, marketing, and front-end development projects including Shezzi, Heirloom, and Design to Code.',
  alternates: {
    canonical: 'https://a-fungi.club/portfolio',
  },
  openGraph: {
    title: 'Portfolio | A Fungi Club',
    description:
      'Selected work in UI/UX design, branding, marketing, and front-end development.',
    url: 'https://a-fungi.club/portfolio',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'A Fungi Club Portfolio' }],
  },
};

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
      <PortfolioInteractive />
    </>
  );
} 