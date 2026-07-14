import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prototypeSection',
  title: 'Prototype Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Prototype Demo"',
    }),
    defineField({
      name: 'prototypeType',
      title: 'Prototype Type',
      type: 'string',
      options: {
        list: [
          { title: 'Figma Embed', value: 'figma' },
          { title: 'Video', value: 'video' },
          { title: 'Interactive', value: 'interactive' },
        ],
        layout: 'radio',
      },
      initialValue: 'figma',
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma Embed URL',
      type: 'url',
      description: 'Figma prototype embed URL',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      prototypeType: 'prototypeType',
    },
    prepare({ title, prototypeType }) {
      return {
        title: title || 'Prototype',
        subtitle: prototypeType || 'figma',
      }
    },
  },
})
