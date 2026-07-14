import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lightBoxSection',
  title: 'Light Box Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
    }),
    defineField({
      name: 'customClass',
      title: 'Custom CSS Class',
      type: 'string',
      initialValue: 'LightPurpleBox',
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
      buttonText: 'buttonText',
    },
    prepare({ title, buttonText }) {
      return {
        title: title || 'Light Box',
        subtitle: buttonText || '',
      }
    },
  },
})
