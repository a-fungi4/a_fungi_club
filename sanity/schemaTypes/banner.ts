import { defineField, defineType } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The heading text displayed in the banner',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'General', value: 'general' },
        ],
      },
      initialValue: 'general',
      description: 'Home variant has special styling',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
      rows: 6,
      description: 'Main content text displayed in the banner',
    }),
    defineField({
      name: 'projectImages',
      title: 'Project Thumbnails',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { 
            name: 'alt', 
            title: 'Alt Text', 
            type: 'string',
            description: 'Accessibility text for the image',
          },
          { 
            name: 'link', 
            title: 'Link URL', 
            type: 'url',
            description: 'Where the image links to',
          },
        ],
      }],
      description: 'Project thumbnails displayed in the banner (for home variant)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (optional)',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL for the call-to-action button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant',
    },
    prepare({ title, variant }) {
      return {
        title: title,
        subtitle: `Variant: ${variant}`,
      }
    },
  },
})
