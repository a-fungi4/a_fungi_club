import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hpButtonSection',
  title: 'HP Button Section',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: { hotspot: true },
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
      title: 'label',
      variant: 'variant',
    },
    prepare({ title, variant }) {
      return {
        title: title || 'Button',
        subtitle: variant || 'primary',
      }
    },
  },
})
