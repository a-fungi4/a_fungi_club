import { client } from './sanity'
import {
  pageBySlugQuery,
  allPagesQuery,
  siteSettingsQuery,
  navigationQuery,
  allArtProjectsQuery,
  allPortfolioProjectsQuery,
  allProcessBlocksQuery,
} from './sanity.queries'

// Cache configuration - revalidate every hour by default
// Can be overridden by webhook calls
const DEFAULT_REVALIDATE = 3600

export async function getPageBySlug(slug: string) {
  return client.fetch(pageBySlugQuery, { slug }, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: [`page:${slug}`],
    },
  })
}

export async function getAllPages() {
  return client.fetch(allPagesQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['pages'],
    },
  })
}

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['siteSettings'],
    },
  })
}

export async function getNavigation() {
  return client.fetch(navigationQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['navigation'],
    },
  })
}

export async function getAllArtProjects() {
  return client.fetch(allArtProjectsQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['artProjects'],
    },
  })
}

export async function getAllPortfolioProjects() {
  return client.fetch(allPortfolioProjectsQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['portfolioProjects'],
    },
  })
}

export async function getAllProcessBlocks() {
  return client.fetch(allProcessBlocksQuery, {}, {
    next: {
      revalidate: DEFAULT_REVALIDATE,
      tags: ['processBlocks'],
    },
  })
}
