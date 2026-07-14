import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'highlightedProjectSection',
  title: 'Highlighted Project Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Featured Project"',
    }),
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectSubtitle',
      title: 'Project Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      title: 'Skills/Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., ["React", "Next.js", "Sanity"]',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured project',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
      title: 'projectName',
      subtitle: 'title',
      featured: 'featured',
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: title || 'Untitled Project',
        subtitle: `${subtitle || ''} ${featured ? '★ Featured' : ''}`,
      }
    },
  },
})
