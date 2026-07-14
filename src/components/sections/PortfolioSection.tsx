'use client'

import React from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { Section } from '../PageRenderer'

// This is a simplified version - you can enhance with your existing PortfolioInteractive component

interface PortfolioSectionProps {
  data: Section
}

export function PortfolioSection({ data }: PortfolioSectionProps) {
  const { portfolioProjects } = data
  
  if (!portfolioProjects || portfolioProjects.length === 0) return null

  // Sort by featured first, then by order
  const sortedProjects = [...portfolioProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {sortedProjects.map((project) => (
        <div 
          key={project._id}
          style={{
            background: '#151029',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {project.thumbnail?.asset?.url && (
            <div style={{ position: 'relative', height: 200 }}>
              <Image
                src={project.thumbnail.asset.url}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              {project.featured && (
                <span style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: '#E01F8C',
                  color: '#fff',
                  padding: '0.25em 0.75em',
                  borderRadius: 12,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  Featured
                </span>
              )}
            </div>
          )}
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.25rem',
                fontWeight: 600 
              }}>
                {project.title}
              </h3>
              {project.category && (
                <span style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  textTransform: 'uppercase',
                }}>
                  {project.category}
                </span>
              )}
            </div>
            {project.shortDescription && (
              <p style={{ 
                margin: '0.5rem 0 0',
                color: '#ccc',
                fontSize: '0.9rem'
              }}>
                {project.shortDescription}
              </p>
            )}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {project.projectLink && (
                <a 
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#1F5CE0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  View Project →
                </a>
              )}
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#1FE043',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
