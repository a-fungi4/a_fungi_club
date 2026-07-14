import React from 'react'
import ArtProject from '@/components/ArtProject'
import type { Section } from '../PageRenderer'

// Import all art project icons
import FreeTherapy from '@/components/icons/FreeTherapy'
import EighthNLucas from '@/components/icons/8thNLucas'
import LilBiscoff from '@/components/icons/LilBiscoff'
import Coloring from '@/components/icons/Coloring'
import TackyGarbageBig from '@/components/icons/TackyGarbageBig'

const iconComponents: Record<string, React.FC<any>> = {
  FreeTherapy,
  EighthNLucas,
  LilBiscoff,
  Coloring,
  TackyGarbageBig,
}

interface ArtGridSectionProps {
  data: Section
}

export function ArtGridSection({ data }: ArtGridSectionProps) {
  const { artProjects } = data
  
  if (!artProjects || artProjects.length === 0) return null

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 48, 
      marginTop: 48, 
      marginBottom: 48 
    }}>
      {artProjects.map((project) => {
        const IconComponent = project.iconComponent 
          ? iconComponents[project.iconComponent] 
          : null

        return (
          <ArtProject
            key={project._id}
            title={project.title}
            description={project.description || ''}
            svg={IconComponent ? <IconComponent /> : undefined}
            link={project.link || '#'}
            iconPosition={project.iconPosition || 'left'}
          />
        )
      })}
    </div>
  )
}
