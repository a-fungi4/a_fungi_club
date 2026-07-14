import { groq } from 'next-sanity'

// Fetch a page by slug with all sections
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    pageType,
    metaTitle,
    metaDescription,
    ogImage {
      asset-> {
        _id,
        url
      }
    },
    sections[]-> {
      _id,
      title,
      sectionType,
      customClass,
      content,
      images[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      bannerContent-> {
        title,
        variant,
        description,
        projectImages[] {
          asset-> {
            _id,
            url
          },
          alt,
          link
        }
      },
      heroContent-> {
        title,
        subtitle,
        backgroundAnimation
      },
      bioContent-> {
        title,
        content,
        headshot {
          asset-> {
            _id,
            url
          }
        }
      },
      processBlocks[]-> {
        title,
        icon,
        content
      },
      artProjects[]-> {
        title,
        description,
        iconComponent,
        link,
        iconPosition,
        order
      },
      portfolioProjects[]-> {
        title,
        slug,
        category,
        thumbnail {
          asset-> {
            _id,
            url
          }
        },
        shortDescription,
        fullDescription,
        projectLink,
        githubLink,
        featured,
        order
      },
      resourceLinks[]-> {
        label,
        url,
        icon,
        category,
        isMiniDropdown,
        dropdownContent
      }
    }
  }
`

// Fetch all page slugs for static generation
export const allPagesQuery = groq`
  *[_type == "page" && isPublished == true] {
    slug {
      current
    }
  }
`

// Fetch site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    defaultMetaDescription,
    defaultOgImage {
      asset-> {
        url
      }
    },
    contactEmail,
    socialLinks {
      github,
      linkedin,
      instagram,
      behance
    }
  }
`

// Fetch navigation
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    items[] {
      label,
      link,
      icon,
      isExternal
    }
  }
`

// Fetch all art projects
export const allArtProjectsQuery = groq`
  *[_type == "artProject"] | order(order asc) {
    _id,
    title,
    description,
    iconComponent,
    link,
    iconPosition,
    order
  }
`

// Fetch all portfolio projects
export const allPortfolioProjectsQuery = groq`
  *[_type == "portfolioProject"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    thumbnail {
      asset-> {
        url
      }
    },
    shortDescription,
    fullDescription,
    projectLink,
    githubLink,
    featured,
    order
  }
`

// Fetch process blocks
export const allProcessBlocksQuery = groq`
  *[_type == "processBlock"] {
    _id,
    title,
    icon,
    content
  }
`
