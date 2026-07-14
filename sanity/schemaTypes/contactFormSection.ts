import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Form section title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Text below the title',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Introductory text for the form',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'name', title: 'Field Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'type', title: 'Field Type', type: 'string', options: { list: ['text', 'email', 'textarea', 'select'] }, initialValue: 'text' },
            { name: 'placeholder', title: 'Placeholder', type: 'string' },
            { name: 'required', title: 'Required', type: 'boolean', initialValue: false },
            { name: 'options', title: 'Options (for select)', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      description: 'Message shown after successful submission',
      initialValue: 'Thank you! Your message has been sent.',
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      description: 'Where form submissions are sent',
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
      recipientEmail: 'recipientEmail',
    },
    prepare({ title, recipientEmail }) {
      return {
        title: title || 'Contact Form',
        subtitle: recipientEmail || 'No recipient set',
      }
    },
  },
})
