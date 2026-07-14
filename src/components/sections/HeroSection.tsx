import React from 'react'
import HeroSectionComponent from '@/components/HeroSection'
import MyceliumAnimation from '@/components/MyceliumAnimation'

interface HeroSectionProps {
  data: {
    heroContent?: {
      title?: string
      subtitle?: string
      backgroundAnimation?: string
    }
    customClass?: string
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  const { heroContent } = data
  
  const showAnimation = heroContent?.backgroundAnimation !== 'none'

  return (
    <div style={{ 
      minHeight: '200dvh', 
      width: '100vw', 
      position: 'relative' 
    }}>
      {showAnimation && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          height: '100%', 
          zIndex: -50 
        }}>
          <MyceliumAnimation />
        </div>
      )}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        left: 0, 
        justifyContent: 'center', 
        width: '100vw', 
        height: '100vh', 
        zIndex: 4 
      }}>
        <HeroSectionComponent />
      </div>
    </div>
  )
}
