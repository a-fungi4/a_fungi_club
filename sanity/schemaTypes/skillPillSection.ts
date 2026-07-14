import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skillPillSection',
  title: 'Skill Pills Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Skills", "Technologies"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skill',
          fields: [
            { name: 'name', title: 'Skill Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'category', title: 'Category', type: 'string', description: 'e.g., "Design", "Development"' },
            { name: 'level', title: 'Proficiency Level', type: 'number', description: '1-10' },
            { name: 'icon', title: 'Icon Component', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'category' },
            prepare({ title, subtitle }) {
              return { title: title || 'Unnamed', subtitle }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Row', value: 'row' },
          { title: 'Grid', value: 'grid' },
          { title: 'Cloud', value: 'cloud' },
        ],
        layout: 'radio',
      },
      initialValue: 'row',
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
      skillCount: 'skills.length',
    },
    prepare({ title, skillCount = 0 }) {
      return {
        title: title || 'Skills',
        subtitle: `${skillCount} skill${skillCount === 1 ? '' : 's'}`,
      }
    },
  },
})
