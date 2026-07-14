import { defineField, defineType } from 'sanity'

export const RESOURCE_ICONS = [
  { title: 'Video', value: 'RLBIconVideo' },
  { title: 'Reading', value: 'RLBIconReading' },
  { title: 'Code', value: 'RLBIconCode' },
]

export const RESOURCE_CATEGORIES = [
  { title: 'Figma', value: 'figma' },
  { title: 'Cursor AI', value: 'cursor' },
  { title: 'Deployment', value: 'deployment' },
  { title: 'Beginner Guides', value: 'beginner' },
  { title: 'Best Practices', value: 'best-practices' },
  { title: 'Reference Guide', value: 'reference' },
  { title: 'Tools', value: 'tools' },
  { title: 'Getting Started', value: 'getting-started' },
  { title: 'Tips', value: 'tips' },
]

export const resourceLinkType = defineType({
  name: 'resourceLink',
  title: 'Resource Links',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Text displayed for this link',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: RESOURCE_ICONS,
      },
      initialValue: 'RLBIconReading',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: RESOURCE_CATEGORIES,
      },
      description: 'Groups related resources together',
    }),
    defineField({
      name: 'isMiniDropdown',
      title: 'Is Mini Dropdown',
      type: 'boolean',
      initialValue: false,
      description: 'If true, this link expands to show dropdown content',
    }),
    defineField({
      name: 'dropdownContent',
      title: 'Dropdown Content',
      type: 'array',
      of: [{ 
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
        ],
      }],
      hidden: ({ parent }) => !parent?.isMiniDropdown,
      description: 'Content shown when dropdown is expanded',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Within category ordering',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      category: 'category',
      isMiniDropdown: 'isMiniDropdown',
    },
    prepare({ label, category, isMiniDropdown }) {
      return {
        title: label,
        subtitle: `${category || 'No category'}${isMiniDropdown ? ' • dropdown' : ''}`,
      }
    },
  },
})
