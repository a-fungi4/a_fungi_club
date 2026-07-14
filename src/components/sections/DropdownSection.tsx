'use client'

import React from 'react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Dropdown1 from '@/components/Dropdown1'
import Dropdown2 from '@/components/Dropdown2'
import Dropdown3 from '@/components/Dropdown3'
import Dropdown4 from '@/components/Dropdown4'
import MiscDropdown from '@/components/MiscDropdown'
import ResourceLinkButton from '@/components/ResourceLinkButton'
import type { Section } from '../PageRenderer'

// Import section icons
import FFigma from '@/components/icons/FFigma'
import FCursor from '@/components/icons/FCursor'
import FNextVercel from '@/components/icons/FNextVercel'

const sectionIcons: Record<string, React.ReactNode> = {
  figma: <FFigma />,
  cursor: <FCursor />,
  deployment: <FNextVercel />,
}

interface DropdownSectionProps {
  data: Section
}

export function DropdownSection({ data }: DropdownSectionProps) {
  const { dropdownContent } = data as any
  
  if (!dropdownContent) return null

  const { variant, title, icon, iconComponent, content, richTextContent, placeholder, defaultText, hoverText } = dropdownContent

  const getIcon = () => {
    if (icon?.asset?.url) {
      return <Image src={icon.asset.url} alt={title} width={48} height={48} />
    }
    if (iconComponent && sectionIcons[iconComponent]) {
      return sectionIcons[iconComponent]
    }
    return undefined
  }

  const getPlaceholder = () => {
    if (placeholder?.asset?.url) {
      return (
        <Image
          src={placeholder.asset.url}
          alt=""
          width={0}
          height={0}
          sizes="(max-width: 600px) 40vw, 200px"
          style={{ width: 'clamp(160px, 16vw, 200px)', height: 'auto', maxWidth: '100%', borderRadius: '50%' }}
          priority
        />
      )
    }
    return undefined
  }

  // Convert content items to React nodes for Dropdown4
  const getLinkButtonGrid = () => {
    if (!content?.length) return null
    return (
      <>
        {content.map((item: any, idx: number) => (
          <div key={idx} className="dropdown-item">
            <h4>{item.label}</h4>
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </>
    )
  }

  // Render based on variant
  switch (variant) {
    case 'dropdown1':
      return (
        <Dropdown1
          title={title}
          content={
            <PortableText 
              value={richTextContent || []}
              components={{
                block: {
                  normal: ({ children }) => <p style={{ marginBottom: '1rem' }}>{children}</p>,
                },
              }}
            />
          }
          placeholder={getPlaceholder()}
        />
      )

    case 'dropdown3':
      // Dropdown3 has no props - it's a static component
      return <Dropdown3 />

    case 'dropdown4':
      return (
        <Dropdown4
          title={title || 'Default'}
          options={content?.map((item: any) => item.label) || []}
          icon={getIcon()}
          linkButtonGrid={getLinkButtonGrid()}
        />
      )

    case 'miscDropdown':
      return (
        <MiscDropdown
          defaultText={defaultText || title || 'Default'}
          hoverText={hoverText || title || 'Hover'}
          title={title}
          icon={getIcon()}
          content={
            <>
              {content?.map((item: any, idx: number) => (
                <div key={idx}>
                  <a href={item.url || '#'}>{item.label}</a>
                </div>
              ))}
            </>
          }
        />
      )

    case 'dropdown2':
    default:
      return (
        <Dropdown2
          title={title}
          icon={getIcon()}
          content={
            <>
              {content?.map((item: any, idx: number) => {
                if (item.isMiniDropdown) {
                  return (
                    <div key={idx} className="mini-dropdown-wrapper">
                      <ResourceLinkButton
                        label={item.label}
                        href={item.url || '#'}
                        icon={item.icon ? <span>{item.icon}</span> : undefined}
                      />
                    </div>
                  )
                }
                return (
                  <ResourceLinkButton
                    key={idx}
                    label={item.label}
                    href={item.url || '#'}
                    icon={item.icon ? <span>{item.icon}</span> : undefined}
                  />
                )
              })}
            </>
          }
        />
      )
  }
}
