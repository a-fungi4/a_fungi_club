'use client'

import React from 'react'
import { PortableText } from '@portabletext/react'
import Dropdown2 from '@/components/Dropdown2'
import MiniDropdown from '@/components/MiniDropdown'
import ResourceLinkButton from '@/components/ResourceLinkButton'
import type { Section } from '../PageRenderer'

// Import resource icons
import RLBIconVideo from '@/components/RLBIconVideo'
import RLBIconReading from '@/components/RLBIconReading'
import RLBIconCode from '@/components/RLBIconCode'
import RLBIconVideoComponent from '@/components/RLBIconVideo'
import RLBIconReadingComponent from '@/components/RLBIconReading'
import RLBIconCodeComponent from '@/components/RLBIconCode'

// Import section icons
import FFigma from '@/components/icons/FFigma'
import FCursor from '@/components/icons/FCursor'
import FNextVercel from '@/components/icons/FNextVercel'

const resourceIcons: Record<string, React.FC<any>> = {
  RLBIconVideo: RLBIconVideoComponent,
  RLBIconReading: RLBIconReadingComponent,
  RLBIconCode: RLBIconCodeComponent,
}

const sectionIcons: Record<string, React.ReactNode> = {
  figma: <FFigma />,
  cursor: <FCursor />,
  deployment: <FNextVercel />,
}

const sectionTitles: Record<string, string> = {
  figma: 'Figma',
  cursor: 'Cursor AI',
  deployment: 'Deployment',
  beginner: 'Beginner Guides',
  'best-practices': 'Best Practices',
  reference: 'Reference Guide',
  tools: 'Tools',
  'getting-started': 'Getting Started',
  tips: 'Tips',
}

interface ResourcesSectionProps {
  data: Section
}

export function ResourcesSection({ data }: ResourcesSectionProps) {
  const { resourceLinks } = data
  
  if (!resourceLinks || resourceLinks.length === 0) return null

  // Group links by category
  const groupedLinks = resourceLinks.reduce((acc, link) => {
    const category = link.category || 'uncategorized'
    if (!acc[category]) acc[category] = []
    acc[category].push(link)
    return acc
  }, {} as Record<string, typeof resourceLinks>)

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5em',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {Object.entries(groupedLinks).map(([category, links]) => {
        const icon = sectionIcons[category] || null
        const title = sectionTitles[category] || category

        // Separate mini dropdowns from regular links
        const miniDropdowns = links.filter(l => l.isMiniDropdown)
        const regularLinks = links.filter(l => !l.isMiniDropdown)

        return (
          <Dropdown2
            key={category}
            title={title}
            icon={icon}
            content={
              <>
                {regularLinks.map((link) => {
                  const IconComponent = link.icon 
                    ? resourceIcons[link.icon] 
                    : RLBIconReadingComponent
                  
                  return (
                    <ResourceLinkButton
                      key={link._id}
                      label={link.label}
                      href={link.url}
                      icon={<IconComponent />}
                    />
                  )
                })}
                {miniDropdowns.map((link) => (
                  <MiniDropdown
                    key={link._id}
                    title={link.label}
                    icon={
                      link.icon 
                        ? React.createElement(resourceIcons[link.icon] || RLBIconCodeComponent)
                        : undefined
                    }
                  >
                    <PortableText value={link.dropdownContent || []} />
                  </MiniDropdown>
                ))}
              </>
            }
          />
        )
      })}
    </div>
  )
}
