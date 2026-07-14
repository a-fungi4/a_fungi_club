import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dropdown3',
  title: 'Dropdown 3 (Single Column)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dropdown3Item',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'iconComponent', title: 'Icon Component', type: 'string' },
          ],
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
        title: title || 'Dropdown 3',
        subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
      }
    },
  },
})
