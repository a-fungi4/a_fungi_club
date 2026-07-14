import { defineField, defineType } from 'sanity'

export const bioType = defineType({
  name: 'bio',
  title: 'Bio Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'BIO',
      description: 'Title displayed on the dropdown',
    }),
    defineField({
      name: 'content',
      title: 'Bio Content',
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
      description: 'The main bio text content',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Bio photo displayed when dropdown is collapsed',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Bio Section',
      }
    },
  },
})
