import React from 'react';

export type LinkConfig = {
  targetId: string;
  nextStep: number;
};

export type ScreenConfig = {
  id: number;
  component: React.FC;
  links: LinkConfig[];
};

export type ProjectConfig = {
  id: string;
  title: string;
  screens: ScreenConfig[];
};
