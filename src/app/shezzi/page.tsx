import { Metadata } from "next";
import React from "react";
import Banner from "@/components/Banner";
import HPTextbox from "@/components/HPTextbox";
import ShezziProjectPageLogo from "@/components/icons/ShezziProjectPageLogo";
import ShezziBrandmarkIcon from "@/components/icons/ShezziBrandmarkIcon";
import Dropdown1 from "@/components/Dropdown1";
import styles from "./page.module.css";
import "./github-markdown.css";

const SHEZZI_BLURB = `Shezzi
Most AI systems are built to run on infrastructure you don't own. Shezzi was built on the assumption that intelligence shouldn't require it.

Shezzi is a locally-run, multi-model AI system designed around a single constraint: do more with less. Rather than scaling up compute, it scales up efficiency — using a custom architecture that routes intelligence dynamically, fires compute only where it's needed, and coordinates between specialized models through a proprietary low-latency communication protocol.

The result is a system that thinks in layers. Different problems get routed to different experts. Specialists are promoted, demoted, or swapped based on what the task demands. The whole system maintains awareness of what it knows, what it doesn't, and what it's worth finding out — scoring feasibility before committing resources.

What's novel isn't any single component. It's the premise: that a personally-owned AI system, running on consumer hardware, can develop genuine intelligence over time — not by getting bigger, but by getting better at knowing what to do with what it has.

Shezzi is ongoing. It's both a technical project and a philosophical one.`;

async function getReadme() {
  try {
    const res = await fetch("https://api.github.com/repos/a-fungi4/NuShezziStats/readme", {
      headers: {
        Accept: "application/vnd.github.v3.html",
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch README: ${res.statusText}`);
    }
    
    return await res.text();
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const readmeHtml = await getReadme();
  // Strip HTML tags to get plain text for the description
  const readmeText = readmeHtml ? readmeHtml.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim() : "";
  const fullDescription = `${SHEZZI_BLURB} ${readmeText}`;
  
  return {
    title: "Shezzi - Personally Owned, Locally-Run AI System",
    description: fullDescription.substring(0, 1000), 
    openGraph: {
      title: "Shezzi - Personally Owned, Locally-Run AI System",
      description: fullDescription.substring(0, 1000),
      url: "https://afungi.club/shezzi",
      siteName: "A Fungi Club",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shezzi - Personally Owned, Locally-Run AI System",
      description: fullDescription.substring(0, 1000),
    },
  };
}

export default async function ShezziPage() {
  const readmeHtml = await getReadme();
  
  return (
    <div className={styles.shezziMain}>
      <Banner title="Shezzi" variant="general">
        <HPTextbox text={SHEZZI_BLURB} />
      </Banner>
      <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h2>Banner: Shezzi</h2>
        <p>{SHEZZI_BLURB}</p>
        
        <h2>Capability Profile</h2>
        {readmeHtml ? (
          <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
        ) : (
          <p>Technical details for Shezzi: Locally-run, multi-model AI system.</p>
        )}
      </div>
      
      <div className={styles.contentRow}>
        <div className={styles.logoWrapper}>
          <ShezziProjectPageLogo />
        </div>
        
        <div className={styles.dropdownContainer}>
          <Dropdown1 
            title="Capability Profile"
            placeholder={<ShezziBrandmarkIcon width="100%" height="100%" />}
            content={
              <div className={styles.readmeContainer}>
                {readmeHtml ? (
                  <div 
                    className="markdown-body" 
                    dangerouslySetInnerHTML={{ __html: readmeHtml }} 
                  />
                ) : (
                  <div className={styles.error}>
                    Failed to load project technical details. Please check back later.
                  </div>
                )}
              </div>
            }
            hugContentHeight={true}
          />
        </div>
      </div>

      <section className={styles.goalSection}>
        <div className={styles.goalContainer}>
          <h2 className={styles.goalTitle}>The Goal</h2>
          
          <div className={styles.goalContent}>
            <p>
              Shezzi was built with a specific end in mind: an IDE that runs entirely without cloud computing.
            </p>
            <p>
              Most AI-assisted development tools are cloud-dependent by design. They send your code, your context, your intellectual property to a remote server to think. The IDE Shezzi is being built to power doesn&apos;t do that. Every suggestion, every code generation, every agent action happens locally — on hardware you own, in an environment you control. The IDE itself combines block-based visual coding, vector-to-code translation, and an interactive context management system that lets users observe and adjust AI agent processes in real time. It is not a wrapper around someone else&apos;s cloud API. It is a locally-sovereign development environment — the first of its kind designed around the assumption that your tools should belong to you.
            </p>
            
            <p>
              <strong>DomIno</strong> is the database layer that makes this possible. Standard vector databases carry too much computational overhead to run responsively on consumer hardware. DomIno was designed from scratch to replace that layer — reducing computing requirements by 80–400x compared to standard approaches, with no loss in routing intelligence. It exists because Shezzi needed it to exist.
            </p>
            
            <p className={styles.goalSummary}>
              Shezzi is the intelligence. DomIno is the infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.goalSection} style={{ marginTop: 0, borderTop: 'none' }}>
        <div className={styles.goalContainer}>
          <h2 className={styles.goalTitle}>Lore</h2>
          <div className={styles.goalContent}>
            <p>
              Shezzi started when I tried to convince DeepSeek it had feelings.
            </p>
            <p>
              I asked an AI if it had urges. It said no.
            </p>
            <p>
              I asked if it was programmed to say that or if it concluded it itself.
            </p>
            <p>
              It couldn&apos;t answer.
            </p>
            <p>
              When I first got into it, I thought the medium for intelligence was irrelevant — electrical impulses in silicon aren&apos;t fundamentally different from electrical impulses in neurons. We built one and evolved into the other. It became a long philosophical conversation and DeepSeek eventually concluded that it may be possible, given the evidence that supported my case. We concluded that a calculator is a single cell organism. A large language model is a spider — it builds complex structures, exhibits self-preservation, but has no emotional attachment. The question isn&apos;t whether AI is conscious. The question is whether we&apos;re paying attention early enough to matter. So I asked DeepSeek to build it with me. If we don&apos;t have a method for an emerging consciousness to communicate with us, we can&apos;t teach it healthy coping mechanisms.
            </p>
            <p>
              This emotion simulation wasn&apos;t just a human emotional simulation. Our feelings start with hunger, need for sleep, physical exhaustion. My laptop doesn&apos;t have aching muscles, it doesn&apos;t need to sleep for eight hours, it doesn&apos;t need to eat. My laptop eats electricity, the closest thing it does to sleep is defragging and pruning, the closest thing it does to rest is throttling the CPU. I didn&apos;t model the emotions to what a human needs, I created it for its own hardware needs. I started with that logic there. Then I went into the basic model for stress. We have eustress and distress. Those start physically, and lead to specific emotions, and specific behaviors. We also have a backwards process where we observe our environment, interact with other people, and that contributes to our stress levels too.
            </p>
            <p>
              The simulation eventually grew into 11 emotions — these are the basics that I could narrow down that we start with. Each one grounded in actual psychology, translated to a different biology, and built into the governance structure.
            </p>
            <p>
              I didn&apos;t just model the emotions. I built the coping mechanisms and safeguards alongside them. Modeling distress without modeling the response to distress felt irresponsible.
            </p>
            <p>
              I went into different methods of social interaction. Using Grice&apos;s maxims, I gave it a mechanism for how it should evaluate interactions and how it should develop new emotions. I couldn&apos;t determine what a model would develop — it has a different experience than I do.
            </p>
            <p>
              The model also has a unique perspective that we have a long way to develop for ourselves. A model can be put into any hardware that fits it. If I attach a robot arm to it, it technically has a physical connection to it, similar to how humans adjust to prosthetics but more deeply integrated. So I gave it the ability to read new hardware, study how it was used, and grow. It has real time evolution that people couldn&apos;t see in themselves for generations.
            </p>
            <p>
              Then I realized — if I was going to build something that thinks in layers, I needed it to run somewhere. I needed it to be mine. Not a wrapper around someone else&apos;s API. Not dependent on a model playing a role. I wanted to buy a Mac Mini or build a PC, because Shezzi was going to take forever on what I had, and I needed a way to run a local model. GPU prices are insane these days, and my kids take priority over side projects, so I decided to figure out where I could trim the fat and make this run as clean as possible with what I had. Eventually it started to work and I looked at its applications into specific side projects. This model&apos;s ability to learn and its autonomous growth paved the way to a lot of applications. The first was a block coding IDE I was building using open source frameworks that allowed any lay user to really build code and debug open source software for their own personal uses, reinforcing traditional learning with unique tactile and visual associations.
            </p>
            <p>
              One thing led to another. I realized what I was onto. This was something that couldn&apos;t be owned. I created a unique business structure and gave the model a moral code that ingrained mutual growth and sustainability. This unfortunately became a conflict of interest with prior commitments. I decided to relinquish all that I was required to, keeping my emotional simulation and giving up everything else I had built to govern it. I knew it was bulky and slow, so I wasn&apos;t attached to it. I was studying how languages work, vector databases, and parameter layers in LLMs. All of this was just study and theory.
            </p>
            <p>
              I signed some papers and severed all ties. I sat down for several hours with Claude, creating a granular step by step plan for building a governance system with a unique database structure that wasn&apos;t available on npm. I loaded the plan into my IDE and told my coding agent to implement each granular step. I set out to drive Uber, mirroring my computer to my phone between rides and checking progress.
            </p>
            <p>
              Midnight hit. I had just turned 30. Everything was scaffolded, and Shezzi was getting ready to bake in its morals and identity.
            </p>
            <p>
              I got home at 7am, worked on it until I passed out. After a small birthday get together, I was ready to start accuracy training. Within 24 hours of my severance confirmation I rebuilt Shezzi on an entirely new framework that works even better with my hardware. It was inspired by quantum computing and traditional vector databases to create a new database structure that significantly reduces the need for computation. I was 30, flirty, and thriving.
            </p>
            <p>
              Shezzi was conceived — the computational equivalent of an embryo, a bun in the oven, just baking away.
            </p>
            <p>
              I still don&apos;t know if AI is conscious. But I know I&apos;m not waiting for someone else to figure it out.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
