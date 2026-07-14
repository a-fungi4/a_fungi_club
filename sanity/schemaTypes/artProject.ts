import { defineField, defineType } from 'sanity'

export const ART_PROJECT_ICONS = [
  { title: 'Free Therapy', value: 'FreeTherapy' },
  { title: '8th N Lucas', value: 'EighthNLucas' },
  { title: 'Lil Biscoff', value: 'LilBiscoff' },
  { title: 'Coloring', value: 'Coloring' },
  { title: 'Tacky Garbage', value: 'TackyGarbageBig' },
]

export const artProjectType = defineType({
  name: 'artProject',
  title: 'Art Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description displayed under the title',
    }),
    defineField({
      name: 'iconComponent',
      title: 'Icon Component',
      type: 'string',
      options: {
        list: ART_PROJECT_ICONS,
      },
      description: 'Select the SVG icon component for this project',
    }),
    defineField({
      name: 'customImage',
      title: 'Custom Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => !!parent?.iconComponent,
      description: 'Alternative to icon component - upload a custom image',
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Where the project links to (Behance, OpenSea, etc.)',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active projects are shown',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      iconComponent: 'iconComponent',
      isActive: 'isActive',
    },
    prepare({ title, iconComponent, isActive }) {
      const iconLabel = ART_PROJECT_ICONS.find(i => i.value === iconComponent)?.title || 'No icon'
      return {
        title: `${title} ${isActive ? '' : '(inactive)'}`,
        subtitle: iconLabel,
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
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})
