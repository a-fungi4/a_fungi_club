# Portfolio Edit Plan
## a-fungi.club — Implementation Instructions

This document contains specific, sequential edits to be made to the a-fungi.club Next.js portfolio site. Each task is self-contained. Complete them in order.

---

## 1. Update Browser Tab / Meta Title (Homepage)

**File:** `app/page.tsx` or `pages/index.tsx` (whichever exists)

**Find:** The metadata export or `<Head>` block containing the current page title.

**Current value (approximate):**
```
Khaled Momani — Design, Development & Creative Direction
```

**Replace with:**
```
Khaled Momani — AI Systems Engineer & Designer
```

**If using Next.js App Router metadata export, it will look like:**
```ts
export const metadata = {
  title: "Khaled Momani — AI Systems Engineer & Designer",
}
```

**If using Next.js Pages Router `<Head>`, it will look like:**
```tsx
<title>Khaled Momani — AI Systems Engineer & Designer</title>
```

---

## 2. Update Portfolio Page Intro Copy

**File:** `app/portfolio/page.tsx` or `pages/portfolio.tsx`

**Find:** The paragraph block that currently reads:
```
You know that old Lady That swallows a fly, and it leads to swallowing a hrose and dying. I think I'm at my cow to catch the dog part. Really close to the horse that kills me. When I'm designing I listen to the clients' needs. I empathize with their frustrations. Sometimes their frustrations are their budget, and outsourcing is not an option. I didn't quit my job in retail and starve for three months, learnning to become a designer, so I could do projects I don't care about. But I've got bills to pay and sometimes that means putting udders on a food truck. It's not exactly the life changing stuff I wanted to do, but somebody needed it and I made it better. If the project itself doesn't appeal to me I usually find fullfillment in learning new skills to accomplish the task. If the task is  interesting enough, I'll learn to do it and not charge them because it's my first try. When people trust me, and throw me at a problem, they usually end up having to hire a cleaning service– to pick their jaws up off the floor.
```

**Replace with:**
```
AI systems, interfaces, and brands. Independent research in AI architecture, locally-sovereign systems, and agent tooling — alongside client work in UI, branding, and marketing.
```

---

## 3. Add Research Section to Portfolio Page

**File:** `app/portfolio/page.tsx` or `pages/portfolio.tsx`

**Location:** Insert this section ABOVE the existing `## UI` section. It must appear first on the page.

**Add the following block:**

```tsx
<section>
  <h2>Research</h2>
  <a href="/shezzi">
    <img
      src="/ProjectThumbnails/shezzi-thumb.webp"
      alt="Shezzi — Locally-sovereign AI system built on consumer hardware. Multi-model architecture, custom database layer, and agent IDE. In progress."
    />
  </a>
</section>
```

**Notes:**
- The thumbnail image `/ProjectThumbnails/shezzi-thumb.webp` needs to be created and added to the public folder. Use any existing project screenshot or a placeholder until a proper thumbnail is ready.
- The `href` must link to `/shezzi` — this page already exists.
- Match the exact JSX structure and className conventions used by the existing UI, Branding, and Marketing sections directly below this insertion point. Do not invent new styles — copy the pattern already in use.

---

## 4. Rename "TG" Nav Item

**File:** The shared navigation component. Look for a file named `Navbar.tsx`, `Nav.tsx`, `Header.tsx`, or similar in `components/` or `app/` directory.

**Find:** The nav link that reads `TG`

**Current (approximate):**
```tsx
<a href="/tg">TG</a>
```

**Action:** Determine what the `/tg` page contains, then rename the label to match its actual content. For example:
- If it contains typography or type work: rename to `Type`
- If it contains motion graphics or video: rename to `Motion`
- If it contains experimental or generative work: rename to `Experiments`

**Do not guess.** Open `/tg` page file, read its content, then choose the label. Update only the visible link text, not the href.

---

## 5. Update Homepage Meta Description for SEO

**File:** `app/page.tsx` or `pages/index.tsx`

**Find:** The existing meta description tag or add one if missing.

**Set to:**
```
Khaled Momani — AI Systems Engineer and Designer based in San Antonio, TX. Building Shezzi, a locally-sovereign multi-model AI system on consumer hardware. Available for hire.
```

**If using Next.js App Router:**
```ts
export const metadata = {
  title: "Khaled Momani — AI Systems Engineer & Designer",
  description: "Khaled Momani — AI Systems Engineer and Designer based in San Antonio, TX. Building Shezzi, a locally-sovereign multi-model AI system on consumer hardware. Available for hire.",
}
```

**If using Next.js Pages Router:**
```tsx
<meta name="description" content="Khaled Momani — AI Systems Engineer and Designer based in San Antonio, TX. Building Shezzi, a locally-sovereign multi-model AI system on consumer hardware. Available for hire." />
```

---

## 6. Update Portfolio Page Meta Title and Description

**File:** `app/portfolio/page.tsx` or `pages/portfolio.tsx`

**Set title and description to:**
```
title: "Portfolio | Khaled Momani — AI Systems Engineer & Designer"
description: "AI systems research, UI design, branding, and marketing work by Khaled Momani. Includes Shezzi, a locally-sovereign AI system built on consumer hardware."
```

---

## Completion Checklist

- [ ] Homepage browser tab reads "Khaled Momani — AI Systems Engineer & Designer"
- [ ] Homepage meta description updated
- [ ] Portfolio intro copy replaced
- [ ] Research section appears above UI section on portfolio page
- [ ] Research section links correctly to /shezzi
- [ ] Shezzi thumbnail image exists in /public/ProjectThumbnails/
- [ ] TG nav item renamed to descriptive label
- [ ] Portfolio page meta title and description updated