import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ongoingProjectsSection',
  title: 'Ongoing Projects Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Ongoing Projects"',
      initialValue: 'Ongoing Projects',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ongoingProject',
          fields: [
            { name: 'title', title: 'Project Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'status', title: 'Status', type: 'string', options: { list: ['Planning', 'In Progress', 'On Hold', 'Completed'] } },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
            { name: 'progress', title: 'Progress %', type: 'number', description: '0-100' },
            { name: 'link', title: 'Project Link', type: 'url' },
            { name: 'order', title: 'Display Order', type: 'number' },
          ],
          preview: {
            select: { title: 'title', status: 'status', progress: 'progress' },
            prepare({ title, status, progress = 0 }) {
              return { title: title || 'Untitled', subtitle: `${status} • ${progress}%` }
            },
          },
        },
      ],
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
      count: 'projects.length',
    },
    prepare({ title, count = 0 }) {
      return {
        title: title || 'Ongoing Projects',
        subtitle: `${count} project${count === 1 ? '' : 's'}`,
      }
    },
  },
})
