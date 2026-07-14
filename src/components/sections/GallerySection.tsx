'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Section } from '../PageRenderer'

interface GallerySectionProps {
  data: Section
}

export function GallerySection({ data }: GallerySectionProps) {
  const { images } = data
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  if (!images || images.length === 0) return null

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {images.map((image, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(idx)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {image.asset?.url && (
              <Image
                src={image.asset.url}
                alt={image.alt || `Gallery image ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {image.caption && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                padding: '0.5rem',
                fontSize: '0.875rem',
              }}>
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
            {images[selectedImage]?.asset?.url && (
              <Image
                src={images[selectedImage].asset.url}
                alt={images[selectedImage].alt || 'Gallery image'}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
                priority
              />
            )}
          </div>
          
          {/* Navigation arrows */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 48,
                height: 48,
                cursor: 'pointer',
                color: '#fff',
                fontSize: '1.5rem',
              }}
            >
              ←
            </button>
          )}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 48,
                height: 48,
                cursor: 'pointer',
                color: '#fff',
                fontSize: '1.5rem',
              }}
            >
              →
            </button>
          )}
          
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              cursor: 'pointer',
              color: '#fff',
              fontSize: '1.5rem',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
