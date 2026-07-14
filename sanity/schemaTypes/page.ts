import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Art Gallery', value: 'art' },
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Project Page', value: 'project' },
          { title: 'Generic', value: 'generic' },
        ],
      },
      initialValue: 'generic',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Browser tab title - leave empty to use page title',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: '1200x630 recommended for social sharing',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'reference', to: { type: 'pageSection' } }
      ],
      description: 'Add and arrange sections for this page (drag to reorder)',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Only published pages are visible on the site',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      pageType: 'pageType',
      isPublished: 'isPublished',
    },
    prepare({ title, slug, pageType, isPublished }) {
      return {
        title: `${title} ${isPublished ? '✅' : '⚠️' }`,
        subtitle: `/${slug} • ${pageType}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Page Type',
      name: 'pageType',
      by: [
        { field: 'pageType', direction: 'asc' }
      ]
    }
  ]
})
