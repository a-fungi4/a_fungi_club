import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'usdp8jlt',
    dataset: 'production',
  },
  /**
   * Disable auto-updates to prevent version conflicts
   */
  autoUpdates: false,
})
