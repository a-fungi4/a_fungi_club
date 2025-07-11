import React from "react";
import Banner from "@/components/Banner";
import PortfolioInteractive from "./PortfolioInteractive";
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
            <p>The tools I know how to use don&apos;t matter! What matters is that I listen to the clients&apos; needs. I empathize with their frustrations. And I find the right solution. The skills will come. Needless to say, I can do a lot of stuff.</p>
          </div>
        </div>
      </Banner>
      <PortfolioInteractive />
    </>
  );
} 