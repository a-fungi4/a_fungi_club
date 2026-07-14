import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'A Fungi Club CMS',

  projectId: 'usdp8jlt',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio configuration
  document: {
    // New documents are unpublished by default
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => item.templateId !== 'siteSettings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      // Prevent deleting site settings
      if (schemaType === 'siteSettings') {
        return prev.filter(({ action }) => !action || !['delete'].includes(action))
      }
      return prev
    },
  },
})
