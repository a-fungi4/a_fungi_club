import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'companionGallerySection',
  title: 'Companion Gallery Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'companions',
      title: 'Companion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'companion',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'title', title: 'Title/Role', type: 'string' },
            { name: 'bio', title: 'Bio', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'url' }] },
            { name: 'order', title: 'Display Order', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'title' },
            prepare({ title, subtitle }) {
              return { title: title || 'Unnamed', subtitle }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
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
      count: 'companions.length',
    },
    prepare({ title, count = 0 }) {
      return {
        title: title || 'Companion Gallery',
        subtitle: `${count} companion${count === 1 ? '' : 's'}`,
      }
    },
  },
})
