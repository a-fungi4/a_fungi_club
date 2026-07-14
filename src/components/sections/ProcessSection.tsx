'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import ProcessSelectionDropdown from '@/components/ProcessSelectionDropdown'
import ProcessIcon from '@/components/icons/ProcessIcon'
import Dropdown1 from '@/components/Dropdown1'
import type { Section } from '../PageRenderer'

// Import process icons
import PRPlasticity from '@/components/icons/PRPlasticity'
import PRInsideOut from '@/components/icons/PRInsideOut'
import PRAutomation from '@/components/icons/PRAutomation'

const iconComponents: Record<string, React.FC<any>> = {
  PRPlasticity,
  PRInsideOut,
  PRAutomation,
}

interface ProcessSectionProps {
  data: Section
}

export function ProcessSection({ data }: ProcessSectionProps) {
  const { processBlocks } = data
  const [openProcess, setOpenProcess] = useState<number | null>(null)
  
  if (!processBlocks || processBlocks.length === 0) return null

  const blocks = processBlocks.sort((a, b) => (a.title > b.title ? 1 : -1))

  return (
    <Dropdown1 
      title="Process" 
      content={
        <AnimatePresence mode="wait">
          {openProcess === null ? (
            <motion.div
              key="collapsed-group"
              initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-evenly', 
                alignItems: 'stretch', 
                width: '100%', 
                gap: '2vw',
                flexWrap: 'wrap'
              }}
            >
              {blocks.map((block, idx) => {
                const IconComponent = block.icon ? iconComponents[block.icon] : null
                
                return (
                  <ProcessSelectionDropdown
                    key={block._id}
                    title={block.title}
                    icon={IconComponent ? <IconComponent /> : null}
                    expanded={false}
                    onClick={() => setOpenProcess(idx + 1)}
                    content={
                      <PortableText 
                        value={block.content}
                        components={{
                          block: {
                            normal: ({ children }) => <>{children}<br /><br /></>,
                          },
                        }}
                      />
                    }
                  />
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key={`step${openProcess}`}
              initial={{ opacity: 0, y: 30, scaleX: 0.7 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              exit={{ opacity: 0, y: -30, scaleX: 0.7 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center' 
              }}
            >
              {blocks[openProcess - 1] && (() => {
                const currentBlock = blocks[openProcess - 1]
                const iconName = currentBlock?.icon
                const IconComponent = iconName && iconComponents[iconName] ? iconComponents[iconName] : null
                
                return (
                  <ProcessSelectionDropdown
                    title={currentBlock.title}
                    icon={IconComponent ? <IconComponent /> : null}
                    expanded={true}
                    onCollapse={() => setOpenProcess(null)}
                    content={
                      <PortableText 
                        value={currentBlock.content}
                        components={{
                          block: {
                            normal: ({ children }) => <>{children}<br /><br /></>,
                          },
                        }}
                      />
                    }
                  />
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      }
      placeholder={
        <ProcessIcon
          width="clamp(180px, 22vw, 200px)"
          height="auto"
          style={{ maxWidth: '100%', borderRadius: '50%' }}
        />
      }
    />
  )
}
