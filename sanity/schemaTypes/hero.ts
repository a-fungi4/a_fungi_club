import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title text (uses HeroSection component default if empty)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle text',
    }),
    defineField({
      name: 'backgroundAnimation',
      title: 'Background Animation',
      type: 'string',
      options: {
        list: [
          { title: 'Mycelium', value: 'mycelium' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'mycelium',
      description: 'Background animation effect for the hero section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      backgroundAnimation: 'backgroundAnimation',
    },
    prepare({ title, backgroundAnimation }) {
      return {
        title: title || 'Default Hero',
        subtitle: `Animation: ${backgroundAnimation}`,
      }
    },
  },
})
