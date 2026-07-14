'use client'

import React from 'react'
import { PortableText } from '@portabletext/react'
import type { Section } from '../PageRenderer'

interface TextSectionProps {
  data: Section
}

export function TextSection({ data }: TextSectionProps) {
  const { content } = data
  
  if (!content || content.length === 0) return null

  return (
    <div 
      className="text-section"
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '0 1rem',
        lineHeight: 1.6,
      }}
    >
      <PortableText 
        value={content}
        components={{
          block: {
            h2: ({ children }) => (
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                marginBottom: '1rem',
                marginTop: '2rem' 
              }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                marginBottom: '0.75rem',
                marginTop: '1.5rem' 
              }}>
                {children}
              </h3>
            ),
            normal: ({ children }) => (
              <p style={{ marginBottom: '1rem' }}>{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote style={{ 
                borderLeft: '4px solid #ccc',
                paddingLeft: '1rem',
                marginLeft: 0,
                fontStyle: 'italic',
                color: '#666'
              }}>
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>{children}</ul>
            ),
            number: ({ children }) => (
              <ol style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
            number: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
          },
          marks: {
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            code: ({ children }) => (
              <code style={{ 
                backgroundColor: '#f4f4f4', 
                padding: '0.2em 0.4em',
                borderRadius: 3,
                fontFamily: 'monospace',
                fontSize: '0.9em'
              }}>
                {children}
              </code>
            ),
            link: ({ value, children }) => {
              const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
              return (
                <a 
                  href={value?.href} 
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  style={{ color: '#1F5CE0', textDecoration: 'underline' }}
                >
                  {children}
                </a>
              )
            },
          },
        }}
      />
    </div>
  )
}
