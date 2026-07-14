import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPages, getSiteSettings } from '@/lib/sanity.fetch'
import { PageRenderer } from '@/components/PageRenderer'
import type { Section } from '@/components/PageRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all pages at build time
export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((page: { slug: { current: string } }) => ({
    slug: page.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  // Get site settings for defaults
  const siteSettings = await getSiteSettings()

  const ogImage = page.ogImage?.asset?.url 
    || siteSettings?.defaultOgImage?.asset?.url
    || '/og-default.png'

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || siteSettings?.defaultMetaDescription,
    alternates: {
      canonical: `https://www.a-fungi.club/${page.slug.current}`,
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || siteSettings?.defaultMetaDescription,
      url: `https://www.a-fungi.club/${page.slug.current}`,
      images: [{ 
        url: ogImage, 
        width: 1200, 
        height: 630,
        alt: page.title
      }],
    },
  }
}

// Main page component
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      <PageRenderer sections={page.sections || []} />
    </main>
  )
}
