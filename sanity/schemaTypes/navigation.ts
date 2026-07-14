import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      initialValue: 'Main Navigation',
      description: 'Internal name for this navigation set',
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'label', 
            title: 'Label', 
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          { 
            name: 'link', 
            title: 'Link', 
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'URL path (e.g., /about) or full URL for external links',
          },
          { 
            name: 'icon', 
            title: 'Icon Component', 
            type: 'string',
            description: 'Name of the React icon component (e.g., AboutIcon, ArtIcon)',
          },
          { 
            name: 'isExternal', 
            title: 'External Link', 
            type: 'boolean',
            initialValue: false,
            description: 'Opens in new tab',
          },
          {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order in navigation',
          },
        ],
        preview: {
          select: {
            label: 'label',
            link: 'link',
            isExternal: 'isExternal',
          },
          prepare({ label, link, isExternal }) {
            return {
              title: label,
              subtitle: `${link}${isExternal ? ' (external)' : ''}`,
            }
          },
        },
      }],
      description: 'Drag items to reorder',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Navigation',
      }
    },
  },
})
