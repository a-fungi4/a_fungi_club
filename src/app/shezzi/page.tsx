import React from "react";
import Banner from "@/components/Banner";
import HPTextbox from "@/components/HPTextbox";
import ShezziProjectPageLogo from "@/components/icons/ShezziProjectPageLogo";
import styles from "./page.module.css";

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

export default async function ShezziPage() {
  const readmeHtml = await getReadme();
  
  const blurb = `Shezzi
Most AI systems are built to run on infrastructure you don't own. Shezzi was built on the assumption that intelligence shouldn't require it.

Shezzi is a locally-run, multi-model AI system designed around a single constraint: do more with less. Rather than scaling up compute, it scales up efficiency — using a custom architecture that routes intelligence dynamically, fires compute only where it's needed, and coordinates between specialized models through a proprietary low-latency communication protocol.

The result is a system that thinks in layers. Different problems get routed to different experts. Specialists are promoted, demoted, or swapped based on what the task demands. The whole system maintains awareness of what it knows, what it doesn't, and what it's worth finding out — scoring feasibility before committing resources.

What's novel isn't any single component. It's the premise: that a personally-owned AI system, running on consumer hardware, can develop genuine intelligence over time — not by getting bigger, but by getting better at knowing what to do with what it has.

Shezzi is ongoing. It's both a technical project and a philosophical one.`;

  return (
    <div className={styles.shezziMain}>
      <Banner title="Shezzi" variant="general">
        <HPTextbox text={blurb} />
      </Banner>
      
      <div className={styles.contentRow}>
        <div className={styles.logoWrapper}>
          <ShezziProjectPageLogo />
        </div>
        
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
      </div>
    </div>
  );
}
