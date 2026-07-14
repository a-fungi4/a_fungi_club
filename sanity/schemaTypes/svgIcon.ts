import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'svgIcon',
  title: 'SVG Icon Library',
  type: 'document',
  description: 'Manage inline SVG icons for use across the site',
  fields: [
    defineField({
      name: 'name',
      title: 'Icon Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Unique identifier (e.g., "FreeTherapy", "PRPlasticity")',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Art Project Icons', value: 'art' },
          { title: 'Process Icons', value: 'process' },
          { title: 'Resource Icons (RLB)', value: 'resource' },
          { title: 'Section Icons', value: 'section' },
          { title: 'Social Icons', value: 'social' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'other',
    }),
    defineField({
      name: 'svgCode',
      title: 'SVG Code',
      type: 'text',
      description: 'Paste the SVG markup here',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Default Width',
      type: 'number',
      initialValue: 24,
    }),
    defineField({
      name: 'height',
      title: 'Default Height',
      type: 'number',
      initialValue: 24,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'What this icon represents',
    }),
    defineField({
      name: 'usage',
      title: 'Used In',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Component names that use this icon (e.g., ["ArtProject", "Dropdown2"])',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
    },
    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        art: '🎨 Art',
        process: '⚙️ Process',
        resource: '📚 Resource',
        section: '📦 Section',
        social: '🔗 Social',
        other: '📋 Other',
      }
      return {
        title: title || 'Unnamed Icon',
        subtitle: categoryLabels[category || 'other'] || category,
      }
    },
  },
})
