import React from "react";
import HeroSection from "@/components/HeroSection";
import Banner from "@/components/Banner";
import MyceliumAnimation from "@/components/MyceliumAnimation";
import Dropdown2 from "@/components/Dropdown2";
import RLBIconVideo from '@/components/RLBIconVideo';
import RLBIconReading from '@/components/RLBIconReading';
import RLBIconCode from '@/components/RLBIconCode';
import MiniDropdown from '@/components/MiniDropdown';
import ResourceLinkButton from '@/components/ResourceLinkButton';
import styles from "./page.module.css";
import FFigma from '@/components/icons/FFigma';
import FCursor from '@/components/icons/FCursor';
import FNextVercel from '@/components/icons/FNextVercel';

export default function HomePage() {
  return (
    <div style={{ minHeight: '200dvh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', zIndex: -50 }}>
        <MyceliumAnimation />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', position: 'sticky', top: 0, left: 0, justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 4 }}>
        <HeroSection />
      </div>
      <div style={{ position: 'relative', zIndex: 80 }}>
        <Banner title="I Made this UI" variant="home" className="parallaxBanner">
          <div className={styles.bannerProjectsRow}>
            <a href="https://www.behance.net/gallery/220356837/Project-Name" target="_blank" rel="noopener noreferrer" className={styles.bannerProjectCard}>
              <img src="/ProjectThumbnails/2-UIWireFramingCram.webp" alt="UI Project 2 - Wireframing CRM" className={styles.bannerProjectImage} />
            </a>
            <a href="https://www.behance.net/gallery/222677953/Project-Name" target="_blank" rel="noopener noreferrer" className={styles.bannerProjectCard}>
              <img src="/ProjectThumbnails/3-UIPrototypingAndAnimation.webp" alt="UI Project 3 - Prototyping and Animation" className={styles.bannerProjectImage} />
            </a>
          </div>
          <a href="/designtocode" className={styles.goToProjectButton}>
            Go to Project
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em', justifyContent: 'center', alignItems: 'center', marginTop: '1.5em', width: '100%' }}>
            <Dropdown2
              title="Figma"
              icon={<FFigma />}
              content={
                <>
                  <div className={styles.dropdownSectionHeader}>Beginner Guides:</div>
                  <ResourceLinkButton label="Quick Rundown" href="https://www.youtube.com/watch?v=uaO6YY0T1mg" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Components1" href="https://www.youtube.com/watch?v=gDbNZ8s-yrA" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Components2" href="https://www.youtube.com/watch?v=k74IrUNaJVk" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Prototyping" href="https://www.youtube.com/watch?v=1ucLq6JTxac" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Animation" href="https://www.youtube.com/watch?v=02fO4qVnbc0" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Comprehensive Rundown" href="https://www.youtube.com/watch?v=HoKD1qIcchQ" icon={<RLBIconVideo />} />
                  <div className={styles.dropdownSectionHeader} style={{ margin: '1em 0 0.5em 0' }}>Best Practices:</div>
                  <ResourceLinkButton label="Best Practices 1" href="https://www.figma.com/best-practices/" icon={<RLBIconReading />} />
                  <ResourceLinkButton label="Best Practices 2" href="https://www.youtube.com/watch?v=NcQneN8zt5I" icon={<RLBIconVideo />} />
                  <ResourceLinkButton label="Best Practices 3" href="https://www.youtube.com/watch?v=1odqpkfkDL8" icon={<RLBIconVideo />} />
                  <div className={styles.dropdownSectionHeader} style={{ margin: '1em 0 0.5em 0' }}>Reference Guide</div>
                  <MiniDropdown icon={<RLBIconCode />} title="ROOT LAYOUT STRUCTURE">
                    <div>Content: Layout<br />├── Header<br />├── Main<br />└── Footer</div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="HEADER COMPONENTS">
                    <div>
                      Header/<br />
                      &nbsp;&nbsp;├── HeaderContainer<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── Branding<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeaderLogo<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeaderTitle<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── Navigation<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeaderActions<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── SearchBar<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── UserProfile<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ActionButtons
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="NAVIGATION COMPONENTS">
                    <div>
                      Navigation/<br />
                      &nbsp;&nbsp;├── NavigationBar<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── NavigationContainer<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── DesktopNavigation<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── MobileNavigation<br />
                      &nbsp;&nbsp;├── NavigationItems<br />
                      &nbsp;&nbsp;├── NavigationLink<br />
                      &nbsp;&nbsp;├── NavigationButton<br />
                      &nbsp;&nbsp;└── NavigationIcon
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="MAIN CONTENT COMPONENTS">
                    <div>
                      Main/<br />
                      &nbsp;&nbsp;├── PageContainer<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageHeader<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageTitle<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageDescription<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── PageActions<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── PageContent<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Sections<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Sidebar
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="SECTION COMPONENTS">
                    <div>
                      Section/<br />
                      &nbsp;&nbsp;├── SectionContainer<br />
                      &nbsp;&nbsp;├── SectionHeader<br />
                      &nbsp;&nbsp;└── SectionContent
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="FOOTER COMPONENTS">
                    <div>
                      Footer/<br />
                      &nbsp;&nbsp;├── FooterContainer<br />
                      &nbsp;&nbsp;├── FooterNavigation<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PrimaryLinks<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── SecondaryLinks<br />
                      &nbsp;&nbsp;├── FooterSections<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ContactInfo<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── SocialLinks<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── LegalLinks<br />
                      &nbsp;&nbsp;└── FooterBottom
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="UI COMPONENTS">
                    <div>
                      UI/<br />
                      &nbsp;&nbsp;├── Buttons<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonPrimary<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonSecondary<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonOutline<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ButtonIcon<br />
                      &nbsp;&nbsp;├── Forms<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormInput<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormTextarea<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormSelect<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormCheckbox<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── FormRadio<br />
                      &nbsp;&nbsp;├── Cards<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardHeader<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardBody<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardFooter<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── CardImage<br />
                      &nbsp;&nbsp;└── Lists<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;├── ListItem<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;└── ListAction
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="INTERACTIVE COMPONENTS">
                    <div>
                      Interactive/<br />
                      &nbsp;&nbsp;├── Modal<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ModalHeader<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ModalBody<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ModalFooter<br />
                      &nbsp;&nbsp;├── Tooltip<br />
                      &nbsp;&nbsp;├── Popover<br />
                      &nbsp;&nbsp;└── Alert
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="MEDIA COMPONENTS">
                    <div>
                      Media/<br />
                      &nbsp;&nbsp;├── Image<br />
                      &nbsp;&nbsp;├── Video<br />
                      &nbsp;&nbsp;├── Icon<br />
                      &nbsp;&nbsp;└── Gallery
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="TYPOGRAPHY COMPONENTS">
                    <div>
                      Typography/<br />
                      &nbsp;&nbsp;├── Heading<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeadingLarge<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeadingMedium<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeadingSmall<br />
                      &nbsp;&nbsp;├── Paragraph<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ParagraphLead<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ParagraphBody<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ParagraphSmall<br />
                      &nbsp;&nbsp;└── Text<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;├── TextBody<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;├── TextCaption<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;└── TextLabel
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="UTILITY COMPONENTS">
                    <div>
                      Utility/<br />
                      &nbsp;&nbsp;├── Loading<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── LoadingSpinner<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── LoadingDots<br />
                      &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── LoadingBar<br />
                      &nbsp;&nbsp;├── Error<br />
                      &nbsp;&nbsp;├── Success<br />
                      &nbsp;&nbsp;└── Status
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="VARIANT SUFFIXES">
                    <div>
                      - Size Variants:<br />
                      &nbsp;&nbsp;└── [Component]Small<br />
                      &nbsp;&nbsp;└── [Component]Medium<br />
                      &nbsp;&nbsp;└── [Component]Large<br />
                      &nbsp;&nbsp;└── [Component]Full<br />
                      <br />
                      - State Variants:<br />
                      &nbsp;&nbsp;└── [Component]Active<br />
                      &nbsp;&nbsp;└── [Component]Inactive<br />
                      &nbsp;&nbsp;└── [Component]Disabled<br />
                      &nbsp;&nbsp;└── [Component]Loading<br />
                      &nbsp;&nbsp;└── [Component]Error<br />
                      &nbsp;&nbsp;└── [Component]Success
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="RESPONSIVE VARIANTS">
                    <div>
                      - Device Specific:<br />
                      &nbsp;&nbsp;└── [Component]Mobile<br />
                      &nbsp;&nbsp;└── [Component]Tablet<br />
                      &nbsp;&nbsp;└── [Component]Desktop<br />
                      &nbsp;&nbsp;└── [Component]Wide
                    </div>
                  </MiniDropdown>
                  <div className={styles.dropdownSectionHeader}>Types</div>
                  <MiniDropdown icon={<RLBIconCode />} title="LAYOUT TYPES">
                    <div>
                      export type LayoutComponents = <br />
                      &nbsp;&nbsp;| &apos;Layout&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutWrapper&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutSection&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutGrid&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutFlex&apos;<br />
                      &nbsp;&nbsp;| &apos;LayoutStack&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="CONTAINER TYPES">
                    <div>
                      export type ContainerComponents = <br />
                      &nbsp;&nbsp;| &apos;Container&apos;<br />
                      &nbsp;&nbsp;| &apos;ContainerFluid&apos;<br />
                      &nbsp;&nbsp;| &apos;ContainerFixed&apos;<br />
                      &nbsp;&nbsp;| &apos;ContainerResponsive&apos;<br />
                      &nbsp;&nbsp;| &apos;ContentContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;SectionContainer&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="GRID TYPES">
                    <div>
                      export type GridComponents = <br />
                      &nbsp;&nbsp;| &apos;Grid&apos;<br />
                      &nbsp;&nbsp;| &apos;GridContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;GridRow&apos;<br />
                      &nbsp;&nbsp;| &apos;GridColumn&apos;<br />
                      &nbsp;&nbsp;| &apos;GridItem&apos;<br />
                      &nbsp;&nbsp;| &apos;GridArea&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="FLEX TYPES">
                    <div>
                      export type FlexComponents = <br />
                      &nbsp;&nbsp;| &apos;Flex&apos;<br />
                      &nbsp;&nbsp;| &apos;FlexContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;FlexRow&apos;<br />
                      &nbsp;&nbsp;| &apos;FlexColumn&apos;<br />
                      &nbsp;&nbsp;| &apos;FlexItem&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="SPACING TYPES">
                    <div>
                      export type SpacingComponents = <br />
                      &nbsp;&nbsp;| &apos;Spacer&apos;<br />
                      &nbsp;&nbsp;| &apos;SpacerHorizontal&apos;<br />
                      &nbsp;&nbsp;| &apos;SpacerVertical&apos;<br />
                      &nbsp;&nbsp;| &apos;Divider&apos;<br />
                      &nbsp;&nbsp;| &apos;DividerVertical&apos;<br />
                      &nbsp;&nbsp;| &apos;DividerHorizontal&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="NAVIGATION TYPES">
                    <div>
                      export type NavigationComponents = <br />
                      &nbsp;&nbsp;| &apos;Navigation&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationBar&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationWrapper&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationItem&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationLink&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationButton&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationIcon&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationText&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationMobile&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationDesktop&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationTablet&apos;<br />
                      &nbsp;&nbsp;| &apos;NavigationResponsive&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="MENU TYPES">
                    <div>
                      export type MenuComponents = <br />
                      &nbsp;&nbsp;| &apos;Menu&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuItem&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuButton&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuLink&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuDropdown&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuExpanded&apos;<br />
                      &nbsp;&nbsp;| &apos;MenuCollapsed&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="BREADCRUMB TYPES">
                    <div>
                      export type BreadcrumbComponents = <br />
                      &nbsp;&nbsp;| &apos;Breadcrumb&apos;<br />
                      &nbsp;&nbsp;| &apos;BreadcrumbItem&apos;<br />
                      &nbsp;&nbsp;| &apos;BreadcrumbSeparator&apos;<br />
                      &nbsp;&nbsp;| &apos;BreadcrumbLink&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="HEADER TYPES">
                    <div>
                      export type HeaderComponents = <br />
                      &nbsp;&nbsp;| &apos;Header&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderWrapper&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderFixed&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderSticky&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderLogo&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderTitle&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderNav&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderActions&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderSearch&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderProfile&apos;<br />
                      &nbsp;&nbsp;| &apos;HeaderMenu&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="PAGE TYPES">
                    <div>
                      export type PageComponents = <br />
                      &nbsp;&nbsp;| &apos;Page&apos;<br />
                      &nbsp;&nbsp;| &apos;PageContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;PageWrapper&apos;<br />
                      &nbsp;&nbsp;| &apos;PageContent&apos;<br />
                      &nbsp;&nbsp;| &apos;PageSection&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="CONTENT TYPES">
                    <div>
                      export type ContentComponents = <br />
                      &nbsp;&nbsp;| &apos;Content&apos;<br />
                      &nbsp;&nbsp;| &apos;ContentBlock&apos;<br />
                      &nbsp;&nbsp;| &apos;ContentSection&apos;<br />
                      &nbsp;&nbsp;| &apos;ContentArea&apos;<br />
                      &nbsp;&nbsp;| &apos;ContentWrapper&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="CARD TYPES">
                    <div>
                      export type CardComponents = <br />
                      &nbsp;&nbsp;| &apos;Card&apos;<br />
                      &nbsp;&nbsp;| &apos;CardContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;CardHeader&apos;<br />
                      &nbsp;&nbsp;| &apos;CardBody&apos;<br />
                      &nbsp;&nbsp;| &apos;CardFooter&apos;<br />
                      &nbsp;&nbsp;| &apos;CardImage&apos;<br />
                      &nbsp;&nbsp;| &apos;CardTitle&apos;<br />
                      &nbsp;&nbsp;| &apos;CardAction&apos;;
                    </div>
                  </MiniDropdown>
                  <MiniDropdown icon={<RLBIconCode />} title="LIST TYPES">
                    <div>
                      export type ListComponents = <br />
                      &nbsp;&nbsp;| &apos;List&apos;<br />
                      &nbsp;&nbsp;| &apos;ListContainer&apos;<br />
                      &nbsp;&nbsp;| &apos;ListItem&apos;<br />
                      &nbsp;&nbsp;| &apos;ListHeader&apos;<br />
                      &nbsp;&nbsp;| &apos;ListFooter&apos;<br />
                      &nbsp;&nbsp;| &apos;ListAction&apos;;
                    </div>
                  </MiniDropdown>
                </>
              }
            />
            <Dropdown2
              title="Cursor AI"
              icon={<FCursor />}
              content={
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                    <ResourceLinkButton label="CursorAI" href="https://cursor.com/en" icon={<RLBIconCode />} />
                    <ResourceLinkButton label="Next.js" href="https://nextjs.org/docs" icon={<RLBIconReading />} />
                    <ResourceLinkButton label="CursorFigmaMCP" href="https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin" icon={<RLBIconCode />} />
                    <ResourceLinkButton label="SVG to JSX" href="https://svg2jsx.com/" icon={<RLBIconCode />} />
                    <ResourceLinkButton label="Free Code Camp" href="https://www.freecodecamp.org/" icon={<RLBIconReading />} />
                    <ResourceLinkButton label="Figma Sites" href="https://www.figma.com/sites/" icon={<RLBIconReading />} />
                    <MiniDropdown title="Getting Started">
                      <ol className={styles.dropdownList}>
                        <li className={styles.dropdownListItem}>Start by discussing the details of your project with an AI chatbot. Ask for resources and feasibility. Run it by as many of them as you have time for. Chat GPT and Deepseek are my go to.</li>
                        <li className={styles.dropdownListItem}>Ask the AI chatbot for a detailed step by step plan for how to create the project. Ask the chatbot to optimize it for Cursor AI to develop it.</li>
                        <li className={styles.dropdownListItem}>Create your design</li>
                        <li className={styles.dropdownListItem}>Break your components down to the smallest part you can. And export all the assets into a folder.</li>
                        <li className={styles.dropdownListItem}>Ask the AI assistant to begin scaffolding the project. Let it know to leave place holders for assets. Go one component at a time.</li>
                        <li className={styles.dropdownListItem}>Use the html from Figma&apos;s devmode along with screenshots to help with communication.</li>
                        <li className={styles.dropdownListItem}>
                          When implementing svg assets copy the SVG&apos;s code into the chatbot or use an SVG converter to get the correct format. If you use the converter the AI will take less time implementing it.
                        </li>
                      </ol>
                    </MiniDropdown>
                    <MiniDropdown title="Tips">
                      <ul className={styles.dropdownList}>
                        <li className={styles.dropdownListItem}>If you notice the AI repeat mistakes, create a ruleset in the cursor rules tab.</li>
                        <li className={styles.dropdownListItem}>Learn the correct jargon to keep things efficient.</li>
                        <li className={styles.dropdownListItem}>Thank yourself for naming your layers.</li>
                        <li className={styles.dropdownListItem}>When animating show the AI each step using your figma design. Step 1, half way through the animation, then the final state. Describe the behavior EX: First the container will expand horizontally.</li>
                        <li className={styles.dropdownListItem}>Ask which values you need to adjust to achieve a goal. It&apos;s a lot faster and it teaches you to code.</li>
                        <li className={styles.dropdownListItem}>This is not a quick figma to code process. It takes just as long as coding. Don&apos;t worry you&apos;re doing great.</li>
                        <li className={styles.dropdownListItem}>Start free code camp if you haven&apos;t. When you know what you&apos;re doing it goes a lot faster, you can use the AI for automating repetitive processes.</li>
                      </ul>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="ROOT LAYOUT STRUCTURE">
                      <div>Content: Layout<br />├── Header<br />├── Main<br />└── Footer</div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="HEADER COMPONENTS">
                      <div>
                        Header/<br />
                        &nbsp;&nbsp;├── HeaderContainer<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── Branding<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeaderLogo<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeaderTitle<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── Navigation<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeaderActions<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── SearchBar<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── UserProfile<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ActionButtons
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="NAVIGATION COMPONENTS">
                      <div>
                        Navigation/<br />
                        &nbsp;&nbsp;├── NavigationBar<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── NavigationContainer<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── DesktopNavigation<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── MobileNavigation<br />
                        &nbsp;&nbsp;├── NavigationItems<br />
                        &nbsp;&nbsp;├── NavigationLink<br />
                        &nbsp;&nbsp;├── NavigationButton<br />
                        &nbsp;&nbsp;└── NavigationIcon
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="MAIN CONTENT COMPONENTS">
                      <div>
                        Main/<br />
                        &nbsp;&nbsp;├── PageContainer<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageHeader<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageTitle<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PageDescription<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── PageActions<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── PageContent<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Sections<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Sidebar
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="SECTION COMPONENTS">
                      <div>
                        Section/<br />
                        &nbsp;&nbsp;├── SectionContainer<br />
                        &nbsp;&nbsp;├── SectionHeader<br />
                        &nbsp;&nbsp;└── SectionContent
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="FOOTER COMPONENTS">
                      <div>
                        Footer/<br />
                        &nbsp;&nbsp;├── FooterContainer<br />
                        &nbsp;&nbsp;├── FooterNavigation<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── PrimaryLinks<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── SecondaryLinks<br />
                        &nbsp;&nbsp;├── FooterSections<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ContactInfo<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── SocialLinks<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── LegalLinks<br />
                        &nbsp;&nbsp;└── FooterBottom
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="UI COMPONENTS">
                      <div>
                        UI/<br />
                        &nbsp;&nbsp;├── Buttons<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonPrimary<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonSecondary<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ButtonOutline<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ButtonIcon<br />
                        &nbsp;&nbsp;├── Forms<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormInput<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormTextarea<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormSelect<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── FormCheckbox<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── FormRadio<br />
                        &nbsp;&nbsp;├── Cards<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardHeader<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardBody<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── CardFooter<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── CardImage<br />
                        &nbsp;&nbsp;└── Lists<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;├── ListItem<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;└── ListAction
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="INTERACTIVE COMPONENTS">
                      <div>
                        Interactive/<br />
                        &nbsp;&nbsp;├── Modal<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ModalHeader<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ModalBody<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ModalFooter<br />
                        &nbsp;&nbsp;├── Tooltip<br />
                        &nbsp;&nbsp;├── Popover<br />
                        &nbsp;&nbsp;└── Alert
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="MEDIA COMPONENTS">
                      <div>
                        Media/<br />
                        &nbsp;&nbsp;├── Image<br />
                        &nbsp;&nbsp;├── Video<br />
                        &nbsp;&nbsp;├── Icon<br />
                        &nbsp;&nbsp;└── Gallery
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="TYPOGRAPHY COMPONENTS">
                      <div>
                        Typography/<br />
                        &nbsp;&nbsp;├── Heading<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeadingLarge<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── HeadingMedium<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── HeadingSmall<br />
                        &nbsp;&nbsp;├── Paragraph<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ParagraphLead<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── ParagraphBody<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── ParagraphSmall<br />
                        &nbsp;&nbsp;└── Text<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;├── TextBody<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;├── TextCaption<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;└── TextLabel
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="UTILITY COMPONENTS">
                      <div>
                        Utility/<br />
                        &nbsp;&nbsp;├── Loading<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── LoadingSpinner<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── LoadingDots<br />
                        &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── LoadingBar<br />
                        &nbsp;&nbsp;├── Error<br />
                        &nbsp;&nbsp;├── Success<br />
                        &nbsp;&nbsp;└── Status
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="VARIANT SUFFIXES">
                      <div>
                        - Size Variants:<br />
                        &nbsp;&nbsp;└── [Component]Small<br />
                        &nbsp;&nbsp;└── [Component]Medium<br />
                        &nbsp;&nbsp;└── [Component]Large<br />
                        &nbsp;&nbsp;└── [Component]Full<br />
                        <br />
                        - State Variants:<br />
                        &nbsp;&nbsp;└── [Component]Active<br />
                        &nbsp;&nbsp;└── [Component]Inactive<br />
                        &nbsp;&nbsp;└── [Component]Disabled<br />
                        &nbsp;&nbsp;└── [Component]Loading<br />
                        &nbsp;&nbsp;└── [Component]Error<br />
                        &nbsp;&nbsp;└── [Component]Success
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="RESPONSIVE VARIANTS">
                      <div>
                        - Device Specific:<br />
                        &nbsp;&nbsp;└── [Component]Mobile<br />
                        &nbsp;&nbsp;└── [Component]Tablet<br />
                        &nbsp;&nbsp;└── [Component]Desktop<br />
                        &nbsp;&nbsp;└── [Component]Wide
                      </div>
                    </MiniDropdown>
                    <div className={styles.dropdownSectionHeader}>Types</div>
                    <MiniDropdown icon={<RLBIconCode />} title="LAYOUT TYPES">
                      <div>
                        export type LayoutComponents = <br />
                        &nbsp;&nbsp;| &apos;Layout&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutWrapper&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutSection&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutGrid&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutFlex&apos;<br />
                        &nbsp;&nbsp;| &apos;LayoutStack&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="CONTAINER TYPES">
                      <div>
                        export type ContainerComponents = <br />
                        &nbsp;&nbsp;| &apos;Container&apos;<br />
                        &nbsp;&nbsp;| &apos;ContainerFluid&apos;<br />
                        &nbsp;&nbsp;| &apos;ContainerFixed&apos;<br />
                        &nbsp;&nbsp;| &apos;ContainerResponsive&apos;<br />
                        &nbsp;&nbsp;| &apos;ContentContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;SectionContainer&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="GRID TYPES">
                      <div>
                        export type GridComponents = <br />
                        &nbsp;&nbsp;| &apos;Grid&apos;<br />
                        &nbsp;&nbsp;| &apos;GridContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;GridRow&apos;<br />
                        &nbsp;&nbsp;| &apos;GridColumn&apos;<br />
                        &nbsp;&nbsp;| &apos;GridItem&apos;<br />
                        &nbsp;&nbsp;| &apos;GridArea&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="FLEX TYPES">
                      <div>
                        export type FlexComponents = <br />
                        &nbsp;&nbsp;| &apos;Flex&apos;<br />
                        &nbsp;&nbsp;| &apos;FlexContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;FlexRow&apos;<br />
                        &nbsp;&nbsp;| &apos;FlexColumn&apos;<br />
                        &nbsp;&nbsp;| &apos;FlexItem&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="SPACING TYPES">
                      <div>
                        export type SpacingComponents = <br />
                        &nbsp;&nbsp;| &apos;Spacer&apos;<br />
                        &nbsp;&nbsp;| &apos;SpacerHorizontal&apos;<br />
                        &nbsp;&nbsp;| &apos;SpacerVertical&apos;<br />
                        &nbsp;&nbsp;| &apos;Divider&apos;<br />
                        &nbsp;&nbsp;| &apos;DividerVertical&apos;<br />
                        &nbsp;&nbsp;| &apos;DividerHorizontal&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="NAVIGATION TYPES">
                      <div>
                        export type NavigationComponents = <br />
                        &nbsp;&nbsp;| &apos;Navigation&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationBar&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationWrapper&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationItem&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationLink&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationButton&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationIcon&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationText&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationMobile&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationDesktop&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationTablet&apos;<br />
                        &nbsp;&nbsp;| &apos;NavigationResponsive&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="MENU TYPES">
                      <div>
                        export type MenuComponents = <br />
                        &nbsp;&nbsp;| &apos;Menu&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuItem&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuButton&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuLink&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuDropdown&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuExpanded&apos;<br />
                        &nbsp;&nbsp;| &apos;MenuCollapsed&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="BREADCRUMB TYPES">
                      <div>
                        export type BreadcrumbComponents = <br />
                        &nbsp;&nbsp;| &apos;Breadcrumb&apos;<br />
                        &nbsp;&nbsp;| &apos;BreadcrumbItem&apos;<br />
                        &nbsp;&nbsp;| &apos;BreadcrumbSeparator&apos;<br />
                        &nbsp;&nbsp;| &apos;BreadcrumbLink&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="HEADER TYPES">
                      <div>
                        export type HeaderComponents = <br />
                        &nbsp;&nbsp;| &apos;Header&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderWrapper&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderFixed&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderSticky&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderLogo&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderTitle&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderNav&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderActions&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderSearch&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderProfile&apos;<br />
                        &nbsp;&nbsp;| &apos;HeaderMenu&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="PAGE TYPES">
                      <div>
                        export type PageComponents = <br />
                        &nbsp;&nbsp;| &apos;Page&apos;<br />
                        &nbsp;&nbsp;| &apos;PageContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;PageWrapper&apos;<br />
                        &nbsp;&nbsp;| &apos;PageContent&apos;<br />
                        &nbsp;&nbsp;| &apos;PageSection&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="CONTENT TYPES">
                      <div>
                        export type ContentComponents = <br />
                        &nbsp;&nbsp;| &apos;Content&apos;<br />
                        &nbsp;&nbsp;| &apos;ContentBlock&apos;<br />
                        &nbsp;&nbsp;| &apos;ContentSection&apos;<br />
                        &nbsp;&nbsp;| &apos;ContentArea&apos;<br />
                        &nbsp;&nbsp;| &apos;ContentWrapper&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="CARD TYPES">
                      <div>
                        export type CardComponents = <br />
                        &nbsp;&nbsp;| &apos;Card&apos;<br />
                        &nbsp;&nbsp;| &apos;CardContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;CardHeader&apos;<br />
                        &nbsp;&nbsp;| &apos;CardBody&apos;<br />
                        &nbsp;&nbsp;| &apos;CardFooter&apos;<br />
                        &nbsp;&nbsp;| &apos;CardImage&apos;<br />
                        &nbsp;&nbsp;| &apos;CardTitle&apos;<br />
                        &nbsp;&nbsp;| &apos;CardAction&apos;;
                      </div>
                    </MiniDropdown>
                    <MiniDropdown icon={<RLBIconCode />} title="LIST TYPES">
                      <div>
                        export type ListComponents = <br />
                        &nbsp;&nbsp;| &apos;List&apos;<br />
                        &nbsp;&nbsp;| &apos;ListContainer&apos;<br />
                        &nbsp;&nbsp;| &apos;ListItem&apos;<br />
                        &nbsp;&nbsp;| &apos;ListHeader&apos;<br />
                        &nbsp;&nbsp;| &apos;ListFooter&apos;<br />
                        &nbsp;&nbsp;| &apos;ListAction&apos;;
                      </div>
                    </MiniDropdown>
                  </div>
                </div>
              }
            />
            <Dropdown2
              title="Deployment"
              icon={<FNextVercel />}
              content={
                <>
                  <ResourceLinkButton label="Vercel" href="https://vercel.com/" icon={<RLBIconCode />} />
                  <ResourceLinkButton label="Next.JS" href="https://nextjs.org/" icon={<RLBIconCode />} />
                  <ResourceLinkButton label="Figma Sites" href="https://www.figma.com/sites/" icon={<RLBIconCode />} />
                  <ResourceLinkButton label="Github Pages" href="https://pages.github.com/" icon={<RLBIconCode />} />
                  <div style={{ fontWeight: 700, fontSize: '1.2em', color: '#fff', margin: '1em 0 0.5em 0' }}>Ready to Deploy?</div>
                  <div style={{ color: '#fff', fontSize: '1em', lineHeight: 1.6 }}>
                    Vercel has full compatibility with Next JS. You can use dynamic and static elements. If you want any kind of user input that isn't dependednt on an iframe embed you should use vercel. It has a decent free tier that's pretty close to what you get in github pages. Just push your project to github and start the deployment process.<br /><br />
                    Github Pages is a great free tool for creating your first static website. I had some dynamic stuff so I ended up switching to vercel Use it to build your portfolio and learn to use cursor. I haven't tried Figma Sites yet. I was too deep into this project to start. But give it a try, it doesn't hurt.
                  </div>
                </>
              }
            />
          </div>
        </Banner>
      </div>
    </div>
  );
} 