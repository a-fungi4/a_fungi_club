"use client";
import React, { useState } from 'react';
import styles from './CompanionViewer.module.css';
import CBarry from './icons/CBarry';
import CCherryl from './icons/CCherryl';
import CColada from './icons/CColada';
import CDragon from './icons/CDragon';
import CLemona from './icons/CLemona';
import CMalone from './icons/CMalone';
import CPeach from './icons/CPeach';
import CRania from './icons/CRania';
import CTom from './icons/CTom';

const companions = [
  { name: 'Barry', svg: <CBarry /> },
  { name: 'Cherryl', svg: <CCherryl /> },
  { name: 'Colada', svg: <CColada /> },
  { name: 'Dragon', svg: <CDragon /> },
  { name: 'Lemona', svg: <CLemona /> },
  { name: 'Malone', svg: <CMalone /> },
  { name: 'Peach', svg: <CPeach /> },
  { name: 'Rania', svg: <CRania /> },
  { name: 'Tom', svg: <CTom /> },
];

const CompanionViewer: React.FC = () => {
  const [selected, setSelected] = useState(8); // Default to Tom

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + companions.length) % companions.length);
  };
  const handleNext = () => {
    setSelected((prev) => (prev + 1) % companions.length);
  };

  return (
    <div className={styles.CreateCompanion}>
      <div className={styles.Companionsvg}>
        {React.cloneElement(companions[selected].svg, { className: styles.svgDropShadow })}
      </div>
      <div className={styles.Purpledropdown}>
        <button className={styles.ArrowButton} aria-label="Previous Companion" onClick={handlePrev}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_935_2428)">
              <path d="M1.5 11.6341C0.833334 12.019 0.833333 12.9812 1.5 13.3661L16.5 22.0264C17.1667 22.4113 18 21.9302 18 21.1604L18 3.83987C18 3.07007 17.1667 2.58895 16.5 2.97385L1.5 11.6341Z" fill="#79DE4A"/>
            </g>
            <defs>
              <filter id="filter0_i_935_2428" x="0" y="0.5" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_935_2428"/>
              </filter>
            </defs>
          </svg>
        </button>
        <div className={styles.Tom}>{companions[selected].name}</div>
        <button className={styles.ArrowButton} aria-label="Next Companion" onClick={handleNext}>
          <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 9.6341C17.1667 10.019 17.1667 10.9812 16.5 11.3661L1.5 20.0264C0.833332 20.4113 0 19.9302 0 19.1604L0 1.83987C0 1.07007 0.833334 0.588945 1.5 0.973846L16.5 9.6341Z" fill="#79DE4A"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CompanionViewer; 