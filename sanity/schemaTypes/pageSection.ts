import { defineField, defineType } from 'sanity'

export const SECTION_TYPES = [
  { title: 'Hero Section', value: 'hero' },
  { title: 'Banner', value: 'banner' },
  { title: 'Bio/Dropdown', value: 'bio' },
  { title: 'Art Project Grid', value: 'artGrid' },
  { title: 'Portfolio Showcase', value: 'portfolio' },
  { title: 'Process Blocks', value: 'process' },
  { title: 'Resource Links', value: 'resources' },
  { title: 'Text Content', value: 'text' },
  { title: 'Image Gallery', value: 'gallery' },
  { title: 'Dropdown Section', value: 'dropdown' },
  { title: 'Carousel', value: 'carousel' },
  { title: 'Contact Form', value: 'contactForm' },
  { title: 'Highlighted Project', value: 'highlightedProject' },
  { title: 'Prototype Demo', value: 'prototype' },
  { title: 'Companion Gallery', value: 'companionGallery' },
  { title: 'Skill Pills', value: 'skillPills' },
  { title: 'Light Box', value: 'lightBox' },
  { title: 'HP Button', value: 'hpButton' },
  { title: 'HP Textbox', value: 'hpTextbox' },
  { title: 'Ongoing Projects', value: 'ongoingProjects' },
]

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Page Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for this section (not shown on site)',
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: SECTION_TYPES,
      },
      validation: (Rule) => Rule.required(),
      description: 'Determines which component renders this section',
    }),
    // Hero-specific fields
    defineField({
      name: 'heroContent',
      title: 'Hero Content',
      type: 'reference',
      to: { type: 'hero' },
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
      description: 'Select a hero configuration',
    }),
    // Banner-specific fields
    defineField({
      name: 'bannerContent',
      title: 'Banner Content',
      type: 'reference',
      to: { type: 'banner' },
      hidden: ({ parent }) => parent?.sectionType !== 'banner',
      description: 'Select a banner configuration',
    }),
    // Bio-specific fields
    defineField({
      name: 'bioContent',
      title: 'Bio Content',
      type: 'reference',
      to: { type: 'bio' },
      hidden: ({ parent }) => parent?.sectionType !== 'bio',
      description: 'Select a bio section configuration',
    }),
    // Process-specific fields
    defineField({
      name: 'processBlocks',
      title: 'Process Blocks',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'processBlock' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'process',
      description: 'Select process blocks to display (Plasticity, InsideOut, Automation)',
    }),
    // Art Grid - references art projects
    defineField({
      name: 'artProjects',
      title: 'Art Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'artProject' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'artGrid',
      description: 'Select art projects to display',
    }),
    // Portfolio - references portfolio projects
    defineField({
      name: 'portfolioProjects',
      title: 'Portfolio Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'portfolioProject' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'portfolio',
      description: 'Select portfolio projects to display',
    }),
    // Resources - links and dropdowns
    defineField({
      name: 'resourceLinks',
      title: 'Resource Links',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'resourceLink' } }],
      hidden: ({ parent }) => parent?.sectionType !== 'resources',
      description: 'Select resource links to display',
    }),
    // Simple text content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ 
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Number', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Code', value: 'code'},
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
      hidden: ({ parent }) => !['text'].includes(parent?.sectionType),
      description: 'Rich text content',
    }),
    // Gallery images
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' },
        ],
      }],
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
      description: 'Images for the gallery',
    }),
    // New section type references
    defineField({
      name: 'dropdownContent',
      title: 'Dropdown Content',
      type: 'reference',
      to: { type: 'dropdownSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'dropdown',
    }),
    defineField({
      name: 'carouselContent',
      title: 'Carousel Content',
      type: 'reference',
      to: { type: 'carouselSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'carousel',
    }),
    defineField({
      name: 'contactFormContent',
      title: 'Contact Form Content',
      type: 'reference',
      to: { type: 'contactFormSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'contactForm',
    }),
    defineField({
      name: 'highlightedProjectContent',
      title: 'Highlighted Project Content',
      type: 'reference',
      to: { type: 'highlightedProjectSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'highlightedProject',
    }),
    defineField({
      name: 'prototypeContent',
      title: 'Prototype Content',
      type: 'reference',
      to: { type: 'prototypeSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'prototype',
    }),
    defineField({
      name: 'companionGalleryContent',
      title: 'Companion Gallery Content',
      type: 'reference',
      to: { type: 'companionGallerySection' },
      hidden: ({ parent }) => parent?.sectionType !== 'companionGallery',
    }),
    defineField({
      name: 'skillPillsContent',
      title: 'Skill Pills Content',
      type: 'reference',
      to: { type: 'skillPillSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'skillPills',
    }),
    defineField({
      name: 'lightBoxContent',
      title: 'Light Box Content',
      type: 'reference',
      to: { type: 'lightBoxSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'lightBox',
    }),
    defineField({
      name: 'hpButtonContent',
      title: 'HP Button Content',
      type: 'reference',
      to: { type: 'hpButtonSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'hpButton',
    }),
    defineField({
      name: 'hpTextboxContent',
      title: 'HP Textbox Content',
      type: 'reference',
      to: { type: 'hpTextboxSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'hpTextbox',
    }),
    defineField({
      name: 'ongoingProjectsContent',
      title: 'Ongoing Projects Content',
      type: 'reference',
      to: { type: 'ongoingProjectsSection' },
      hidden: ({ parent }) => parent?.sectionType !== 'ongoingProjects',
    }),
    // Custom CSS class for styling
    defineField({
      name: 'customClass',
      title: 'Custom CSS Class',
      type: 'string',
      description: 'Optional CSS class for custom styling',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
    },
    prepare({ title, sectionType }) {
      const typeLabel = SECTION_TYPES.find(t => t.value === sectionType)?.title || sectionType
      return {
        title: title,
        subtitle: typeLabel,
      }
    },
  },
})
