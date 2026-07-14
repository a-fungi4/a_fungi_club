# Technical Specification: Multi-Project Interactive Prototype Viewer

**ACT AS:** Senior Frontend & Creative Engineer  
**STRICT CONSTRAINT:** This is a **Visual Presentation Widget**, NOT a functional application. Do not implement real Auth, APIs, Databases, or Form Logic. Focus 100% on UI fidelity and high-end transition animations.

---

## 1. Project Objective
Build a reusable Next.js component (`PrototypePlayer.tsx`) that acts as a "media player" for Figma prototypes. Each project should be treated as a "playlist" of SVG screens, allowing for a cinematic, interactive walkthrough within a web-based portfolio.

## 2. Display Architecture (The Responsive Shell)
The viewer must support a **Dual-Mode Display** inside a responsive container:
*   **Standard Mode (The Phone Shell):** 
    *   **Aspect Ratio:** Fixed `9:19.5` (iPhone 15 style).
    *   **Style:** `max-w-[400px]`, centered, `rounded-[3rem]`, `border-[8px] border-black`, `shadow-2xl`, and `overflow-hidden`.
    *   **Responsiveness:** Scales to fit mobile browser widths while maintaining the "phone bezel" look on desktop.
*   **Full Screen Mode:**
    *   Triggered by a toggle; the SVG expands to fill the viewport height while maintaining its 9:19.5 aspect ratio.

## 3. Scalable Data Schema (The "Project Config" Pattern)
To support multiple Figma projects, the `PrototypePlayer` must accept a `projectData` prop. Do not hardcode specific project content into the player component.

**Required Configuration Structure:**
```typescript
type ProjectConfig = {
  id: string; // Unique slug (e.g., 'fitness-app')
  title: string;
  screens: {
    id: number;
    component: React.FC; // The imported SVG frame for this step
    links: { targetId: string; nextStep: number }[]; // Maps SVG layer IDs to the next state
  }[];
}
