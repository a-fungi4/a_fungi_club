# Sanity CMS Integration Plan for A Fungi Club

## Context

A Fungi Club is a Next.js 16+ portfolio website with multiple pages, reusable UI components, and rich content. The goal is to enable no-code content management via Sanity while staying within Sanity's **free tier** and minimizing API calls (only when edits are made, not on every visit).

---

## Project Structure Inventory

### Pages (13 total)
- `/` → Home (redirects to `/home`)
- `/home` → Hero, resources, project links
- `/about` → Bio, process (Plasticity, InsideOut, Automation)
- `/art` → Art project showcase
- `/portfolio` → Portfolio with interactive elements
- `/shezzi` → AI system project page
- `/heirloom` → Mental health companion project
- `/designtocode` → Figma-to-code demonstration
- `/tg` → Tacky Garbage (merch) - under construction
- `/automationworkshop` → Automation workshop
- `/misc` → Miscellaneous content
- `/component-gallery` → Component showcase
- `/prototype-test` → Prototype testing

### Key Components (45+ React components)
**Layout & Navigation:**
- `NavBar`, `MobileNavBar`, `NavItem`, `Logo`

**Content Blocks:**
- `Banner`, `HeroSection`, `HPTextbox`, `HPThumbnail`, `HPButton`
- `Dropdown1`, `Dropdown2`, `Dropdown3`, `Dropdown4`, `MiniDropdown`
- `DropdownMisc`

**Interactive:**
- `MyceliumAnimation`, `Carousel`, `CarouselCard`, `ProductCarousel`
- `CompanionGallery`, `CompanionViewer`
- `ProcessSelectionDropdown`

**Commerce:**
- `ProductCard`, `ProductExpanded`, `ProductLargePhotoOverlay`
- `CartContext`, `CartItem`, `MiniCart`, `Checkout`, `CartAndStatus`, `OrderStatus`, `OrderSuccessful`

**Portfolio:**
- `ArtProject`, `HighlightedProject`, `OngoingProjects`
- `ResourceLinkButton`, `ContactForm`

**Icons (43 SVG components):**
- Navigation: `AboutIcon`, `ArtIcon`, `AnalyticsIcon`
- Process: `PRPlasticity`, `PRInsideOut`, `PRAutomation`
- Brand: `BrandmarkIcon`, `ShezziBrandmarkIcon`, `ShezziProjectPageLogo`
- Art: `FreeTherapy`, `EighthNLucas`, `LilBiscoff`, `Coloring`, `TackyGarbageBig`
- Portfolio: `DesignToCodeThumbnail`, `HeirloomThumbnail`, `Companion1-10`
- Social: `GithubIcon`, `LinkedinIcon`, `InstagramIcon`, `BehanceIcon`
- Resource: `FFigma`, `FCursor`, `FNextVercel`, `RLBIconVideo`, `RLBIconReading`, `RLBIconCode`
- Mycelium: `Mycelium1-4`

---

## Sanity Free Tier Limits (What We're Working With)

| Feature | Free Tier Limit |
|---------|-----------------|
| Users | 3 admin roles |
| API Requests | 100M/month |
| Bandwidth | 10GB/month |
| Dataset Size | 10GB |
| Sanity CDN | ✅ Included |
| Real-time Updates | ✅ Included |
| GraphQL API | ✅ Included |
| GROQ API | ✅ Unlimited |
| Custom Input Components | ✅ Included |
| Webhooks | ✅ Included |

### Strategy for API-Call-Free Content Delivery

**Key Principle:** Use Next.js Static Site Generation (SSG) with Incremental Static Regeneration (ISR) or on-demand revalidation via webhooks. This means:
- Sanity API is only called during `next build` or when a webhook triggers revalidation
- Visitors NEVER hit the Sanity API - they get static HTML from Vercel's CDN
- API calls only happen when YOU edit content in Sanity Studio

---

## Phase 1: Initial Setup (Free Tier Compliant)

### Step 1.1: Create Sanity Project

```bash
# Install Sanity CLI globally (one-time)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project
sanity init
```

**Selections:**
- **Template:** Clean project with no pre-defined schemas
- **Project Plan:** Free
- **Dataset:** `production` (public)
- **Output path:** `./sanity` (keep it separate from Next.js code)

### Step 1.2: Install Dependencies

```bash
# In your Next.js project root
npm install sanity @sanity/client @sanity/image-url next-sanity
npm install --save-dev @sanity/types
```

### Step 1.3: Create Environment Variables

Add to `.env.local`:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-01
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token_only_for_webhooks
```

Get tokens from: https://www.sanity.io/manage → Project → API → Tokens

### Step 1.4: Configure Sanity Client

Create `/src/lib/sanity.ts`:

```typescript
import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We use static generation, not real-time CDN
})

// For image URLs
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

---

## Phase 2: Schema Design for No-Code Page Building

### Core Philosophy

Create **reusable sections** that can be assembled into any page. Editors in Sanity Studio can:
1. Create new pages
2. Select page type (Home, About, Art, Portfolio, Project, Generic)
3. Add/arrange sections from a component library
4. Edit content without touching code

### Step 2.1: Create Schema Files

Create `/sanity/schemaTypes/index.ts`:

```typescript
import { pageType } from './page'
import { pageSectionType } from './pageSection'
import { siteSettingsType } from './siteSettings'
import { navigationType } from './navigation'
import { bannerType } from './banner'
import { heroType } from './hero'
import { bioType } from './bio'
import { artProjectType } from './artProject'
import { portfolioProjectType } from './portfolioProject'
import { dropdownContentType } from './dropdownContent'
import { resourceLinkType } from './resourceLink'
import { processBlockType } from './processBlock'

export const schemaTypes = [
  pageType,
  pageSectionType,
  siteSettingsType,
  navigationType,
  bannerType,
  heroType,
  bioType,
  artProjectType,
  portfolioProjectType,
  dropdownContentType,
  resourceLinkType,
  processBlockType,
]
```

### Step 2.2: Page Schema (The Master Document)

Create `/sanity/schemaTypes/page.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Art Gallery', value: 'art' },
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Project Page', value: 'project' },
          { title: 'Generic', value: 'generic' },
        ],
      },
      initialValue: 'generic',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Browser tab title',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'reference', to: { type: 'pageSection' } }
      ],
      description: 'Add and arrange sections for this page (drag to reorder)',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      pageType: 'pageType',
      isPublished: 'isPublished',
    },
    prepare({ title, slug, pageType, isPublished }) {
      return {
        title: `${title} ${isPublished ? '✅' : '⚠️' }`,
        subtitle: `/${slug} • ${pageType}`,
      }
    },
  },
})
```

### Step 2.3: Page Section Schema (Reusable Components)

Create `/sanity/schemaTypes/pageSection.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const SECTION_TYPES = [
  { title: 'Hero Section', value: 'hero' },
  { title: 'Banner', value: 'banner' },
  { title: 'Bio/Dropdown', value: 'bio' },
  { title: 'Art Project Grid', value: 'artGrid' },
  { title: 'Portfolio Showcase', value: 'portfolio' },
  { title: 'Process Blocks', value: 'process' },
  { title: 'Resource Links', value: 'resources' },
  { title: 'Text Content', value: 'text' },
  { title: 'Image Gallery', value: 'gallery' },
  { title: 'Custom HTML', value: 'custom' },
] as const

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Page Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for this section',
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: SECTION_TYPES,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Hero-specific fields
    defineField({
      name: 'heroContent',
      title: 'Hero Content',
      type: 'reference',
      to: { type: 'hero' },
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    // Banner-specific fields
    defineField({
      name: 'bannerContent',
      title: 'Banner Content',
      type: 'reference',
      to: { type: 'banner' },
      hidden: ({ parent }) => parent?.sectionType !== 'banner',
    }),
    // Bio-specific fields
    defineField({
      name: 'bioContent',
      title: 'Bio Content',
      type: 'reference',
      to: { type: 'bio' },
      hidden: ({ parent }) => parent?.sectionType !== 'bio',
    }),
    // Process-specific fields
    defineField({
      name: 'processBlocks',
      title: 'Process Blocks',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'processBlock' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'process',
    }),
    // Art Grid - references art projects
    defineField({
      name: 'artProjects',
      title: 'Art Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'artProject' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'artGrid',
    }),
    // Portfolio - references portfolio projects
    defineField({
      name: 'portfolioProjects',
      title: 'Portfolio Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'portfolioProject' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'portfolio',
    }),
    // Resources - links and dropdowns
    defineField({
      name: 'resourceLinks',
      title: 'Resource Links',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'resourceLink' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'resources',
    }),
    // Simple text content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => !['text', 'custom'].includes(parent?.sectionType),
    }),
    // Gallery images
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' },
        ],
      }],
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),
    // Custom CSS class for styling
    defineField({
      name: 'customClass',
      title: 'Custom CSS Class',
      type: 'string',
      description: 'Optional CSS class for custom styling',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
    },
    prepare({ title, sectionType }) {
      const typeLabel = SECTION_TYPES.find(t => t.value === sectionType)?.title || sectionType
      return {
        title: title,
        subtitle: typeLabel,
      }
    },
  },
})
```

### Step 2.4: Component-Specific Schemas

#### Banner Schema (`/sanity/schemaTypes/banner.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'General', value: 'general' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'projectImages',
      title: 'Project Thumbnails',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
          { name: 'link', title: 'Link URL', type: 'url' },
        ],
      }],
    }),
  ],
})
```

#### Hero Schema (`/sanity/schemaTypes/hero.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'backgroundAnimation',
      title: 'Background Animation',
      type: 'string',
      options: {
        list: [
          { title: 'Mycelium', value: 'mycelium' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'mycelium',
    }),
  ],
})
```

#### Bio Schema (`/sanity/schemaTypes/bio.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const bioType = defineType({
  name: 'bio',
  title: 'Bio Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'BIO',
    }),
    defineField({
      name: 'content',
      title: 'Bio Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
```

#### Process Block Schema (`/sanity/schemaTypes/processBlock.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const processBlockType = defineType({
  name: 'processBlock',
  title: 'Process Blocks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Process Name',
      type: 'string',
      options: {
        list: [
          { title: 'Plasticity', value: 'Plasticity' },
          { title: 'InsideOut', value: 'InsideOut' },
          { title: 'Automation', value: 'Automation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Plasticity', value: 'PRPlasticity' },
          { title: 'InsideOut', value: 'PRInsideOut' },
          { title: 'Automation', value: 'PRAutomation' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Process Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
```

#### Art Project Schema (`/sanity/schemaTypes/artProject.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const artProjectType = defineType({
  name: 'artProject',
  title: 'Art Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'iconComponent',
      title: 'Icon Component',
      type: 'string',
      options: {
        list: [
          { title: 'Free Therapy', value: 'FreeTherapy' },
          { title: '8th N Lucas', value: 'EighthNLucas' },
          { title: 'Lil Biscoff', value: 'LilBiscoff' },
          { title: 'Coloring', value: 'Coloring' },
          { title: 'Tacky Garbage', value: 'TackyGarbageBig' },
        ],
      },
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
```

#### Portfolio Project Schema (`/sanity/schemaTypes/portfolioProject.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const portfolioProjectType = defineType({
  name: 'portfolioProject',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'UI/UX', value: 'ui' },
          { title: 'Branding', value: 'branding' },
          { title: 'Development', value: 'dev' },
          { title: 'AI Systems', value: 'ai' },
        ],
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
```

#### Resource Link Schema (`/sanity/schemaTypes/resourceLink.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const resourceLinkType = defineType({
  name: 'resourceLink',
  title: 'Resource Links',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'RLBIconVideo' },
          { title: 'Reading', value: 'RLBIconReading' },
          { title: 'Code', value: 'RLBIconCode' },
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Figma', value: 'figma' },
          { title: 'Cursor AI', value: 'cursor' },
          { title: 'Deployment', value: 'deployment' },
        ],
      },
    }),
    defineField({
      name: 'isMiniDropdown',
      title: 'Is Mini Dropdown',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dropdownContent',
      title: 'Dropdown Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => !parent?.isMiniDropdown,
    }),
  ],
})
```

#### Site Settings Schema (`/sanity/schemaTypes/siteSettings.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Image',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'behance', title: 'Behance', type: 'url' },
      ],
    }),
  ],
})
```

#### Navigation Schema (`/sanity/schemaTypes/navigation.ts`)

```typescript
import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      initialValue: 'Main Navigation',
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'link', title: 'Link', type: 'string' },
          { name: 'icon', title: 'Icon Component', type: 'string' },
          { name: 'isExternal', title: 'External Link', type: 'boolean' },
        ],
      }],
    }),
  ],
})
```

---

## Phase 3: Next.js Data Fetching (SSG Pattern)

### Step 3.1: Create Data Fetching Utilities

Create `/src/lib/sanity.queries.ts`:

```typescript
import { groq } from 'next-sanity'

// Fetch a page by slug with all sections
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    pageType,
    metaTitle,
    metaDescription,
    ogImage,
    sections[]-> {
      _id,
      title,
      sectionType,
      customClass,
      // Banner
      bannerContent-> {
        title,
        variant,
        description,
        projectImages[] {
          asset-> { _id, url },
          alt,
          link
        }
      },
      // Hero
      heroContent-> {
        title,
        subtitle,
        backgroundAnimation
      },
      // Bio
      bioContent-> {
        title,
        content,
        headshot {
          asset-> { _id, url }
        }
      },
      // Process
      processBlocks[]-> {
        title,
        icon,
        content
      },
      // Art Projects
      artProjects[]-> {
        title,
        description,
        iconComponent,
        link,
        iconPosition,
        order
      },
      // Portfolio
      portfolioProjects[]-> {
        title,
        slug,
        category,
        thumbnail {
          asset-> { _id, url }
        },
        shortDescription,
        fullDescription,
        projectLink,
        githubLink,
        featured,
        order
      },
      // Resource Links
      resourceLinks[]-> {
        label,
        url,
        icon,
        category,
        isMiniDropdown,
        dropdownContent
      },
      // Generic content
      content,
      images[] {
        asset-> { _id, url },
        alt,
        caption
      }
    }
  }
`

// Fetch all page slugs for static generation
export const allPagesQuery = groq`
  *[_type == "page" && isPublished == true] {
    slug {
      current
    }
  }
`

// Fetch site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    defaultMetaDescription,
    defaultOgImage {
      asset-> { url }
    },
    contactEmail,
    socialLinks
  }
`

// Fetch navigation
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    items[] {
      label,
      link,
      icon,
      isExternal
    }
  }
`
```

Create `/src/lib/sanity.fetch.ts`:

```typescript
import { client } from './sanity'
import {
  pageBySlugQuery,
  allPagesQuery,
  siteSettingsQuery,
  navigationQuery,
} from './sanity.queries'

// Cache configuration - revalidate every hour by default
// Can be overridden by webhook calls
const DEFAULT_REVALIDATE = 3600

export async function getPageBySlug(slug: string) {
  return client.fetch(pageBySlugQuery, { slug }, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: [`page:${slug}`],
    },
  })
}

export async function getAllPages() {
  return client.fetch(allPagesQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['pages'],
    },
  })
}

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['siteSettings'],
    },
  })
}

export async function getNavigation() {
  return client.fetch(navigationQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['navigation'],
    },
  })
}
```

### Step 3.2: Create Dynamic Page Renderer

Create `/src/components/PageRenderer.tsx`:

```typescript
import React from 'react'
import { HeroSection } from './sections/HeroSection'
import { BannerSection } from './sections/BannerSection'
import { BioSection } from './sections/BioSection'
import { ArtGridSection } from './sections/ArtGridSection'
import { PortfolioSection } from './sections/PortfolioSection'
import { ProcessSection } from './sections/ProcessSection'
import { ResourcesSection } from './sections/ResourcesSection'
import { TextSection } from './sections/TextSection'
import { GallerySection } from './sections/GallerySection'

interface Section {
  _id: string
  sectionType: string
  title: string
  customClass?: string
  [key: string]: any
}

interface PageRendererProps {
  sections: Section[]
}

const sectionComponents: Record<string, React.FC<any>> = {
  hero: HeroSection,
  banner: BannerSection,
  bio: BioSection,
  artGrid: ArtGridSection,
  portfolio: PortfolioSection,
  process: ProcessSection,
  resources: ResourcesSection,
  text: TextSection,
  gallery: GallerySection,
}

export function PageRenderer({ sections }: PageRendererProps) {
  if (!sections || sections.length === 0) {
    return <div>No sections found for this page.</div>
  }

  return (
    <>
      {sections.map((section, index) => {
        const Component = sectionComponents[section.sectionType]
        
        if (!Component) {
          console.warn(`Unknown section type: ${section.sectionType}`)
          return null
        }

        return (
          <Component
            key={section._id}
            data={section}
            index={index}
          />
        )
      })}
    </>
  )
}
```

### Step 3.3: Create Section Components

Create `/src/components/sections/BannerSection.tsx`:

```typescript
import React from 'react'
import Banner from '@/components/Banner'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface BannerSectionProps {
  data: {
    bannerContent?: {
      title: string
      variant: 'home' | 'general'
      description?: string
      projectImages?: Array<{
        asset?: { url: string }
        alt?: string
        link?: string
      }>
    }
    customClass?: string
  }
}

export function BannerSection({ data, customClass }: BannerSectionProps) {
  const { bannerContent } = data
  
  if (!bannerContent) return null

  const { title, variant, description, projectImages } = bannerContent

  return (
    <Banner 
      title={title} 
      variant={variant} 
      className={customClass || 'fullBleed'}
    >
      {description && (
        <div className="Bannerprojectembed1">
          <div className="BannerTextBox" style={{ background: '#151029', borderRadius: 16, padding: 10 }}>
            <p>{description}</p>
          </div>
        </div>
      )}
      {projectImages && projectImages.length > 0 && (
        <div className="bannerProjectsRow">
          {projectImages.map((img, idx) => (
            <a 
              key={idx} 
              href={img.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bannerProjectCard"
            >
              {img.asset?.url && (
                <Image 
                  src={img.asset.url}
                  alt={img.alt || ''}
                  width={400}
                  height={300}
                  className="bannerProjectImage"
                />
              )}
            </a>
          ))}
        </div>
      )}
    </Banner>
  )
}
```

Create `/src/components/sections/BioSection.tsx`:

```typescript
'use client'
import React from 'react'
import Dropdown1 from '@/components/Dropdown1'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

interface BioSectionProps {
  data: {
    bioContent?: {
      title: string
      content: any[]
      headshot?: {
        asset?: { url: string }
      }
    }
  }
}

export function BioSection({ data }: BioSectionProps) {
  const { bioContent } = data
  
  if (!bioContent) return null

  const { title, content, headshot } = bioContent

  const placeholder = headshot?.asset?.url ? (
    <Image
      src={headshot.asset.url}
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
  ) : null

  return (
    <Dropdown1
      title={title}
      content={<PortableText value={content} />}
      placeholder={placeholder}
    />
  )
}
```

Create `/src/components/sections/ArtGridSection.tsx`:

```typescript
import React from 'react'
import ArtProject from '@/components/ArtProject'
import FreeTherapy from '@/components/icons/FreeTherapy'
import EighthNLucas from '@/components/icons/8thNLucas'
import LilBiscoff from '@/components/icons/LilBiscoff'
import Coloring from '@/components/icons/Coloring'
import TackyGarbageBig from '@/components/icons/TackyGarbageBig'

const iconComponents: Record<string, React.FC<any>> = {
  FreeTherapy,
  EighthNLucas,
  LilBiscoff,
  Coloring,
  TackyGarbageBig,
}

interface ArtGridSectionProps {
  data: {
    artProjects?: Array<{
      title: string
      description?: string
      iconComponent?: string
      link?: string
      iconPosition?: 'left' | 'right'
    }>
  }
}

export function ArtGridSection({ data }: ArtGridSectionProps) {
  const { artProjects } = data
  
  if (!artProjects || artProjects.length === 0) return null

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 48, 
      marginTop: 48, 
      marginBottom: 48 
    }}>
      {artProjects.map((project, idx) => {
        const IconComponent = project.iconComponent 
          ? iconComponents[project.iconComponent] 
          : null

        return (
          <ArtProject
            key={idx}
            title={project.title}
            description={project.description || ''}
            svg={IconComponent ? <IconComponent /> : null}
            link={project.link || '#'}
            iconPosition={project.iconPosition || 'left'}
          />
        )
      })}
    </div>
  )
}
```

Create `/src/components/sections/ProcessSection.tsx`:

```typescript
'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProcessSelectionDropdown from '@/components/ProcessSelectionDropdown'
import PRPlasticity from '@/components/icons/PRPlasticity'
import PRInsideOut from '@/components/icons/PRInsideOut'
import PRAutomation from '@/components/icons/PRAutomation'
import ProcessIcon from '@/components/icons/ProcessIcon'
import Dropdown1 from '@/components/Dropdown1'
import { PortableText } from '@portabletext/react'

const iconComponents: Record<string, React.FC<any>> = {
  PRPlasticity,
  PRInsideOut,
  PRAutomation,
}

interface ProcessSectionProps {
  data: {
    processBlocks?: Array<{
      title: string
      icon?: string
      content: any[]
    }>
  }
}

export function ProcessSection({ data }: ProcessSectionProps) {
  const { processBlocks } = data
  const [openProcess, setOpenProcess] = useState<number | null>(null)
  
  if (!processBlocks || processBlocks.length === 0) return null

  return (
    <Dropdown1 
      title="Process" 
      content={
        <AnimatePresence mode="wait">
          {openProcess === null ? (
            <motion.div
              key="collapsed-group"
              initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-evenly', 
                alignItems: 'stretch', 
                width: '100%', 
                gap: '2vw' 
              }}
            >
              {processBlocks.map((block, idx) => {
                const IconComponent = block.icon ? iconComponents[block.icon] : null
                
                return (
                  <ProcessSelectionDropdown
                    key={idx}
                    title={block.title}
                    icon={IconComponent ? <IconComponent /> : null}
                    expanded={false}
                    onClick={() => setOpenProcess(idx + 1)}
                    content={<PortableText value={block.content} />}
                  />
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key={`step${openProcess}`}
              initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center' 
              }}
            >
              {processBlocks[openProcess - 1] && (
                <ProcessSelectionDropdown
                  title={processBlocks[openProcess - 1].title}
                  icon={
                    processBlocks[openProcess - 1].icon 
                      ? iconComponents[processBlocks[openProcess - 1].icon] 
                      : null
                  }
                  expanded={true}
                  onCollapse={() => setOpenProcess(null)}
                  content={
                    <PortableText value={processBlocks[openProcess - 1].content} />
                  }
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      }
      placeholder={
        <ProcessIcon
          width="clamp(180px, 22vw, 200px)"
          height="auto"
          style={{ maxWidth: '100%', borderRadius: '50%' }}
        />
      }
    />
  )
}
```

---

## Phase 4: Dynamic Routing

### Step 4.1: Create Catch-All Page Route

Create `/src/app/[slug]/page.tsx`:

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPages } from '@/lib/sanity.fetch'
import { PageRenderer } from '@/components/PageRenderer'
import { siteSettingsQuery } from '@/lib/sanity.queries'
import { client } from '@/lib/sanity'

interface PageProps {
  params: { slug: string }
}

// Generate static paths for all pages
export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((page) => ({
    slug: page.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  // Get site settings for defaults
  const siteSettings = await client.fetch(siteSettingsQuery)

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || siteSettings?.defaultMetaDescription,
    alternates: {
      canonical: `https://www.b8momani.com/${page.slug.current}`,
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || siteSettings?.defaultMetaDescription,
      url: `https://www.b8momani.com/${page.slug.current}`,
      images: page.ogImage 
        ? [{ url: page.ogImage.asset.url, width: 1200, height: 630 }]
        : siteSettings?.defaultOgImage 
          ? [{ url: siteSettings.defaultOgImage.asset.url, width: 1200, height: 630 }]
          : [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
  }
}

// Main page component
export default async function DynamicPage({ params }: PageProps) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return <PageRenderer sections={page.sections || []} />
}
```

### Step 4.2: Keep Specific Routes for Special Pages

For pages that need custom logic (like `/shezzi` fetching GitHub README), keep their dedicated routes but fetch content from Sanity for the editable parts:

```typescript
// Example: /src/app/shezzi/page.tsx - modified version
import { Metadata } from 'next'
import { getPageBySlug } from '@/lib/sanity.fetch'
import { PageRenderer } from '@/components/PageRenderer'

export const metadata: Metadata = {
  title: "Shezzi - Personally Owned, Locally-Run AI System",
}

export default async function ShezziPage() {
  // Fetch Sanity content for editable parts
  const page = await getPageBySlug('shezzi')
  
  // Keep existing GitHub fetch for technical details
  const readmeHtml = await getReadme()

  return (
    <div className="shezziMain">
      {/* Render Sanity-managed sections */}
      {page?.sections && <PageRenderer sections={page.sections} />}
      
      {/* Keep custom GitHub README section */}
      {readmeHtml && (
        <div 
          className="markdown-body" 
          dangerouslySetInnerHTML={{ __html: readmeHtml }} 
        />
      )}
    </div>
  )
}
```

---

## Phase 5: Webhook Revalidation (API Call Only on Edit)

### Step 5.1: Create Revalidation API Route

Create `/src/app/api/revalidate/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-sanity-webhook-secret')
    
    // Verify webhook secret
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, slug } = body

    // Revalidate based on document type
    switch (_type) {
      case 'page':
        // Revalidate specific page
        if (slug?.current) {
          revalidatePath(`/${slug.current}`)
          revalidateTag(`page:${slug.current}`)
        }
        break
        
      case 'siteSettings':
        // Revalidate all pages for global changes
        revalidatePath('/', 'layout')
        revalidateTag('siteSettings')
        break
        
      case 'navigation':
        // Revalidate all pages with navigation
        revalidatePath('/', 'layout')
        revalidateTag('navigation')
        break
        
      case 'pageSection':
      case 'artProject':
      case 'portfolioProject':
      case 'resourceLink':
        // Revalidate all pages that might use these
        revalidatePath('/', 'layout')
        revalidateTag('pages')
        break
    }

    return NextResponse.json({ 
      revalidated: true, 
      timestamp: Date.now(),
      documentType: _type,
    })
    
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
```

### Step 5.2: Configure Sanity Webhook

In Sanity Studio or via Sanity Manage dashboard:

**Webhook URL:** `https://www.b8momani.com/api/revalidate`

**HTTP Method:** POST

**Headers:**
```
x-sanity-webhook-secret: your_webhook_secret_here
```

**Trigger on:**
- [x] Create
- [x] Update
- [x] Delete

**Filter (GROQ):**
```groq
type in ["page", "pageSection", "siteSettings", "navigation", "artProject", "portfolioProject", "resourceLink"]
```

**Projection (JSON):**
```json
{
  "_type": _type,
  "slug": slug
}
```

---

## Phase 6: Sanity Studio Setup

### Step 6.1: Configure Sanity Studio

Create `/sanity/sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'A Fungi Club CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your_project_id',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  
  // Studio theming
  theme: {
    /* optional: customize colors */
  },
})
```

### Step 6.2: Custom Structure for Better UX

Create `/sanity/structure/index.ts`:

```typescript
import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages section
      S.listItem()
        .title('Pages')
        .child(
          S.documentTypeList('page')
            .title('All Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      
      // Reusable sections
      S.listItem()
        .title('Page Sections')
        .child(
          S.documentTypeList('pageSection')
            .title('Sections')
        ),
      
      // Content collections
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content Types')
            .items([
              S.documentTypeListItem('artProject').title('Art Projects'),
              S.documentTypeListItem('portfolioProject').title('Portfolio Projects'),
              S.documentTypeListItem('resourceLink').title('Resource Links'),
              S.documentTypeListItem('processBlock').title('Process Blocks'),
              S.documentTypeListItem('banner').title('Banners'),
              S.documentTypeListItem('hero').title('Hero Sections'),
              S.documentTypeListItem('bio').title('Bio Sections'),
            ])
        ),
      
      // Settings
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.documentTypeListItem('navigation').title('Navigation'),
            ])
        ),
      
      // Divider
      S.divider(),
      
      // All document types
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['page', 'pageSection', 'siteSettings', 'navigation', 'artProject', 'portfolioProject', 'resourceLink', 'processBlock', 'banner', 'hero', 'bio'].includes(item.getId()!)
      ),
    ])
```

Update `sanity.config.ts`:

```typescript
import { structure } from './structure'

export default defineConfig({
  // ... other config
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
})
```

---

## Phase 7: Migration Strategy

### Step 7.1: Export Current Content to JSON

Create a migration script `/scripts/export-content.ts`:

```typescript
import fs from 'fs'
import path from 'path'

// Read existing page files and extract content
// This is a starting point - customize based on your content

const pagesDir = path.join(__dirname, '../src/app')
const outputDir = path.join(__dirname, '../migrations')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Helper to parse page content
async function exportPages() {
  const pages = [
    { slug: 'home', title: 'Home', type: 'home' },
    { slug: 'about', title: 'About', type: 'about' },
    { slug: 'art', title: 'Art', type: 'art' },
    { slug: 'portfolio', title: 'Portfolio', type: 'portfolio' },
    { slug: 'shezzi', title: 'Shezzi', type: 'project' },
    // ... add all pages
  ]

  const pagesExport = pages.map(p => ({
    _type: 'page',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    pageType: p.type,
    isPublished: true,
  }))

  fs.writeFileSync(
    path.join(outputDir, 'pages.json'),
    JSON.stringify(pagesExport, null, 2)
  )

  console.log('Exported pages structure')
}

exportPages()
```

### Step 7.2: Import to Sanity

Use Sanity CLI to import:

```bash
sanity documents create migrations/pages.json
```

Or use Sanity's HTTP API for batch imports.

---

## Phase 8: Deployment Checklist

### Environment Variables (Vercel)

Add to Vercel project settings:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-01
SANITY_API_READ_TOKEN=xxx
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

### Build Configuration

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... existing config
  
  // Ensure static generation works
  output: 'standalone', // or keep default for static
  
  // Images from Sanity CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
```

### Testing Webhooks Locally (Optional)

Use ngrok for local webhook testing:

```bash
# In one terminal
ngrok http 3000

# Copy the https URL and configure in Sanity
# Webhook URL: https://xxx.ngrok-free.app/api/revalidate
```

---

## Summary: Free Tier Compliance

| Feature | Implementation | Free Tier Impact |
|---------|---------------|------------------|
| **API Calls** | Only during `next build` and webhook revalidation | 0 calls per visitor |
| **Content Delivery** | Static HTML from Vercel CDN | Sanity CDN unused for visitors |
| **Bandwidth** | Vercel serves static files | 0 Sanity bandwidth used |
| **Real-time** | ISR with webhooks, not live queries | No real-time connection |
| **Storage** | 10GB dataset limit | ~50MB for this project |
| **User Roles** | 3 admin/editors | Within limit |

### Estimated Monthly Usage

- **Builds:** ~100 (development + production)
- **Webhook calls:** ~50 (content edits)
- **Total API calls:** ~150/month (well under 100M limit)
- **Dataset size:** ~10-50MB (well under 10GB)

---

## Next Steps

1. **Run Phase 1** - Set up Sanity project and install dependencies
2. **Run Phase 2** - Create all schema files
3. **Test in Studio** - Run `npm run dev` in `/sanity` folder
4. **Create content** - Add pages and sections in Sanity Studio
5. **Run Phase 3-4** - Implement data fetching and dynamic pages
6. **Run Phase 5** - Set up webhooks for on-demand revalidation
7. **Test thoroughly** - Verify all sections render correctly
8. **Deploy** - Push to production and configure webhooks
9. **Train content editors** - Document how to use Sanity Studio

---

## File Structure After Integration

```
/Users/khaledmomani/Desktop/Github_Repositories/a_fungi_club/
├── sanity/                          # Sanity Studio
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── page.ts
│   │   ├── pageSection.ts
│   │   ├── siteSettings.ts
│   │   ├── navigation.ts
│   │   ├── banner.ts
│   │   ├── hero.ts
│   │   ├── bio.ts
│   │   ├── artProject.ts
│   │   ├── portfolioProject.ts
│   │   ├── resourceLink.ts
│   │   ├── processBlock.ts
│   │   └── dropdownContent.ts
│   ├── structure/
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── .env.local
├── src/
│   ├── lib/
│   │   ├── sanity.ts
│   │   ├── sanity.queries.ts
│   │   └── sanity.fetch.ts
│   ├── components/
│   │   ├── PageRenderer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── BannerSection.tsx
│   │       ├── BioSection.tsx
│   │       ├── ArtGridSection.tsx
│   │       ├── PortfolioSection.tsx
│   │       ├── ProcessSection.tsx
│   │       ├── ResourcesSection.tsx
│   │       ├── TextSection.tsx
│   │       └── GallerySection.tsx
│   └── app/
│       ├── api/revalidate/route.ts
│       └── [slug]/page.tsx
└── SANITY_INTEGRATION_PLAN.md       # This document
```

---

## Support Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Sanity Integration](https://www.sanity.io/guides/nextjs-live-preview)
- [Sanity Free Tier Details](https://www.sanity.io/pricing)
- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
