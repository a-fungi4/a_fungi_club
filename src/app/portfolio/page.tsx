import React from "react";
import type { Metadata } from "next";
import Banner from "@/components/Banner";
import PortfolioInteractive from "./PortfolioInteractive";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Portfolio | Khaled Momani — AI Systems Engineer & Designer",
  description: "AI systems research, UI design, branding, and marketing work by Khaled Momani. Includes Shezzi, a locally-sovereign AI system built on consumer hardware.",
  alternates: {
    canonical: 'https://www.b8momani.com/portfolio',
  },
  openGraph: {
    title: "Portfolio | Khaled Momani — AI Systems Engineer & Designer",
    description: "AI systems research, UI design, branding, and marketing work by Khaled Momani. Includes Shezzi, a locally-sovereign AI system built on consumer hardware.",
    url: 'https://www.b8momani.com/portfolio',
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
            <p>You know that old lady that swallowed a fly, and then it led to swallowing a horse and dying. I think I'm at my, cow chasing dog, now and I&apos;m hoping the horse doesn't kill me. I somehow went from wanting to make flat icons for apps, to stickers, to my own clothing line, to food trucks, to marketing, to CRMs, to apps for doctors, to an incredible fully autonomous, AI governance structure, with feelings, that gives ChatGPT a run for its money.  AI systems, interfaces, and brands. Independent research in AI architecture, locally-sovereign systems, and agent tooling — alongside client work in UI, branding, and marketing.</p>
          </div>
        </div>
      </Banner>
      <PortfolioInteractive />
    </>
  );
}
