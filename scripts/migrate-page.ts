#!/usr/bin/env node
/**
 * Single Page Migration Script for Sanity CMS
 * Migrates one page at a time with full SEO data
 * 
 * Usage:
 *   export SANITY_API_WRITE_TOKEN=your_token
 *   npx ts-node scripts/migrate-page.ts home
 *   npx ts-node scripts/migrate-page.ts about
 *   npx ts-node scripts/migrate-page.ts art
 */

import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configure Sanity client with WRITE token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Debug helper
function debug(label: string, data: any) {
  console.log(`\n🔍 DEBUG: ${label}`)
  console.log(JSON.stringify(data, null, 2))
  console.log('─'.repeat(50))
}

// Check if document exists
async function documentExists(type: string, slug: string): Promise<boolean> {
  const query = `*[_type == "${type}" && slug.current == "${slug}"][0]._id`
  const result = await client.fetch(query)
  return !!result
}

// Upload image to Sanity
async function uploadImage(path: string, filename: string): Promise<string | null> {
  try {
    // Note: In production, you'd read the actual file
    // For now, we'll use external URLs or placeholder
    console.log(`  📷 Would upload image: ${filename} from ${path}`)
    return null
  } catch (error) {
    console.error(`  ❌ Failed to upload image ${filename}:`, error)
    return null
  }
}

// ============== HOME PAGE MIGRATION ==============
async function migrateHomePage(dryRun: boolean = false) {
  console.log('\n🏠 Migrating HOME page...\n')

  const pageData = {
    _type: 'page',
    title: 'Khaled Momani — AI Systems Engineer & Designer',
    slug: { current: 'home' },
    pageType: 'home',
    
    // Full SEO data from page.tsx
    metaTitle: 'Khaled Momani — AI Systems Engineer & Designer',
    metaDescription: 'Khaled Momani — AI Systems Engineer and Designer based in San Antonio, TX. Building Shezzi, a locally-sovereign multi-model AI system on consumer hardware. Available for hire.',
    ogImage: {
      _type: 'image',
      url: '/og-default.png',
    },
    
    publishedAt: new Date().toISOString(),
    isActive: true,
  }

  debug('Home Page Data', pageData)

  // Check if exists
  const exists = await documentExists('page', 'home')
  if (exists) {
    console.log('  ⚠️  Home page already exists in Sanity')
    const shouldUpdate = process.argv.includes('--force')
    if (!shouldUpdate) {
      console.log('  💡 Use --force to update existing page')
      return
    }
  }

  if (dryRun) {
    console.log('  🧪 DRY RUN: Would create home page')
    return
  }

  try {
    const result = await client.createOrReplace({ ...pageData, _id: 'page-home' })
    console.log(`  ✅ Created home page: ${result._id}`)
    
    // Create page sections
    await migrateHomeSections(dryRun)
    
  } catch (error) {
    console.error('  ❌ Failed to create home page:', error)
    throw error
  }
}

// Migrate home page sections
async function migrateHomeSections(dryRun: boolean = false) {
  console.log('\n  🧩 Creating Home Page Sections...')

  // Hero Section
  const heroSection = {
    _type: 'hero',
    title: 'Khaled Momani',
    subtitle: 'AI Systems Engineer & Designer',
    backgroundAnimation: 'mycelium',
  }

  debug('Hero Section', heroSection)

  if (!dryRun) {
    try {
      const hero = await client.createOrReplace({ ...heroSection, _id: 'hero-home' })
      console.log(`    ✅ Hero: ${hero._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create hero:', error)
    }
  }

  // Banner Section
  const bannerSection = {
    _type: 'banner',
    title: 'I Made this UI',
    variant: 'home',
    description: 'Explore UI design projects and resources',
    projectImages: [
      {
        _type: 'image',
        url: '/ProjectThumbnails/2-UIWireFramingCram.webp',
        alt: 'UI Project 2 - Wireframing CRM',
        link: 'https://www.behance.net/gallery/220356837/Project-Name',
      },
      {
        _type: 'image',
        url: '/ProjectThumbnails/3-UIPrototypingAndAnimation.webp',
        alt: 'UI Project 3 - Prototyping and Animation',
        link: 'https://www.behance.net/gallery/222677953/Project-Name',
      },
    ],
    buttonText: 'Go to Project',
    buttonLink: '/designtocode',
  }

  debug('Banner Section', bannerSection)

  if (!dryRun) {
    try {
      const banner = await client.createOrReplace({ ...bannerSection, _id: 'banner-home' })
      console.log(`    ✅ Banner: ${banner._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create banner:', error)
    }
  }

  // Dropdown2 Sections (Figma, Cursor, Deployment)
  const dropdownSections = [
    {
      _type: 'dropdown2',
      _id: 'dropdown2-figma',
      title: 'Figma',
      iconComponent: 'FFigma',
      items: [
        { label: 'Quick Rundown', url: 'https://www.youtube.com/watch?v=uaO6YY0T1mg', iconComponent: 'RLBIconVideo' },
        { label: 'Components1', url: 'https://www.youtube.com/watch?v=gDbNZ8s-yrA', iconComponent: 'RLBIconVideo' },
        { label: 'Components2', url: 'https://www.youtube.com/watch?v=k74IrUNaJVk', iconComponent: 'RLBIconVideo' },
        { label: 'Prototyping', url: 'https://www.youtube.com/watch?v=1ucLq6JTxac', iconComponent: 'RLBIconVideo' },
        { label: 'Animation', url: 'https://www.youtube.com/watch?v=02fO4qVnbc0', iconComponent: 'RLBIconVideo' },
        { label: 'Comprehensive Rundown', url: 'https://www.youtube.com/watch?v=HoKD1qIcchQ', iconComponent: 'RLBIconVideo' },
        { label: 'Best Practices 1', url: 'https://www.figma.com/best-practices/', iconComponent: 'RLBIconReading' },
        { label: 'Best Practices 2', url: 'https://www.youtube.com/watch?v=NcQneN8zt5I', iconComponent: 'RLBIconVideo' },
        { label: 'Best Practices 3', url: 'https://www.youtube.com/watch?v=1odqpkfkDL8', iconComponent: 'RLBIconVideo' },
      ],
    },
    {
      _type: 'dropdown2',
      _id: 'dropdown2-cursor',
      title: 'Cursor AI',
      iconComponent: 'FCursor',
      items: [
        { label: 'CursorAI', url: 'https://cursor.sh', iconComponent: 'RLBIconCode' },
        { label: 'Next.js', url: 'https://nextjs.org', iconComponent: 'RLBIconCode' },
        { label: 'CursorFigmaMCP', url: '#', iconComponent: 'RLBIconCode' },
      ],
    },
    {
      _type: 'dropdown2',
      _id: 'dropdown2-deployment',
      title: 'Deployment',
      iconComponent: 'FNextVercel',
      items: [
        { label: 'Vercel', url: 'https://vercel.com', iconComponent: 'RLBIconCode' },
        { label: 'Next.JS', url: 'https://nextjs.org', iconComponent: 'RLBIconCode' },
        { label: 'Figma Sites', url: 'https://sites.figma.com', iconComponent: 'RLBIconCode' },
        { label: 'Github Pages', url: 'https://pages.github.com', iconComponent: 'RLBIconCode' },
      ],
    },
  ]

  for (const section of dropdownSections) {
    debug(`Dropdown2: ${section.title}`, section)
    
    if (!dryRun) {
      try {
        const result = await client.createOrReplace(section)
        console.log(`    ✅ Dropdown2 ${section.title}: ${result._id}`)
      } catch (error) {
        console.error(`    ❌ Failed to create dropdown2 ${section.title}:`, error)
      }
    }
  }

  console.log('  ✨ Home page sections complete!')
}

// ============== ABOUT PAGE MIGRATION ==============
async function migrateAboutPage(dryRun: boolean = false) {
  console.log('\n👤 Migrating ABOUT page...\n')

  const pageData = {
    _type: 'page',
    title: 'About — Khaled Momani',
    slug: { current: 'about' },
    pageType: 'about',
    
    // SEO data
    metaTitle: 'About — Khaled Momani',
    metaDescription: 'Learn about Khaled Momani, AI Systems Engineer and Designer. Design philosophy, process, and background.',
    
    publishedAt: new Date().toISOString(),
    isActive: true,
  }

  debug('About Page Data', pageData)

  const exists = await documentExists('page', 'about')
  if (exists && !process.argv.includes('--force')) {
    console.log('  ⚠️  About page already exists. Use --force to update.')
    return
  }

  if (dryRun) {
    console.log('  🧪 DRY RUN: Would create about page')
    return
  }

  try {
    const result = await client.createOrReplace({ ...pageData, _id: 'page-about' })
    console.log(`  ✅ Created about page: ${result._id}`)
    
    await migrateAboutSections(dryRun)
    
  } catch (error) {
    console.error('  ❌ Failed to create about page:', error)
    throw error
  }
}

// Migrate about page sections
async function migrateAboutSections(dryRun: boolean = false) {
  console.log('\n  🧩 Creating About Page Sections...')

  // Banner
  const bannerSection = {
    _type: 'banner',
    _id: 'banner-about',
    title: 'About',
    variant: 'general',
    description: "It's not all there. There's a lot in the middle that I can't put into a portfolio. My doctor questions how I'm alive every time I visit. I pop up on my friends sporadically and make their day interesting. If you decide to work with me you might get the details. For now, just know: I'm really living... and allergic to avocado. Please for the love of god keep the avocado away from the potluck.",
  }

  debug('About Banner', bannerSection)

  if (!dryRun) {
    try {
      const banner = await client.createOrReplace(bannerSection)
      console.log(`    ✅ Banner: ${banner._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create banner:', error)
    }
  }

  // Bio Dropdown
  const bioSection = {
    _type: 'dropdown1',
    _id: 'dropdown1-bio',
    title: 'BIO',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "I started my higher education in psychology, where I learned that the biggest stressor for people struggling with mental illness wasn't just their condition—it was their socioeconomic status. The main roadblock to getting help wasn't treatment; it was survival. I switched to civil engineering because I wanted to make a real difference, and psychology's existing tools didn't feel like enough. If I could create accessible, affordable housing with features that helped people manage tasks they struggled with—whether due to physical or mental disabilities—I could do more for them than I ever could as a psychiatrist."
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "But engineering had its own roadblocks. I failed calculus five times, and it kept me from moving forward in the major. Instead, I filled my schedule with design and art classes—and I had the time of my life. My professors saw it too, encouraging me to change fields, telling me engineering didn't seem like the right fit. That made me rethink everything. I needed a career where I could help people while doing what I loved. That's when I found UI design. If I could make work and daily life easier for the most disadvantaged, I could make just as much of an impact as I would have designing accessible housing."
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "After finally passing calculus with an A. I left college and took an alternative route, learning UI design on my own. I worked in construction for a while, doing CAD design and managing teams, which gave me the confidence to grow as a creator. Then I moved into freelance work, creating branding and marketing assets for food trucks across Houston. That led me to H-Town Social, where I took on every role the company needed—graphic design, social media strategy, video production—until I was leading a team. But I realized I enjoyed setting up the operation more than the daily work. I loved taking employee feedback, implementing productivity tools, and automating managerial tasks. That's what pushed me to transition from marketing to software development. I wanted to build the systems that make work easier, experience different industries, and help the most disadvantaged people live better lives. I eventually got to the point where I wanted to create the ultimate DIY workspace. A lot of people couldn't afford my services as a web designer and app developer. I decided to make app development as easy as WYSWG web design. This eventually led to a deep dive in system architecture and AI governance structures. I wanted to build something that anyone could use, regardless of their means."
          }
        ]
      }
    ],
    placeholderIcon: 'ProcessIcon', // Or use image path
  }

  debug('Bio Section', bioSection)

  if (!dryRun) {
    try {
      const bio = await client.createOrReplace(bioSection)
      console.log(`    ✅ Bio: ${bio._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create bio:', error)
    }
  }

  // Process Blocks
  const processBlocks = [
    {
      _type: 'processBlock',
      _id: 'processblock-plasticity',
      title: 'Plasticity',
      icon: 'PRPlasticity',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: "Design should move. It should adapt, shift, and grow. I love the concept of design plasticity—the ability to reshape without losing structure. Inspired by space plasticity in architecture, I design with fluidity in mind. Branding that bends without breaking. Layouts that evolve. Systems that stay strong, no matter how they change. But more than that, design plasticity breaks closed thinking. In engineering, the difference between asking, 'How do we get across the water?' instead of 'How do we build a bridge?' opens up new solutions. Design should focus on the problem statement, not the assumed answer. The best ideas come from questioning the question itself."
            }
          ]
        }
      ],
    },
    {
      _type: 'processBlock',
      _id: 'processblock-insideout',
      title: 'InsideOut',
      icon: 'PRInsideOut',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: "Good design isn't just flexible—it's informed. Every design choice adds to a system of operations. That system should serve people, not the other way around. But corporate structures design from a distance, shaping policies for a world that doesn't exist. I try to understand the needs of the user. If I'm making a menu, I get behind the cash register, take orders, and cut unnecessary steps. When I worked in radio, I got behind the mic and made my own track—not just to understand the process, but to see what was worth showcasing, what added value, and how to shape a message. But immersion isn't always enough. When I create a system, I know its functions inside and out—a new user does not. That's when real-world observation matters more than personal experience. Don't wait for a review, a secondhand account, or a formal report. Watch where people look first. Listen to what they actually say. Design isn't about dictating how something should work—it's about seeing how it does. The best solutions come from the inside, not from the top down."
            }
          ]
        }
      ],
    },
    {
      _type: 'processBlock',
      _id: 'processblock-automation',
      title: 'Automation',
      icon: 'PRAutomation',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: "Automation should aid people, not replace them. When AI took off in 2023, companies rushed to automate the art itself instead of the work around it—marketing, sales funnels, funding. They stripped out the part people loved most, gutting creative teams to churn out eerie, half-baked production. Automation should start by removing the least enjoyable tasks. Happy people are productive people. It should eliminate inefficiencies—task switching, wait time, defects, handoff errors—not human expertise. A company's most valuable resource isn't production; it's people. Layoffs break trust. Experience and loyalty can't be restored once lost. When people are in constant fear of being replaced, with their stability hanging by a thread, they can't perform at their best. Productivity isn't about pushing people harder—it's about designing better systems. If automation reduces workload, it shouldn't be used to cut costs but to reinvest in people and scale production. Design isn't just about output; it's about creating an environment where people can live their best lives."
            }
          ]
        }
      ],
    },
  ]

  for (const block of processBlocks) {
    debug(`Process Block: ${block.title}`, block)
    
    if (!dryRun) {
      try {
        const result = await client.createOrReplace(block)
        console.log(`    ✅ Process Block ${block.title}: ${result._id}`)
      } catch (error) {
        console.error(`    ❌ Failed to create process block ${block.title}:`, error)
      }
    }
  }

  console.log('  ✨ About page sections complete!')
}

// ============== ART PAGE MIGRATION ==============
async function migrateArtPage(dryRun: boolean = false) {
  console.log('\n🎨 Migrating ART page...\n')

  const pageData = {
    _type: 'page',
    title: 'Art — Khaled Momani',
    slug: { current: 'art' },
    pageType: 'art',
    
    // SEO data
    metaTitle: 'Art — Khaled Momani',
    metaDescription: "Emotional art projects, NFTs, coloring books, and creative experiments by Khaled Momani.",
    
    publishedAt: new Date().toISOString(),
    isActive: true,
  }

  debug('Art Page Data', pageData)

  const exists = await documentExists('page', 'art')
  if (exists && !process.argv.includes('--force')) {
    console.log('  ⚠️  Art page already exists. Use --force to update.')
    return
  }

  if (dryRun) {
    console.log('  🧪 DRY RUN: Would create art page')
    return
  }

  try {
    const result = await client.createOrReplace({ ...pageData, _id: 'page-art' })
    console.log(`  ✅ Created art page: ${result._id}`)
    
    await migrateArtSections(dryRun)
    
  } catch (error) {
    console.error('  ❌ Failed to create art page:', error)
    throw error
  }
}

// Migrate art page sections
async function migrateArtSections(dryRun: boolean = false) {
  console.log('\n  🧩 Creating Art Page Sections...')

  // Banner
  const bannerSection = {
    _type: 'banner',
    _id: 'banner-art',
    title: 'Art',
    variant: 'general',
    description: "Emotions don't always present themselves as organized layers, style sheets, and file trees. They still lay the groundwork for everything we do. I spent a lot of time figuring out when it was okay to share emotions. 10 years ago interacting with me was like an entire dependency was missing. Everyone lays everything between the lines and expects you to know. There was a world of context missing. Then on top of that everyone just expects you not to say exactly what's on your mind and they call it being polite. They set a bunch of unspoken rules for how to act and what to do. This page is the only acceptable place that I found out it was okay to break all of those rules. It's glorified and appreciated when you break the rules here. I don't care if my art ever sells. It would be nice and validating if other people felt it was relatable enough to spend money on. But it's messy. It's where I dig my fingers in and learn like we do as babies. It's more important than anything else I create.",
  }

  debug('Art Banner', bannerSection)

  if (!dryRun) {
    try {
      const banner = await client.createOrReplace(bannerSection)
      console.log(`    ✅ Banner: ${banner._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create banner:', error)
    }
  }

  // Art Projects
  const artProjects = [
    {
      _type: 'artProject',
      _id: 'artproject-freetherapy',
      title: 'Free Therapy',
      description: "Redesigning worksheets my therapist gave me because it's the only way I'd actually read them.",
      iconComponent: 'FreeTherapy',
      link: 'https://drive.google.com/drive/folders/1EzhZ1lYM_W7ddqVc5WPH0Y3xRhg9VwxP',
      iconPosition: 'left',
    },
    {
      _type: 'artProject',
      _id: 'artproject-8thnlucas',
      title: '8th And Lucas',
      description: 'Collaboration with 8th and Lucas St',
      iconComponent: 'EighthNLucas',
      link: 'https://opensea.io/collection/8thandlucas',
      iconPosition: 'right',
    },
    {
      _type: 'artProject',
      _id: 'artproject-lilbiscoff',
      title: 'Lil Biscoff',
      description: 'I worked at a radio station and took part in the whole process',
      iconComponent: 'LilBiscoff',
      link: 'https://distrokid.com/hyperfollow/lilbiscoff/mr-uber',
      iconPosition: 'left',
    },
    {
      _type: 'artProject',
      _id: 'artproject-coloring',
      title: 'Coloring',
      description: 'I wrote a series of essays in college then made it into a coloring book ten years later',
      iconComponent: 'Coloring',
      link: 'https://www.amazon.com/dp/B0CHCPGYNB',
      iconPosition: 'right',
    },
    {
      _type: 'artProject',
      _id: 'artproject-tackygargbage',
      title: 'Art Project 5',
      description: 'The tacky garbage collection is where I sell my designs on merch. It was the first idea I had for a website.',
      iconComponent: 'TackyGarbageBig',
      link: '/tg',
      iconPosition: 'left',
    },
  ]

  for (const project of artProjects) {
    debug(`Art Project: ${project.title}`, project)
    
    if (!dryRun) {
      try {
        const result = await client.createOrReplace(project)
        console.log(`    ✅ Art Project ${project.title}: ${result._id}`)
      } catch (error) {
        console.error(`    ❌ Failed to create art project ${project.title}:`, error)
      }
    }
  }

  console.log('  ✨ Art page sections complete!')
}

// ============== PORTFOLIO PAGE MIGRATION ==============
async function migratePortfolioPage(dryRun: boolean = false) {
  console.log('\n💼 Migrating PORTFOLIO page...\n')

  const pageData = {
    _type: 'page',
    title: 'Portfolio | Khaled Momani — AI Systems Engineer & Designer',
    slug: { current: 'portfolio' },
    pageType: 'portfolio',
    
    // Full SEO data
    metaTitle: 'Portfolio | Khaled Momani — AI Systems Engineer & Designer',
    metaDescription: 'AI systems research, UI design, branding, and marketing work by Khaled Momani. Includes Shezzi, a locally-sovereign AI system built on consumer hardware.',
    ogImage: {
      _type: 'image',
      url: '/og-default.png',
    },
    
    publishedAt: new Date().toISOString(),
    isActive: true,
  }

  debug('Portfolio Page Data', pageData)

  const exists = await documentExists('page', 'portfolio')
  if (exists && !process.argv.includes('--force')) {
    console.log('  ⚠️  Portfolio page already exists. Use --force to update.')
    return
  }

  if (dryRun) {
    console.log('  🧪 DRY RUN: Would create portfolio page')
    return
  }

  try {
    const result = await client.createOrReplace({ ...pageData, _id: 'page-portfolio' })
    console.log(`  ✅ Created portfolio page: ${result._id}`)
    
    await migratePortfolioSections(dryRun)
    
  } catch (error) {
    console.error('  ❌ Failed to create portfolio page:', error)
    throw error
  }
}

// Migrate portfolio page sections
async function migratePortfolioSections(dryRun: boolean = false) {
  console.log('\n  🧩 Creating Portfolio Page Sections...')

  // Banner
  const bannerSection = {
    _type: 'banner',
    _id: 'banner-portfolio',
    title: 'Portfolio',
    variant: 'general',
    description: "You know that old lady that swallowed a fly, and then it led to swallowing a horse and dying. I think I'm at my, cow chasing dog, now and I'm hoping the horse doesn't kill me. I somehow went from wanting to make flat icons for apps, to stickers, to my own clothing line, to food trucks, to marketing, to CRMs, to apps for developers, to an incredible fully autonomous, AI governance structure, with feelings, that gives ChatGPT a run for its money. AI systems, interfaces, and brands. Independent research in AI architecture, locally-sovereign systems, and agent tooling — alongside client work in UI, branding, and marketing.",
  }

  debug('Portfolio Banner', bannerSection)

  if (!dryRun) {
    try {
      const banner = await client.createOrReplace(bannerSection)
      console.log(`    ✅ Banner: ${banner._id}`)
    } catch (error) {
      console.error('    ❌ Failed to create banner:', error)
    }
  }

  // Portfolio Projects
  const portfolioProjects: Array<{
    _type: 'portfolioProject'
    _id: string
    title: string
    description: string
    tags: string[]
    featured: boolean
    thumbnail?: string
  }> = [
    {
      _type: 'portfolioProject',
      _id: 'portfolioproject-shezzi',
      title: 'Shezzi - Personally Owned AI',
      description: "Most AI systems are built to run on infrastructure you don't own. Shezzi was built on the assumption that intelligence shouldn't require it. Shezzi is a locally-run, multi-model AI system designed around a single constraint: do more with less.",
      tags: ['AI Systems', 'Full Stack', 'Research'],
      featured: true,
      thumbnail: '/og-default.png',
    },
    {
      _type: 'portfolioProject',
      _id: 'portfolioproject-heirloom',
      title: 'Heirloom - Mental Health Companion',
      description: 'Heirloom is a web app created by the developers at PRJCT Lazrus. An app that worked hand in tandem with the users therapist to document mood fluctuation and provide resources for mental health.',
      tags: ['UI Design', 'Branding', 'Health Tech'],
      featured: true,
    },
    {
      _type: 'portfolioProject',
      _id: 'portfolioproject-designtocode',
      title: 'DesignToCode - Portfolio as Demonstration',
      description: 'After learning about vibe coding and testing the limits of Cursor AI, I was able to explore implementing my projects. As a designer I wanted my portfolio to be a demonstration of my skills.',
      tags: ['UI Design', 'Development', 'Portfolio'],
      featured: false,
    },
  ]

  for (const project of portfolioProjects) {
    debug(`Portfolio Project: ${project.title}`, project)
    
    if (!dryRun) {
      try {
        const result = await client.createOrReplace(project)
        console.log(`    ✅ Portfolio Project ${project.title}: ${result._id}`)
      } catch (error) {
        console.error(`    ❌ Failed to create portfolio project ${project.title}:`, error)
      }
    }
  }

  console.log('  ✨ Portfolio page sections complete!')
}

// ============== MAIN ==============
async function main() {
  const args = process.argv.slice(2)
  const page = args[0]
  const dryRun = args.includes('--dry-run')
  const debugMode = args.includes('--debug')

  console.log('╔════════════════════════════════════════════════╗')
  console.log('║      SANITY PAGE MIGRATION TOOL                ║')
  console.log('╚════════════════════════════════════════════════╝')

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('\n❌ ERROR: SANITY_API_WRITE_TOKEN environment variable is required')
    console.log('\nSet it with:')
    console.log('  export SANITY_API_WRITE_TOKEN=your_token_here')
    console.log('\nGet your token from: https://www.sanity.io/manage → API → Tokens')
    process.exit(1)
  }

  if (!page) {
    console.log('\n📖 Usage:')
    console.log('  npx tsx scripts/migrate-page.ts <page_name> [options]')
    console.log('\nAvailable pages:')
    console.log('  home       - Migrate home page with hero, banner, resources')
    console.log('  about      - Migrate about page with bio, process blocks')
    console.log('  art        - Migrate art page with projects')
    console.log('  portfolio  - Migrate portfolio page with projects')
    console.log('\nOptions:')
    console.log('  --dry-run    Preview changes without uploading')
    console.log('  --debug      Show detailed debug info')
    console.log('  --force      Update existing documents')
    process.exit(0)
  }

  console.log(`\n📋 Mode: ${dryRun ? 'DRY RUN (preview only)' : 'LIVE MIGRATION'}`)
  console.log(`🔧 Debug: ${debugMode ? 'ON' : 'OFF'}`)
  console.log(`📄 Page: ${page}`)

  try {
    switch (page) {
      case 'home':
        await migrateHomePage(dryRun)
        break
      case 'about':
        await migrateAboutPage(dryRun)
        break
      case 'art':
        await migrateArtPage(dryRun)
        break
      case 'portfolio':
        await migratePortfolioPage(dryRun)
        break
      default:
        console.error(`\n❌ Unknown page: ${page}`)
        console.log('Available: home, about, art, portfolio')
        process.exit(1)
    }

    console.log('\n✅ Migration complete!')
    console.log('\nNext steps:')
    console.log('  1. Check the content in Sanity Studio')
    console.log('  2. Build the page sections')
    console.log('  3. Test the page renders correctly')
    console.log('  4. Delete old page.tsx when ready')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
