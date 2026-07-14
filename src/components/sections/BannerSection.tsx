import React from 'react'
import Image from 'next/image'
import Banner from '@/components/Banner'
import type { Section } from '../PageRenderer'

interface BannerSectionProps {
  data: Section
}

export function BannerSection({ data }: BannerSectionProps) {
  const { bannerContent, customClass } = data
  
  if (!bannerContent) return null

  const { title, variant, description, projectImages, buttonText, buttonLink } = bannerContent

  return (
    <Banner 
      title={title} 
      variant={variant || 'general'} 
      className={customClass || 'fullBleed'}
    >
      {description && (
        <div className="Bannerprojectembed1">
          <div 
            className="BannerTextBox" 
            style={{ background: '#151029', borderRadius: 16, padding: 10 }}
          >
            <p>{description}</p>
          </div>
        </div>
      )}
      
      {projectImages && projectImages.length > 0 && (
        <div className="bannerProjectsRow" style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '1rem'
        }}>
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
                  style={{ borderRadius: 8 }}
                />
              )}
            </a>
          ))}
        </div>
      )}
      
      {buttonText && buttonLink && (
        <a 
          href={buttonLink}
          className="goToProjectButton"
          style={{ 
            display: 'inline-block',
            marginTop: '1.5em',
            padding: '0.75em 1.5em',
            background: '#151029',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          {buttonText}
        </a>
      )}
    </Banner>
  )
}
