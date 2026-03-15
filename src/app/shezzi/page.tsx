import { Metadata } from "next";
import React from "react";
import Banner from "@/components/Banner";
import HPTextbox from "@/components/HPTextbox";
import ShezziProjectPageLogo from "@/components/icons/ShezziProjectPageLogo";
import ShezziBrandmarkIcon from "@/components/icons/ShezziBrandmarkIcon";
import Dropdown1 from "@/components/Dropdown1";
import styles from "./page.module.css";

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
              Shezzi is the intelligence. DomIno is the infrastructure. The IDE is the reason both exist.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
