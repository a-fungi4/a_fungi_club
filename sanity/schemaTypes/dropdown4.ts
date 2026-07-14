import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dropdown4',
  title: 'Dropdown 4 (Full Width)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconComponent',
      title: 'Icon Component (SVG)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Main Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
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
      sectionCount: 'sections.length',
    },
    prepare({ title, sectionCount = 0 }) {
      return {
        title: title || 'Dropdown 4',
        subtitle: `${sectionCount} section${sectionCount === 1 ? '' : 's'}`,
      }
    },
  },
})
