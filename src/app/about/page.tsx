"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "@/components/Banner";
import Dropdown1 from "@/components/Dropdown1";
import Image from "next/image";
import ProcessIcon from "@/components/icons/ProcessIcon";
import ProcessSelectionDropdown from "@/components/ProcessSelectionDropdown";
import PRPlasticity from "@/components/icons/PRPlasticity";
import PRInsideOut from "@/components/icons/PRInsideOut";
import PRAutomation from "@/components/icons/PRAutomation";

export default function AboutPage() {
  const [openProcess, setOpenProcess] = useState<number | null>(null);

  return (
    <>
      <Banner title="About" variant="general" className="fullBleed">
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>It’s not all there. There’s a lot in the middle that I can’t put into a portfolio. My doctor questions how I’m alive every time I visit. I pop up on my friends sporadically and make their day interesting. If you decide to work with me you might get the details. For now, just know: I’m really living... and allergic to avocado. Please for the love of god keep the avocado away from the potluck.</p>
          </div>
        </div>
      </Banner>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>About Page</h1>
        <Dropdown1
          title="BIO"
          content={
            <p>
              I started my higher education in psychology, where I learned that the biggest stressor for people struggling with mental illness wasn&apos;t just their condition—it was their socioeconomic status. The main roadblock to getting help wasn&apos;t treatment; it was survival. I switched to civil engineering because I wanted to make a real difference, and psychology&apos;s existing tools didn&apos;t feel like enough. If I could create accessible, affordable housing with features that helped people manage tasks they struggled with—whether due to physical or mental disabilities—I could do more for them than I ever could as a psychiatrist.
              <br /><br />
              But engineering had its own roadblocks. I failed calculus five times, and it kept me from moving forward in the major. Instead, I filled my schedule with design and art classes—and I had the time of my life. My professors saw it too, encouraging me to change fields, telling me engineering didn&apos;t seem like the right fit. That made me rethink everything. I needed a career where I could help people while doing what I loved. That&apos;s when I found UI design. If I could make work and daily life easier for the most disadvantaged, I could make just as much of an impact as I would have designing accessible housing.
              <br /><br />
              After finally passing calculus with an A. I left college and took an alternative route, learning UI design on my own. I worked in construction for a while, doing CAD design and managing teams, which gave me the confidence to grow as a creator. Then I moved into freelance work, creating branding and marketing assets for food trucks across Houston. That led me to H-Town Social, where I took on every role the company needed—graphic design, social media strategy, video production—until I was leading a team. But I realized I enjoyed setting up the operation more than the daily work. I loved taking employee feedback, implementing productivity tools, and automating managerial tasks. That&apos;s what pushed me to transition from marketing to software development. I wanted to build the systems that make work easier, experience different industries, and help the most disadvantaged people live better lives.
            </p>
          }
          placeholder={
            <Image
              src="/headshot-bw.webp"
              alt="Headshot"
              width={0}
              height={0}
              sizes="(max-width: 600px) 40vw, (max-width: 900px) 75vw, 200px"
              style={{
                width: 'clamp(160px, 16vw, 200px)',
                height: 'auto',
                maxWidth: '100%',
                borderRadius: '50%'
              }}
              priority
            />
          }
        />
        <Dropdown1 title="Process" content={
          <AnimatePresence mode="wait">
            {openProcess === null && (
              <motion.div
                key="collapsed-group"
                initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', width: '100%', gap: '2vw', transformOrigin: 'center' }}
              >
                <ProcessSelectionDropdown
                  title="Plasticity"
                  icon={<PRPlasticity />}
                  expanded={false}
                  onClick={() => setOpenProcess(1)}
                  content={
                    <>
                      Design should move. It should adapt, shift, and grow. I love the concept of design plasticity—the ability to reshape without losing structure. Inspired by space plasticity in architecture, I design with fluidity in mind. Branding that bends without breaking. Layouts that evolve. Systems that stay strong, no matter how they change.<br /><br />
                      But more than that, design plasticity breaks closed thinking. In engineering, the difference between asking, &quot;How do we get across the water?&quot; instead of &quot;How do we build a bridge?&quot; opens up new solutions. Design should focus on the problem statement, not the assumed answer. The best ideas come from questioning the question itself.
                    </>
                  }
                />
                <ProcessSelectionDropdown
                  title="InsideOut"
                  icon={<PRInsideOut />}
                  expanded={false}
                  onClick={() => setOpenProcess(2)}
                  content={
                    <>
                      Good design isn&apos;t just flexible—it&apos;s informed. Every design choice adds to a system of operations. That system should serve people, not the other way around. But corporate structures design from a distance, shaping policies for a world that doesn&apos;t exist. I try to understand the needs of the user. If I&apos;m making a menu, I get behind the cash register, take orders, and cut unnecessary steps. When I worked in radio, I got behind the mic and made my own track—not just to understand the process, but to see what was worth showcasing, what added value, and how to shape a message.<br /><br />
                      But immersion isn&apos;t always enough. When I create a system, I know its functions inside and out—a new user does not. That&apos;s when real-world observation matters more than personal experience. Don&apos;t wait for a review, a secondhand account, or a formal report. Watch where people look first. Listen to what they actually say. Design isn&apos;t about dictating how something should work—it&apos;s about seeing how it does. The best solutions come from the inside, not from the top down.
                    </>
                  }
                />
                <ProcessSelectionDropdown
                  title="Automation"
                  icon={<PRAutomation />}
                  expanded={false}
                  onClick={() => setOpenProcess(3)}
                  content={
                    <>
                      Automation should aid people, not replace them. When AI took off in 2023, companies rushed to automate the art itself instead of the work around it—marketing, sales funnels, funding. They stripped out the part people loved most, gutting creative teams to churn out eerie, half-baked production.<br /><br />
                      Automation should start by removing the least enjoyable tasks. Happy people are productive people. It should eliminate inefficiencies—task switching, wait time, defects, handoff errors—not human expertise. A company&apos;s most valuable resource isn&apos;t production; it&apos;s people. Layoffs break trust. Experience and loyalty can&apos;t be restored once lost. When people are in constant fear of being replaced, with their stability hanging by a thread, they can&apos;t perform at their best.<br /><br />
                      Productivity isn&apos;t about pushing people harder—it&apos;s about designing better systems. If automation reduces workload, it shouldn&apos;t be used to cut costs but to reinvest in people and scale production. Design isn&apos;t just about output; it&apos;s about creating an environment where people can live their best lives.
                    </>
                  }
                />
              </motion.div>
            )}
            {openProcess === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', transformOrigin: 'center' }}
              >
                <ProcessSelectionDropdown
                  title="Plasticity"
                  icon={<PRPlasticity />}
                  expanded={true}
                  onCollapse={() => setOpenProcess(null)}
                  content={
                    <>
                      Design should move. It should adapt, shift, and grow. I love the concept of design plasticity—the ability to reshape without losing structure. Inspired by space plasticity in architecture, I design with fluidity in mind. Branding that bends without breaking. Layouts that evolve. Systems that stay strong, no matter how they change.<br /><br />
                      But more than that, design plasticity breaks closed thinking. In engineering, the difference between asking, &quot;How do we get across the water?&quot; instead of &quot;How do we build a bridge?&quot; opens up new solutions. Design should focus on the problem statement, not the assumed answer. The best ideas come from questioning the question itself.
                    </>
                  }
                />
              </motion.div>
            )}
            {openProcess === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', transformOrigin: 'center' }}
              >
                <ProcessSelectionDropdown
                  title="InsideOut"
                  icon={<PRInsideOut />}
                  expanded={true}
                  onCollapse={() => setOpenProcess(null)}
                  contentClassName="transparentContent"
                  content={
                    <>
                      Good design isn&apos;t just flexible—it&apos;s informed. Every design choice adds to a system of operations. That system should serve people, not the other way around. But corporate structures design from a distance, shaping policies for a world that doesn&apos;t exist. I try to understand the needs of the user. If I&apos;m making a menu, I get behind the cash register, take orders, and cut unnecessary steps. When I worked in radio, I got behind the mic and made my own track—not just to understand the process, but to see what was worth showcasing, what added value, and how to shape a message.<br /><br />
                      But immersion isn&apos;t always enough. When I create a system, I know its functions inside and out—a new user does not. That&apos;s when real-world observation matters more than personal experience. Don&apos;t wait for a review, a secondhand account, or a formal report. Watch where people look first. Listen to what they actually say. Design isn&apos;t about dictating how something should work—it&apos;s about seeing how it does. The best solutions come from the inside, not from the top down.
                    </>
                  }
                />
              </motion.div>
            )}
            {openProcess === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', transformOrigin: 'center' }}
              >
                <ProcessSelectionDropdown
                  title="Automation"
                  icon={<PRAutomation />}
                  expanded={true}
                  onCollapse={() => setOpenProcess(null)}
                  content={
                    <>
                      Automation should aid people, not replace them. When AI took off in 2023, companies rushed to automate the art itself instead of the work around it—marketing, sales funnels, funding. They stripped out the part people loved most, gutting creative teams to churn out eerie, half-baked production.<br /><br />
                      Automation should start by removing the least enjoyable tasks. Happy people are productive people. It should eliminate inefficiencies—task switching, wait time, defects, handoff errors—not human expertise. A company&apos;s most valuable resource isn&apos;t production; it&apos;s people. Layoffs break trust. Experience and loyalty can&apos;t be restored once lost. When people are in constant fear of being replaced, with their stability hanging by a thread, they can&apos;t perform at their best.<br /><br />
                      Productivity isn&apos;t about pushing people harder—it&apos;s about designing better systems. If automation reduces workload, it shouldn&apos;t be used to cut costs but to reinvest in people and scale production. Design isn&apos;t just about output; it&apos;s about creating an environment where people can live their best lives.
                    </>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        } placeholder={
          <ProcessIcon
            width="clamp(180px, 22vw, 200px)"
            height="auto"
            style={{ maxWidth: '100%', borderRadius: '50%' }}
          />
        } transparentProcess={openProcess === 2} hugContentHeight={true} />
      </div>
    </>
  );
} 