import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dropdown2',
  title: 'Dropdown 2 (Resources Grid)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "Figma", "Cursor AI", "Deployment"',
    }),
    defineField({
      name: 'icon',
      title: 'Section Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconComponent',
      title: 'Icon Component (SVG)',
      type: 'string',
      description: 'SVG icon component name (e.g., "FFigma", "FCursor", "FNextVercel")',
    }),
    defineField({
      name: 'items',
      title: 'Resource Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resourceItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'url', title: 'URL', type: 'url', validation: Rule => Rule.required() },
            { name: 'iconComponent', title: 'Icon (RLB)', type: 'string', description: 'ResourceLinkButton icon (e.g., "RLBIconVideo", "RLBIconReading", "RLBIconCode")' },
            { name: 'isMiniDropdown', title: 'Is Mini Dropdown', type: 'boolean', initialValue: false },
            { name: 'miniContent', title: 'Mini Dropdown Content', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }) => !parent?.isMiniDropdown },
          ],
          preview: {
            select: { title: 'label', isMini: 'isMiniDropdown' },
            prepare({ title, isMini }) {
              return { title: title || 'Untitled', subtitle: isMini ? 'Mini dropdown' : 'Link' }
            },
          },
        },
      ],
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
      itemCount: 'items.length',
    },
    prepare({ title, itemCount = 0 }) {
      return {
        title: title || 'Dropdown 2',
        subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
      }
    },
  },
})
