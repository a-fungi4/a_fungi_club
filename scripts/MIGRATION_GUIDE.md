# Page Migration Guide

This guide walks you through migrating pages from hardcoded `.tsx` files to Sanity CMS, **one page at a time** with debugging.

## Prerequisites

1. **Sanity Write Token** (required for migrations)
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project → API → Tokens
   - Add new token with **Editor** role
   - Copy the token

2. **Set Environment Variable**
   ```bash
   export SANITY_API_WRITE_TOKEN=your_token_here
   ```

## Migration Steps

### Step 1: Preview the Migration (Dry Run)

Always preview first to see what will be created:

```bash
cd /Users/khaledmomani/Desktop/Github_Repositories/a_fungi_club
npx ts-node scripts/migrate-page.ts home --dry-run
```

This shows:
- What content will be created
- SEO data that will be transferred
- Section breakdown

### Step 2: Migrate with Debug Info

For detailed output during migration:

```bash
npx ts-node scripts/migrate-page.ts home --debug
```

### Step 3: Live Migration

When ready to actually migrate:

```bash
npx ts-node scripts/migrate-page.ts home
```

## Available Pages

| Page | Command | SEO Included |
|------|---------|--------------|
| **Home** | `npx ts-node scripts/migrate-page.ts home` | ✅ Title, Description, OG Image |
| **About** | `npx ts-node scripts/migrate-page.ts about` | ✅ Title, Description |

## What Gets Migrated

### Home Page
- ✅ Page document with full SEO
- ✅ Hero section configuration
- ✅ Banner with project images
- ✅ 3 Dropdown2 sections (Figma, Cursor, Deployment)
- ✅ All resource links with icons

### About Page
- ✅ Page document with full SEO
- ✅ Banner with description
- ✅ Bio dropdown with full text
- ✅ 3 Process blocks (Plasticity, InsideOut, Automation)

## After Migration

### 1. Verify in Sanity Studio
```bash
cd sanity && npm run dev
```
- Open `http://localhost:3333`
- Check Content Library for new documents

### 2. Build Page Sections
In the Studio:
1. Go to **Page Sections**
2. Create a new section
3. Add references to migrated content (hero, banner, dropdowns)
4. Create **Home** page with these sections

### 3. Test the Page
1. Visit `https://www.a-fungi.club/home`
2. Verify content renders correctly
3. Check SEO meta tags in browser dev tools

### 4. Cleanup (When Ready)
Only after confirming everything works:
```bash
rm src/app/home/page.tsx
```

## Troubleshooting

### "Page already exists"
Use `--force` to update:
```bash
npx ts-node scripts/migrate-page.ts home --force
```

### "Failed to create"
Check:
1. Is `SANITY_API_WRITE_TOKEN` set correctly?
2. Does token have **Editor** permissions?
3. Is Sanity Studio running (for verification)?

### Content not appearing
1. Check webhook is configured
2. Verify page is published in Sanity
3. Check browser console for errors

## Migration Workflow

```
Page 1: Home
├── 1. Dry run preview
├── 2. Live migration
├── 3. Build in Sanity Studio
├── 4. Test on live site
├── 5. Fix any issues
└── 6. Delete old page.tsx

Page 2: About
├── (repeat same steps)
...
```

## Rollback

If something goes wrong:
1. Delete documents in Sanity Studio
2. Keep old `page.tsx` file
3. Site continues working with old code

## Need More Pages?

Edit `/scripts/migrate-page.ts` and add new page functions following the existing pattern.
