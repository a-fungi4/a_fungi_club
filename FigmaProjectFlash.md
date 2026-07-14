# Implementation Guide: Multi-Project Interactive Prototype Viewer

**Target AI:** Gemini Flash
**Role:** Senior Frontend & Creative Engineer
**Objective:** Implement a reusable Next.js component (`PrototypePlayer.tsx`) that acts as a "media player" for Figma prototypes.
**Strict Constraint:** This is a Visual Presentation Widget only. DO NOT implement real backend features (Auth, APIs, DB, Form logic). Focus strictly on UI fidelity and high-end transition animations.

Here are the granular, step-by-step instructions to implement the viewer:

## Step 1: Component Scaffolding & Types
1. Create a new Next.js component file, for example: `components/PrototypePlayer.tsx`.
2. Define the exact requested `ProjectConfig` type:
   ```typescript
   export type ProjectConfig = {
     id: string; // Unique slug (e.g., 'fitness-app')
     title: string;
     screens: {
       id: number;
       component: React.FC; // The imported SVG frame for this step
       links: { targetId: string; nextStep: number }[]; // Maps SVG layer IDs to the next state
     }[];
   }
   ```
3. Define the component interface to accept `projectData: ProjectConfig` as a prop.

## Step 2: Internal State Management
1. Import `useState` from React.
2. Create a `currentScreenId` state, initialized to the `id` of the first item in the `projectData.screens` array.
3. Create an `isFullscreen` boolean state, initialized to `false`.

## Step 3: Implement the Display Architecture (Responsive Shell)
1. Construct the outer container for the player.
2. Apply TailwindCSS (or your preferred styling solution) dynamically based on `isFullscreen`:
   - **Standard Mode (Phone Shell):** Apply `max-w-[400px]`, `mx-auto` (centered), `rounded-[3rem]`, `border-[8px]`, `border-black`, `shadow-2xl`, and `overflow-hidden`. Ensure the aspect ratio is locked to `9/19.5`.
   - **Full Screen Mode:** Remove the `max-w-[400px]` constraint. Scale the container to fill the window's height (`h-screen` or similar), but strictly maintain the `9/19.5` aspect ratio (e.g., using `aspect-[9/19.5] mx-auto h-[#vh]`).
3. Add a mode toggle button (e.g., an expand/collapse icon) layered over the player to switch the `isFullscreen` state. 

## Step 4: Screen Rendering & Navigation Logic
1. Find the current screen object from `projectData.screens` using `currentScreenId`.
2. Render the `currentScreen.component` inside the responsive shell.
3. **Interactive Hotspots:**
   - Attach an `onClick` event handler to the wrapper around the SVG component.
   - When a click occurs, inspect the event target (`e.target`).
   - Traverse the target's DOM hierarchy upwards to see if any element has an `id` that matches a `targetId` in the current screen's `links` array.
   - If a match is found, call the state setter to update `currentScreenId` to the associated `nextStep`.

## Step 5: High-End Transition Animations
1. Integrate an animation library (like Framer Motion) or use CSS transitions to animate the screen changes.
2. When the `currentScreenId` changes, animate the old screen out and the new screen in (e.g., a smooth crossfade or a slide-in mimic of a mobile OS navigation push).
3. Ensure the transition between Standard Mode and Full Screen Mode is also smoothly animated (e.g., using Framer Motion's `layout` prop).

## Step 6: Mock Data & Testing (Final Polish)
1. In a parent page (e.g., `page.tsx`), import the `PrototypePlayer` component.
2. Construct a dummy `ProjectConfig` object with at least two screens (mock simple SVGs containing elements with specific HTML IDs).
3. Verify that clicking the linked IDs properly navigates between the mock SVG screens.
4. Verify that the Standard to Full Screen toggle behaves responsively across different browser widths.
