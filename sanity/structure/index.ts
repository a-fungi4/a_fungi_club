import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages section
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page')
            .title('All Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      
      S.divider(),
      
      // Reusable sections
      S.listItem()
        .title('Page Sections')
        .icon(() => '🧩')
        .child(
          S.documentTypeList('pageSection')
            .title('All Sections')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      
      S.divider(),
      
      // Content collections
      S.listItem()
        .title('Content Library')
        .icon(() => '📚')
        .child(
          S.list()
            .title('Content Types')
            .items([
              // Projects & Content
              S.documentTypeListItem('artProject')
                .title('Art Projects')
                .icon(() => '🎨'),
              S.documentTypeListItem('portfolioProject')
                .title('Portfolio Projects')
                .icon(() => '💼'),
              S.documentTypeListItem('resourceLink')
                .title('Resource Links')
                .icon(() => '🔗'),
              S.documentTypeListItem('processBlock')
                .title('Process Blocks')
                .icon(() => '⚙️'),
              
              S.divider(),
              
              // Section components
              S.documentTypeListItem('banner')
                .title('Banners')
                .icon(() => '📢'),
              S.documentTypeListItem('hero')
                .title('Hero Sections')
                .icon(() => '🦸'),
              S.documentTypeListItem('bio')
                .title('Bio Sections')
                .icon(() => '👤'),
              
              S.divider(),
              
              // Dropdown variants
              S.documentTypeListItem('dropdown1')
                .title('Dropdown 1 (Bio/Process)')
                .icon(() => '📥'),
              S.documentTypeListItem('dropdown2')
                .title('Dropdown 2 (Resources Grid)')
                .icon(() => '📥'),
              S.documentTypeListItem('dropdown3')
                .title('Dropdown 3 (Single Column)')
                .icon(() => '📥'),
              S.documentTypeListItem('dropdown4')
                .title('Dropdown 4 (Full Width)')
                .icon(() => '📥'),
              S.documentTypeListItem('miscDropdown')
                .title('Misc Dropdown (Projects)')
                .icon(() => '📥'),
              
              S.divider(),
              
              // Cards & UI components
              S.documentTypeListItem('carouselCard')
                .title('Carousel Cards')
                .icon(() => '🃏'),
              S.documentTypeListItem('carouselSection')
                .title('Carousel Sections')
                .icon(() => '🎠'),
              S.documentTypeListItem('highlightedProjectSection')
                .title('Highlighted Projects')
                .icon(() => '⭐'),
              S.documentTypeListItem('ongoingProjectsSection')
                .title('Ongoing Projects')
                .icon(() => '📊'),
              S.documentTypeListItem('companionGallerySection')
                .title('Companion Galleries')
                .icon(() => '👥'),
              S.documentTypeListItem('skillPillSection')
                .title('Skill Pills')
                .icon(() => '🏷️'),
              S.documentTypeListItem('lightBoxSection')
                .title('Light Boxes')
                .icon(() => '💡'),
              S.documentTypeListItem('hpButtonSection')
                .title('HP Buttons')
                .icon(() => '🔘'),
              S.documentTypeListItem('hpTextboxSection')
                .title('HP Textboxes')
                .icon(() => '📝'),
              S.documentTypeListItem('prototypeSection')
                .title('Prototype Sections')
                .icon(() => '🎯'),
              S.documentTypeListItem('contactFormSection')
                .title('Contact Forms')
                .icon(() => '📧'),
              
              S.divider(),
              
              // Assets
              S.documentTypeListItem('svgIcon')
                .title('SVG Icons')
                .icon(() => '🎨'),
            ])
        ),
      
      S.divider(),
      
      // Settings
      S.listItem()
        .title('Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.documentTypeListItem('siteSettings')
                .title('Site Settings')
                .icon(() => '🌐'),
              S.documentTypeListItem('navigation')
                .title('Navigation')
                .icon(() => '🧭'),
            ])
        ),
    ])
