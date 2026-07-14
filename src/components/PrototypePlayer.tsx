'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectConfig } from '@/types/figma';

/**
 * PrototypePlayer Component
 * A reusable "media player" for Figma prototypes.
 */
interface PrototypePlayerProps {
  projectData: ProjectConfig;
}

export const PrototypePlayer: React.FC<PrototypePlayerProps> = ({ projectData }) => {
  const [currentScreenId, setCurrentScreenId] = useState<number>(
    projectData.screens[0]?.id ?? 0
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentScreen = projectData.screens.find((s) => s.id === currentScreenId);

  const handleInteraction = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement | null;
    
    // Bubble up to find a matching link ID
    while (target && target !== e.currentTarget) {
      const targetId = target.getAttribute('id');
      if (targetId) {
        const link = currentScreen?.links.find((l) => l.targetId === targetId);
        if (link) {
          setCurrentScreenId(link.nextStep);
          return;
        }
      }
      target = target.parentElement;
    }
  };

  if (!currentScreen) return <div>No screen data found.</div>;

  const ScreenComponent = currentScreen.component;

  return (
    <div className="relative w-full h-full flex flex-center items-center justify-center p-4">
      {/* Interaction Shell */}
      <motion.div
        layout
        className={`relative bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out
          ${
            isFullscreen
              ? 'fixed inset-0 z-50 w-screen h-screen rounded-0 border-0 m-0'
              : 'max-w-[400px] w-full aspect-[9/19.5] rounded-[3rem] border-[8px] border-black m-auto'
          }`}
      >
        {/* Navigation / Control Overlay */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-black/10 hover:bg-black/20 rounded-full backdrop-blur-md transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6"/><path d="M9 21 3 15"/><path d="M21 3v6h-6"/><path d="M3 21v-6h6"/><path d="m3 3 6 6"/><path d="M15 15l6 6"/></svg>
            )}
          </button>
        </div>

        {/* Screen Content */}
        <div 
          className="relative w-full h-full cursor-pointer flex items-center justify-center overscroll-none"
          onClick={handleInteraction}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentScreenId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <ScreenComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Background Dimmer for Standard Mode */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}
    </div>
  );
};
