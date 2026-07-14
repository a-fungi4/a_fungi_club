import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dropdown1',
  title: 'Dropdown 1 (Bio/Process)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "BIO", "Process"',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content shown when expanded',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown in collapsed state (e.g., headshot)',
    }),
    defineField({
      name: 'placeholderIcon',
      title: 'Placeholder Icon (SVG)',
      type: 'string',
      description: 'SVG component name if using icon instead of image (e.g., "ProcessIcon")',
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
      hasImage: 'placeholder',
      hasIcon: 'placeholderIcon',
    },
    prepare({ title, hasImage, hasIcon }) {
      return {
        title: title || 'Dropdown 1',
        subtitle: hasImage ? 'With image' : hasIcon ? 'With icon' : 'Text only',
      }
    },
  },
})
