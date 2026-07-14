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
import { DropdownSection } from './sections/DropdownSection'
import { CarouselSection } from './sections/CarouselSection'
import { ContactFormSection } from './sections/ContactFormSection'

export interface Section {
  _id: string
  sectionType: string
  title: string
  customClass?: string
  content?: any[]
  images?: any[]
  bannerContent?: {
    title: string
    variant: 'home' | 'general'
    description?: string
    projectImages?: Array<{
      asset?: { _id: string; url: string }
      alt?: string
      link?: string
    }>
    buttonText?: string
    buttonLink?: string
  }
  heroContent?: {
    title?: string
    subtitle?: string
    backgroundAnimation?: string
  }
  bioContent?: {
    title: string
    content: any[]
    headshot?: {
      asset?: { _id: string; url: string }
    }
  }
  processBlocks?: Array<{
    _id: string
    title: string
    icon?: string
    content: any[]
  }>
  artProjects?: Array<{
    _id: string
    title: string
    description?: string
    iconComponent?: string
    link?: string
    iconPosition?: 'left' | 'right'
  }>
  portfolioProjects?: Array<{
    _id: string
    title: string
    slug?: { current: string }
    category?: string
    thumbnail?: { asset?: { url: string } }
    shortDescription?: string
    fullDescription?: any[]
    projectLink?: string
    githubLink?: string
    featured?: boolean
  }>
  resourceLinks?: Array<{
    _id: string
    label: string
    url: string
    icon?: string
    category?: string
    isMiniDropdown?: boolean
    dropdownContent?: any[]
  }>
}

interface PageRendererProps {
  sections: Section[]
}

const sectionComponents: Record<string, React.FC<{ data: Section }>> = {
  hero: HeroSection,
  banner: BannerSection,
  bio: BioSection,
  artGrid: ArtGridSection,
  portfolio: PortfolioSection,
  process: ProcessSection,
  resources: ResourcesSection,
  text: TextSection,
  gallery: GallerySection,
  dropdown: DropdownSection,
  carousel: CarouselSection,
  contactForm: ContactFormSection,
}

export function PageRenderer({ sections }: PageRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No sections found for this page.</p>
      </div>
    )
  }

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section.sectionType]
        
        if (!Component) {
          console.warn(`Unknown section type: ${section.sectionType}`)
          return (
            <div key={section._id} style={{ padding: '1rem', border: '1px dashed #ccc', margin: '1rem 0' }}>
              <p>Unknown section type: {section.sectionType}</p>
            </div>
          )
        }

        return (
          <div key={section._id} className={section.customClass}>
            <Component data={section} />
          </div>
        )
      })}
    </>
  )
}
