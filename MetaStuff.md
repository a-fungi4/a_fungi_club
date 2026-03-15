# SEO Static HTML Prompt
## For Gemini Flash — Antigravity Context

Paste the following prompt directly into Gemini Flash. Do not modify it.

---

**TASK: Add hidden static HTML for SEO to all page components**

You are editing a Next.js website. Your job is to go through each page file and ensure that any content currently rendered or revealed by JavaScript (dropdowns, accordions, tabs, toggles, or any content not present in the initial HTML) is also present as static hidden HTML for SEO and accessibility purposes.

**Rule:** Do not change any visual behavior. Do not touch CSS classes, animations, or JavaScript logic. Only add static hidden content alongside existing dynamic content.

**Method:** For every piece of content that is JavaScript-rendered or conditionally shown, add a visually hidden duplicate using this exact pattern:

**Managing Context** Because this is a large context task, create a comprehensive checklist of all the files that need to be modified and keep track of your progress in this file. Update this file as you go.

```html
<div aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
  [copy the text content here exactly]
</div>
```

Place this hidden div immediately before or after the dynamic element it duplicates. Do not nest it inside interactive elements.

**Go through these files in order:**

1. `app/about/page.tsx` — find the BIO dropdown and PROCESS dropdown (Plasticity, InsideOut, Automation). Extract all text from each and add hidden static versions.

2. `app/portfolio/page.tsx` — check for any content revealed by interaction and add hidden static versions.

3. Any other page file that contains accordion, toggle, tab, or dropdown components.

**After each file:**
- Confirm what content was found that needed hiding
- Confirm what was added
- Move to the next file

**Do not:**
- Modify any component logic
- Change any class names
- Remove any existing elements
- Add visible content
- Summarize or skip — go through every file completely

**Start with** `app/about/page.tsx`. Read the full file first, then make the changes.

---

## Notes for the human running this

- Run this one file at a time if the model loses context
- If Gemini Flash stops mid-file, paste the same prompt again and add: "Continue from where you left off in [filename]"
- After all changes are made, do a `next build` and check the page source (Cmd+U in browser) to confirm the hidden text appears in the raw HTML
- The hidden divs will not be visible to users under any circumstance — the inline style clips them to 1x1 pixel


## Checklist

- [x] `src/app/about/page.tsx`
- [x] `src/app/portfolio/page.tsx`
- [x] `src/app/misc/page.tsx`
- [x] `src/app/home/page.tsx`
- [x] `src/app/automationworkshop/page.tsx`
- [x] `src/app/shezzi/page.tsx`
- [x] `src/app/art/page.tsx`
- [x] `src/app/designtocode/page.tsx`
- [x] `src/app/heirloom/page.tsx`
- [x] `src/app/component-gallery/page.tsx`
- [x] `src/app/page.tsx`
- [x] `src/app/tg/page.tsx`
