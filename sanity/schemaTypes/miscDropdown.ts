import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'miscDropdown',
  title: 'Misc Dropdown (Projects)',
  type: 'document',
  fields: [
    defineField({
      name: 'defaultText',
      title: 'Default Text',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Text shown when collapsed',
    }),
    defineField({
      name: 'hoverText',
      title: 'Hover Text',
      type: 'string',
      description: 'Text shown on hover',
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
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'miscItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'image', title: 'Preview Image', type: 'image', options: { hotspot: true } },
            { name: 'description', title: 'Description', type: 'text' },
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
      title: 'defaultText',
      itemCount: 'content.length',
    },
    prepare({ title, itemCount = 0 }) {
      return {
        title: title || 'Misc Dropdown',
        subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
      }
    },
  },
})
