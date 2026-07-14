#!/usr/bin/env node
/**
 * Migration script to import existing content into Sanity
 * Run: npx ts-node scripts/migrate-content.ts
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

// Configure Sanity client with WRITE token
const client = createClient({
  projectId: 'usdp8jlt',
  dataset: 'production',
  apiVersion: '2025-05-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // Need a token with write permissions
  useCdn: false,
})

// Example: Create a page document
async function createPage(
  title: string,
  slug: string,
  pageType: string,
  sections: any[]
) {
  const doc = {
    _type: 'page',
    title,
    slug: { current: slug },
    pageType,
    sections,
    metaTitle: title,
    publishedAt: new Date().toISOString(),
  }

  try {
    const result = await client.create(doc)
    console.log(`Created page: ${result._id}`)
    return result
  } catch (error) {
    console.error(`Failed to create page ${slug}:`, error)
    throw error
  }
}

// Example: Create site settings
async function createSiteSettings() {
  const doc = {
    _type: 'siteSettings',
    title: 'A Fungi Club',
    defaultMetaDescription: 'Your site description here',
    email: 'khaled@b8momani.com',
    socialLinks: {
      instagram: 'https://instagram.com/afungiclub',
    },
  }

  try {
    // Check if site settings already exists
    const existing = await client.fetch('*[_type == "siteSettings"][0]')
    if (existing) {
      console.log('Site settings already exists')
      return existing
    }

    const result = await client.create(doc)
    console.log(`Created site settings: ${result._id}`)
    return result
  } catch (error) {
    console.error('Failed to create site settings:', error)
    throw error
  }
}

// Main migration function
async function migrate() {
  console.log('Starting migration...')

  // 1. Create site settings
  await createSiteSettings()

  // 2. Create pages (you'll need to extract content from existing files)
  // This is an example - you'd parse actual content from your pages

  console.log('Migration complete!')
}

migrate().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
