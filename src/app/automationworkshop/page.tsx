import React from "react";
import type { Metadata } from "next";
import Banner from "@/components/Banner";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: 'Automation Workshop | Khaled Momani — AI Systems Engineer & Designer',
  description:
    'Automation tools and solutions for print shops by Khaled Momani. Streamlining manual tasks and increasing efficiency through custom development.',
  alternates: {
    canonical: 'https://www.b8momani.com/automationworkshop',
  },
  openGraph: {
    title: 'Automation Workshop | A Fungi Club',
    description:
      'Custom automation solutions for print shops and production facilities.',
    url: 'https://www.b8momani.com/automationworkshop',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Automation Workshop — A Fungi Club' }],
  },
};

export default function AutomationWorkshopPage() {
  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h2>Banner: Automation Workshop</h2>
        <p>Automation tools and solutions for print shops and production facilities. Streamlining manual tasks and increasing efficiency through custom development.</p>
        
        <h2>Project Overview</h2>
        <p>The Automation Workshop is a dedicated project focused on building tools that simplify complex workflows. From automated quoting systems to production tracking, we build solutions that let businesses focus on creating, not managing.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Custom Quoting Engines</li>
          <li>Production Workflow Automation</li>
          <li>Inventory Management Integration</li>
          <li>Real-time Progress Tracking</li>
        </ul>
      </div>
      <Banner
        title="Automation Workshop"
        variant="general"
        className="fullBleed"
      >
        <div className={styles.bannerProjectEmbed}>
          <div className={styles.bannerTextBox}>
            <p>Automation tools and solutions for print shops and production facilities. Streamlining manual tasks and increasing efficiency through custom development.</p>
          </div>
        </div>
      </Banner>
      <div className={styles.content}>
        <div className={styles.projectOverview}>
          <h2>Project Overview</h2>
          <p>
            I'm working in print again and I need to keep my brain on coding. While I'm working I take note of system inefficiencies and potential development solutions. I go home and I work on them as a way to keep myself stimulated. It was something I was doing on my own time so I made the tools publicly available through AWS's free tier. This project will consist of multiple tools that automate and increase efficiency of various manual tasks carried out in print shops as well as other production facilities.
          </p>
        </div>
        
        <div className={styles.projectDetails}>
          <h2>Project Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <h3>Platform</h3>
              <p>AWS Free Tier</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Focus</h3>
              <p>Print Shop Automation</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Status</h3>
              <p>In Development</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Tools</h3>
              <p>Multiple Automation Solutions</p>
            </div>
          </div>
        </div>
        
        <div className={styles.features}>
          <h2>Key Features</h2>
          <ul>
            <li>Task automation for manual processes</li>
            <li>Efficiency optimization tools</li>
            <li>Production facility integration</li>
            <li>Custom development solutions</li>
            <li>Public availability through AWS</li>
          </ul>
        </div>
      </div>
    </>
  );
} 