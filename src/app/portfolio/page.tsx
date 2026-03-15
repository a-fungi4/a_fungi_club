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
      <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h2>Banner: Portfolio</h2>
        <p>You know that old lady that swallowed a fly, and then it led to swallowing a horse and dying. I think I'm at my, cow chasing dog, now and I&apos;m hoping the horse doesn't kill me. I somehow went from wanting to make flat icons for apps, to stickers, to my own clothing line, to food trucks, to marketing, to CRMs, to apps for developers, to an incredible fully autonomous, AI governance structure, with feelings, that gives ChatGPT a run for its money. AI systems, interfaces, and brands. Independent research in AI architecture, locally-sovereign systems, and agent tooling — alongside client work in UI, branding, and marketing.</p>
        
        <h2>Featured Projects</h2>
        
        <h3>Shezzi - Personally Owned AI</h3>
        <p>Most AI systems are built to run on infrastructure you don't own. Shezzi was built on the assumption that intelligence shouldn't require it. Shezzi is a locally-run, multi-model AI system designed around a single constraint: do more with less. Rather than scaling up compute, it scales up efficiency — using a custom architecture that routes intelligence dynamically, fires compute only where it's needed, and coordinates between specialized models through a proprietary low-latency communication protocol. The result is a system that thinks in layers. Different problems get routed to different experts. Specialists are promoted, demoted, or swapped based on what the task demands. The whole system maintains awareness of what it knows, what it doesn't, and what it's worth finding out — scoring feasibility before committing resources. What's novel isn't any single component. It's the premise: that a personally-owned AI system, running on consumer hardware, can develop genuine intelligence over time — not by getting bigger, but by getting better at knowing what to do with what it has. Shezzi is ongoing. It's both a technical project and a philosophical one.</p>
        
        <h3>Heirloom - Mental Health Companion</h3>
        <p>Heirloom is a web app created by the developers at PRJCT Lazrus. We are a team of dedicated developers, specializing in work management software. This project was the vision of Marcus Workman and Zachary Hendon. I met Marcus at an art show in Austin. I had just finished designing my first CRM. I was just about to start learning development and he was about to graduate college. This project was his Capstone project. An app that worked hand in tandem with the users therapist to document mood fluctuation and provide resources for mental health. This project integrated several AI tools and showed a lot of potential for future improvements. I was tasked with creating the visual identity of the app. The initial design I was given was a series of basic buttons and logic to display various backend calculations. It was up to me to bring it to life and make it intuitive to the user's needs.</p>
        
        <h3>DesignToCode - Portfolio as Demonstration</h3>
        <p>After learning about vibe coding and testing the limits of Cursor AI, I was able to explore implementing my projects. As a designer I wanted my portfolio to be a demonstration of my skills. Prior to this website I was using Adobe Portfolio. It was fast and already included in my creative cloud package. Instead, I wanted to bring one of my Figma creations to life.</p>
        
        <h2>UI, Branding and Marketing Work</h2>
        <ul>
          <li>
            <strong>Instagram Feature Concept:</strong> For my first prototype I was still exploring the features of Adobe XD. Instead of creating an app from scratch, I decided to improve one that I already use. Because I started this project in 2020, this one was based on a previous version of Instagram. I started by recreating the profile page. I was surrounded by various content creators, including DJ's, video producers, influencers, etc. I asked what bothers them when they use instagram and got a variety of responses. Key features include Pinned Posts, Linked Posts, Posters, and Repost options to solve grid alignment issues.
          </li>
          <li>
            <strong>Exploring Figma (CRAM):</strong> Documents transition from Adobe XD and traditional CRMs like Asana, Hootsuite, and Meta Business Suite to Figma while developing "CRAM" CRM. Addressed issues like lack of malleability, complicated interfaces, and unreliable integrations. Figma was chosen as AI tools recommended it for better interaction.
          </li>
          <li>
            <strong>Unpacking Figma:</strong> Experiment in prototyping and animation focused on vintage hardware aesthetics. A deliberately raw experiment in Figma as a UI design tool, including callbacks to vintage hardware as an ode to predecessors. Focused on learning Figma's boundaries with "no polish—just visible seams."
          </li>
          <li>
            <strong>Area 59 Studios:</strong> Brand guidelines for Z-Real's studio. Features a custom branding kit, symbol guidelines, and color palettes. The logo symbol includes an accidental upside-down yen symbol (¥) that looks like the client's braids. Colors: Green (#1FE043), Blue (#1F5CE0), Pink (#E01F8C), Orange (#E0A31F).
          </li>
          <li>
            <strong>Grip N Drip Halal Food Truck:</strong> Brand identity and menu for a food truck in a predominantly Muslim area. Features culturally relevant puns: Bulgogi Museowo, Masala Laykum, Philly Drip, Gyraondago. Menu includes Bulgogi Hwaiting! ($12.99) and Masala Laykum ($11.99).
          </li>
          <li>
            <strong>Squeezy Dawgs:</strong> A raunchy hotdog truck concept (unlaunched). Visual identity features hotdog buns mimicking a posterior. The design philosophy focuses on "distinction from reality" by rejecting Houston's typical gray/green landscape colors.
          </li>
          <li>
            <strong>Vocho's Tacos:</strong> Branding for a taco truck featuring creative menu naming and photography. Dishes include Vocho's Birria Taco ($14), Sleazy N Cheesy ($15), Birriah Bowlama ($14), and Kinky N Stuffed Burrito ($14). Street tacos, elote sticks, and filled churros are also featured.
          </li>
          <li>
            <strong>AJ's Hot Chicken (The Creation of Earl):</strong> Designing walls and windows using plexiglass panels. Introduced "Earl," the Dino-Chicken character from the evolution wall panel, who became a mascot for marketing and motion graphics. Includes themes of "FIRE IT UP," "JUICY," and "SEASONED."
          </li>
          <li>
            <strong>Presenting My Art:</strong> Social media presentations for designs on clothing and print. Featured pieces include "Dichotomy," "Old," and "Abilify 10mg" (mushroom-themed). Includes the alien with a cigarette, originally a large 4'X4' aluminum painting.
          </li>
        </ul>
      </div>
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
