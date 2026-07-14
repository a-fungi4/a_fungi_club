import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'carouselSection',
  title: 'Carousel Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Carousel section title (optional)',
    }),
    defineField({
      name: 'variant',
      title: 'Carousel Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Product', value: 'product' },
          { title: 'Project', value: 'project' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'items',
      title: 'Carousel Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'carouselItem',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'link', title: 'Link URL', type: 'url' },
            { name: 'buttonText', title: 'Button Text', type: 'string' },
            { name: 'order', title: 'Display Order', type: 'number' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle' },
            prepare({ title, subtitle }) {
              return { title: title || 'Untitled', subtitle: subtitle }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'autoPlay',
      title: 'Auto Play',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showDots',
      title: 'Show Navigation Dots',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'customClass',
      title: 'Custom CSS Class',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant',
      itemCount: 'items.length',
    },
    prepare({ title, variant, itemCount = 0 }) {
      return {
        title: title || 'Carousel',
        subtitle: `${variant} • ${itemCount} items`,
      }
    },
  },
})
