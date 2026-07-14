'use client'

import React from 'react'
import Image from 'next/image'
import Carousel from '@/components/Carousel'
import type { Section } from '../PageRenderer'

interface CarouselSectionProps {
  data: Section
}

export function CarouselSection({ data }: CarouselSectionProps) {
  const { carouselContent } = data as any
  
  if (!carouselContent?.items || carouselContent.items.length === 0) return null

  const { items, title } = carouselContent

  // Convert items to photo URLs/nodes for Carousel component
  const photos = items.map((item: any) => {
    if (item.image?.asset?.url) {
      return item.image.asset.url
    }
    return item.title || 'Item'
  })

  return (
    <div className="carousel-section" style={{ padding: '2rem 0' }}>
      {title && <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{title}</h2>}
      
      <Carousel photos={photos} />
    </div>
  )
}
