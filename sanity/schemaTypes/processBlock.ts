import { defineField, defineType } from 'sanity'

export const PROCESS_ICONS = [
  { title: 'Plasticity', value: 'PRPlasticity' },
  { title: 'InsideOut', value: 'PRInsideOut' },
  { title: 'Automation', value: 'PRAutomation' },
]

export const processBlockType = defineType({
  name: 'processBlock',
  title: 'Process Blocks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Process Name',
      type: 'string',
      options: {
        list: [
          { title: 'Plasticity', value: 'Plasticity' },
          { title: 'InsideOut', value: 'InsideOut' },
          { title: 'Automation', value: 'Automation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: PROCESS_ICONS,
      },
      initialValue: 'PRPlasticity',
    }),
    defineField({
      name: 'content',
      title: 'Process Description',
      type: 'array',
      of: [{ 
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H3', value: 'h3'},
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
        },
      }],
      description: 'Full description text for this process philosophy',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: '1 = first, 2 = second, 3 = third',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({ title, icon }) {
      const iconLabel = PROCESS_ICONS.find(i => i.value === icon)?.title || icon
      return {
        title: title,
        subtitle: `Icon: ${iconLabel}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})
