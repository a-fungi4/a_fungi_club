import { defineField, defineType } from 'sanity'

export const portfolioProjectType = defineType({
  name: 'portfolioProject',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'URL-friendly identifier for this project',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'UI/UX', value: 'ui' },
          { title: 'Branding', value: 'branding' },
          { title: 'Development', value: 'dev' },
          { title: 'AI Systems', value: 'ai' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Art', value: 'art' },
        ],
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      description: 'Project thumbnail image',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief summary for cards and previews',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ 
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Number', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      }],
      description: 'Full project description for detail view',
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
      description: 'Live project URL',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
      description: 'GitHub repository URL',
    }),
    defineField({
      name: 'figmaLink',
      title: 'Figma Link',
      type: 'url',
      description: 'Figma design file URL',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Featured projects get highlighted placement',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      isActive: 'isActive',
    },
    prepare({ title, category, featured, isActive }) {
      const status = []
      if (featured) status.push('Featured')
      if (!isActive) status.push('Inactive')
      return {
        title: title,
        subtitle: `${category || 'No category'} ${status.length ? `• ${status.join(', ')}` : ''}`,
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
      title: 'Featured First',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})
