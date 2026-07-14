import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dropdownSection',
  title: 'Dropdown Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Dropdown title (e.g., "Figma", "Resources")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Dropdown Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Dropdown 1 (Bio/Process)', value: 'dropdown1' },
          { title: 'Dropdown 2 (Resources Grid)', value: 'dropdown2' },
          { title: 'Dropdown 3 (Single Column)', value: 'dropdown3' },
          { title: 'Dropdown 4 (Full Width)', value: 'dropdown4' },
          { title: 'Misc Dropdown (Projects)', value: 'miscDropdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'dropdown2',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconComponent',
      title: 'Icon Component Name',
      type: 'string',
      description: 'React component name if using SVG icon (e.g., "FFigma", "FCursor")',
    }),
    defineField({
      name: 'content',
      title: 'Dropdown Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dropdownItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon Component', type: 'string', description: 'Icon name (e.g., "RLBIconVideo", "RLBIconReading")' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'isMiniDropdown', title: 'Is Mini Dropdown', type: 'boolean', initialValue: false },
            { name: 'miniDropdownContent', title: 'Mini Dropdown Content', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }) => !parent?.isMiniDropdown },
          ],
        },
      ],
    }),
    defineField({
      name: 'richTextContent',
      title: 'Rich Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'For Dropdown 1 style bio/process content',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'image',
      description: 'Image shown in collapsed state (e.g., bio headshot)',
      options: { hotspot: true },
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
      variant: 'variant',
      isActive: 'isActive',
    },
    prepare({ title, variant, isActive }) {
      return {
        title: title || 'Untitled Dropdown',
        subtitle: `${variant || 'dropdown2'} ${isActive ? '' : '(inactive)'}`,
      }
    },
  },
})
