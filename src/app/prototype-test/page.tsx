'use client';

import React from 'react';
import { PrototypePlayer } from '@/components/PrototypePlayer';
import { ProjectConfig } from '@/types/figma';

// Mock Screen 1: Home
const HomeScreen: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50">
    <rect width="390" height="844" fill="white" />
    <text x="50" y="100" className="text-3xl font-bold fill-slate-900">Home Screen</text>
    <rect id="btn-details" x="50" y="200" width="290" height="60" rx="12" className="fill-blue-600 hover:fill-blue-700 cursor-pointer" />
    <text x="140" y="235" className="fill-white font-medium text-lg pointer-events-none">View Details</text>
  </svg>
);

// Mock Screen 2: Details
const DetailsScreen: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50">
    <rect width="390" height="844" fill="white" />
    <text id="btn-back" x="20" y="50" className="text-sm font-medium fill-blue-600 cursor-pointer">← Back</text>
    <text x="50" y="100" className="text-3xl font-bold fill-slate-900">Details Screen</text>
    <circle cx="195" cy="400" r="100" className="fill-purple-100" />
    <text x="120" y="410" className="fill-purple-900 font-bold text-xl">Content</text>
  </svg>
);

const mockProject: ProjectConfig = {
  id: 'test-project',
  title: 'Mock Prototype',
  screens: [
    {
      id: 1,
      component: HomeScreen,
      links: [
        { targetId: 'btn-details', nextStep: 2 }
      ]
    },
    {
      id: 2,
      component: DetailsScreen,
      links: [
        { targetId: 'btn-back', nextStep: 1 }
      ]
    }
  ]
};

export default function PrototypeTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Figma Prototype Player Demo
        </h1>
        <p className="text-lg text-slate-600">
          Testing high-fidelity transitions and interaction handling.
        </p>
      </div>

      <div className="w-full h-[800px] flex items-center justify-center">
        <PrototypePlayer projectData={mockProject} />
      </div>
    </main>
  );
}
