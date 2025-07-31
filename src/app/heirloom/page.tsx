import React from "react";
import Banner from "@/components/Banner";
import HPTextbox from "@/components/HPTextbox";
import SkillPillCont from "@/components/SkillPillCont";
import Prototype from "@/components/Prototype";
import CompanionViewer from "@/components/CompanionViewer";
import Carousel from "@/components/Carousel";
import styles from "./page.module.css";

const HEIRLOOM_CAROUSEL_PHOTOS = [
  "/heirloom-carousel-photos/1.png",
  "/heirloom-carousel-photos/2.png",
  "/heirloom-carousel-photos/3.png",
  "/heirloom-carousel-photos/4.png",
  "/heirloom-carousel-photos/5.png",
  "/heirloom-carousel-photos/6.png",
  "/heirloom-carousel-photos/7.png",
  "/heirloom-carousel-photos/8.png",
  "/heirloom-carousel-photos/9.png",
  "/heirloom-carousel-photos/10.png",
  "/heirloom-carousel-photos/11.png",
  "/heirloom-carousel-photos/12.png",
  "/heirloom-carousel-photos/13.png",
  "/heirloom-carousel-photos/14.png",
];

export default function HeirloomPage() {
  return (
    <div className={styles.heirloomMain}>
      <Banner title="Heirloom" variant="general">
        <HPTextbox text={`Your mental health companion`} />
        <SkillPillCont skills={["Wireframing", "Prototyping", "Design", "Market Research", "User Testing", "Vite", "JavaScript", "Branding"]} projectType="UI Development" />
      </Banner>
      <div className={styles.heirloomRow}>
        <Prototype src="https://embed.figma.com/proto/vgGDjqXkQcfBDkveawmprF/Heirloom---Redesign?page-id=0%3A1&node-id=3-17&p=f&viewport=-648%2C519%2C0.46&t=zGWQJj1mIqFuTWqc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8%3A252&embed-host=share&hide-ui=1" />
        <div className={styles.heirloomTextCol}>
          <div className={styles.previewPill}>
            <div className={styles.previewPillText}>PREVIEW</div>
          </div>
          <div className={styles.heirloomTextboxWrapper}>
            <div className={styles.heirloomCustomTextboxOuter}>
              <div className={styles.heirloomCustomTextbox}>
              {`The embed is a figma prototype. Preview the app and look through all the features. I created this in a speed run before we had an interview with some press members. I went back in and refined it as I developed the front end of the app.

First I created the prototype, and then I copied the html from Figma one component at a time into the Cursor AI assistant.

Cursor AI can't really see the animations in order to develop it. Adding the animations into the figma prototype was just a redundant step. I ended up needing to describe the animation behavior and creating the end state of each animation step for the AI assistant to create it. The most efficient workflow was to use Figma only for layouts and lo-fi wire frames.

A lot of the animation I created in figma were impractical during development. Using cursor was like having a developer that worked right next to me and needed step by step directions for each component.`}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel container above companions and impact */}
      <div className={styles.carouselContainer}>
        <Carousel photos={HEIRLOOM_CAROUSEL_PHOTOS} />
      </div>
      <div className={styles.companionRow}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '398px' }}>
          <div className={styles.impactPill}>Impact</div>
          <div className={styles.companionTextBox}>
            <div className={styles.companionTextContent}>
              {`The purpose of the redesign was to make the app more engaging. The first thing I did was create the basic branding necessary to make the app feel more complete. I started with a logo, color pallette, and fonts. The impact I made was taking this from being analytical buttons to a cohesive app with character and personality. The redesign brought Heirloom to life, giving the backend an interface that did it justice.

The most notable contribution to the app was creating the companion. I created a character that would make the user more engaged. Instead of just a voice, they have a face to look at. From the time I spent managing social media, I found that people were more engaed by faces than anything else. You can dress up a chicken sandwich as pretty as it'll ever be, but if it doesn't have eyes and a face and talk to you, people don't care for it.

I started by creating a tomato and giving the users multiple options for customization. After that I created multiple fruits for the user to pick from. Prior to implementing I tested the companions with various audiences. Different age groups and genders. I got an overwhelmingly positive response.
         
After attempting to open the originally developed app in browser, we found a bug in the code. The developers were going back and forth in a dependency incompatibilty loop. They handed it to me to see if there was anything I could do. After thorough research, I found that the error was a need to update the firebase dependency to the newest version. Unnfortunately, it was code breaking. After looking through the code changes that would need to be done, I did some research on cursor AI to see how it could be done efficiently. I found that the user could set rules for the AI Assitant. This along with the ability for the assistant to silently work while I continued design allowed me to refactor the whole app, effortlessly, for the new dependencies. I watched the AI do the first few files, corrected its mistakes, and then adjusted the rules as needed. The refactoring process took around four hours, and while it was happening I was able to continue designing. I used this same process to refactor hardcoded styles and create style sheets.`}
            </div>
          </div>
        </div>
        <CompanionViewer />
      </div>
    </div>
  );
} 