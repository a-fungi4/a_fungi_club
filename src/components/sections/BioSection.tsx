'use client'

import React from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Dropdown1 from '@/components/Dropdown1'
import type { Section } from '../PageRenderer'

interface BioSectionProps {
  data: Section
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
      content={
        <div className="bio-content">
          <PortableText 
            value={content}
            components={{
              block: {
                normal: ({ children }) => <p style={{ marginBottom: '1rem' }}>{children}</p>,
              },
            }}
          />
        </div>
      }
      placeholder={placeholder}
    />
  )
}
