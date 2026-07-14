import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of your website',
      initialValue: 'A Fungi Club',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Default description for SEO when page-specific description is not set',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Default image used when sharing on social media (1200x630 recommended)',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { 
          name: 'github', 
          title: 'GitHub', 
          type: 'url',
          description: 'Full URL including https://'
        },
        { 
          name: 'linkedin', 
          title: 'LinkedIn', 
          type: 'url',
          description: 'Full URL including https://'
        },
        { 
          name: 'instagram', 
          title: 'Instagram', 
          type: 'url',
          description: 'Full URL including https://'
        },
        { 
          name: 'behance', 
          title: 'Behance', 
          type: 'url',
          description: 'Full URL including https://'
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
