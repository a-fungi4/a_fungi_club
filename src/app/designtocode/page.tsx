'use client';
import React, { useState } from "react";
import Banner from "@/components/Banner";
import HPTextbox from "@/components/HPTextbox";
import SkillPillCont from "@/components/SkillPillCont";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import Dropdown4 from "@/components/Dropdown4";
import ResourceLinkButton from "@/components/ResourceLinkButton";
import RLBIconReading from "@/components/RLBIconReading";
import MiniDropdown from '@/components/MiniDropdown';
import OFigma from '@/components/OFigma';
import OCursorAI from '@/components/OCursorAI';
import ONextVercel from '@/components/ONextVercel';
import RLBIconVideo from '@/components/RLBIconVideo';
import RLBIconCode from '@/components/RLBIconCode';

export default function DesignToCodePage() {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [cursorAIExpanded, setCursorAIExpanded] = useState(false);
  const [deploymentExpanded, setDeploymentExpanded] = useState(false);
  const DESIGN_TO_CODE_CAROUSEL_PHOTOS = [
    "/design-to-code-carousel-photos/1 - HomePage.png",
    "/design-to-code-carousel-photos/2 - PortfolioPage.png",
    "/design-to-code-carousel-photos/3 - PorfolioProject.png",
    "/design-to-code-carousel-photos/4 - AboutPage.png",
    "/design-to-code-carousel-photos/5 - Art.png",
    "/design-to-code-carousel-photos/6 - Misc.png",
  ];
  return (
    <>
      <Banner title="DesignToCode" variant="general" className={styles.banner}>
        <HPTextbox text="DesignToCode is a project about ... (add your description here)." />
        <SkillPillCont skills={["UI Development", "Figma", "React", "Automation", "Prototyping"]} projectType="designtocode" />
      </Banner>
      <div className={styles.centeredTextbox}>
        <HPTextbox
          text={`You can look to see my initial progress on this website, titled "Unpacking Figma," and linked in the UI section below. I went through a convoluted process of figma to code. I worked within the restraints of a budget and found an interesting yet incredibly difficult to implement solution. I found that the animations and assets all grouped on one page were incredibly heavy when it was implemented. I did more research and found out about Github Pages. It allowed for a robust and well built static website. For parts of my website that were previously dynamic, I am able to add iframe embeds that remain unaffected by the constraints of Github Pages. I then learned about Cursor AI and vibe coding.\n\nI started using Cursor as a developer and learned a lot from there. I tested out my initial design, just beginning its implementation was making my laptop cry in pain. I decided to move to a different less heavy approach, now that my previous limitations were gone. I pushed my first idea to the greenhouse and started with something more feasible.`}
        />
      </div>
      <div className={styles.embedsOuter}>
        <div className={styles.embedsContainer}>
          <div className={styles.embedAspect}>
            <iframe
              src="https://www.behance.net/embed/project/220356837?ilo0=1"
              allowFullScreen
              loading="lazy"
              frameBorder="0"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Unpacking Figma PT. 1"
            />
          </div>
          <div className={styles.embedAspect}>
            <iframe
              src="https://www.behance.net/embed/project/222677953?ilo0=1"
              allowFullScreen
              loading="lazy"
              frameBorder="0"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Unpacking Figma PT. 2"
            />
          </div>
        </div>
      </div>
      <div className={styles.bluePill}>ProjectDesign</div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Carousel photos={DESIGN_TO_CODE_CAROUSEL_PHOTOS} />
      </div>
      <div className={styles.bluePill}>ToolTips</div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Dropdown4
          title="Figma"
          icon={<OFigma />}
          options={[]}
          expanded={dropdownExpanded}
          onCollapse={() => setDropdownExpanded(false)}
          onExpand={() => setDropdownExpanded(true)}
          linkButtonGrid={
            <>
              <div className={styles.resourceSectionHeader}>
                Beginner Guides: <span className={styles.resourceSectionSubheader}></span>
              </div>
              <ResourceLinkButton
                label="Quick Rundown"
                href="https://www.youtube.com/watch?v=uaO6YY0T1mg"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Components1"
                href="https://www.youtube.com/watch?v=gDbNZ8s-yrA"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Components2"
                href="https://www.youtube.com/watch?v=k74IrUNaJVk"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Prototyping"
                href="https://www.youtube.com/watch?v=1ucLq6JTxac"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Animation"
                href="https://www.youtube.com/watch?v=02fO4qVnbc0"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Comprehensive Rundown"
                href="https://www.youtube.com/watch?v=HoKD1qIcchQ"
                icon={<RLBIconVideo />}
              />
              <div className={styles.resourceSectionHeader}>
                Best Practices:
              </div>
              <ResourceLinkButton
                label="Best Practices 1"
                href="https://www.figma.com/best-practices/"
                icon={<RLBIconReading />}
              />
              <ResourceLinkButton
                label="Best Practices 2"
                href="https://www.youtube.com/watch?v=NcQneN8zt5I"
                icon={<RLBIconVideo />}
              />
              <ResourceLinkButton
                label="Best Practices 3"
                href="https://www.youtube.com/watch?v=1odqpkfkDL8"
                icon={<RLBIconVideo />}
              />
            </>
          }
          additionalContent={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', width: '100%' }}>
              <div className={styles.resourceSectionHeader} style={{ width: '100%' }}>Naming Conventions</div>
              <ol style={{ color: '#fff', width: '100%', margin: '0 0 1em 0', paddingLeft: '1.5em', fontSize: '1em' }}>
                <li><b>Best Practices</b></li>
                <li>1. Use PascalCase for component names</li>
                <li>2. Use descriptive, specific names</li>
                <li>3. Group related components</li>
                <li>4. Use consistent prefixes</li>
                <li>5. Include component purpose in name</li>
                <li>6. Use appropriate suffixes for variants</li>
              </ol>
              <div className={styles.resourceSectionHeader} style={{ width: '100%' }}>Component Organization</div>
              <ul style={{ color: '#fff', width: '100%', margin: '0 0 1em 0', paddingLeft: '1.5em', fontSize: '1em' }}>
                <li>1. Group by feature/function</li>
                <li>2. Maintain consistent hierarchy</li>
                <li>3. Use clear parent-child relationships</li>
                <li>4. Keep related components together</li>
                <li>5. Follow logical naming patterns</li>
              </ul>
              <div style={{ color: '#fff', fontWeight: 700, marginLeft: '2em', marginBottom: '0.25em' }}>Best Practices</div>
              <ul style={{ color: '#fff', width: '100%', margin: '0 0 1em 2em', paddingLeft: '1.5em', fontSize: '1em' }}>
                <li>•Document folder structure</li>
                <li>•Review and refactor regularly</li>
                <li>•Encourage team conventions</li>
                <li>•Use index files for re-exports</li>
                <li>•Keep folders shallow when possible</li>
              </ul>
              <div className={styles.resourceSectionHeader} style={{ width: '100%' }}>Reference Guide</div>
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
              <div className={styles.resourceSectionHeader} style={{ width: '100%' }}>Types</div>
              <MiniDropdown icon={<RLBIconCode />} title="LAYOUT TYPES">
                <div>
                  export type LayoutComponents = <br />
                  &nbsp;&nbsp;| &#39;Layout&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutWrapper&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutSection&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutGrid&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutFlex&#39;<br />
                  &nbsp;&nbsp;| &#39;LayoutStack&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="CONTAINER TYPES">
                <div>
                  export type ContainerComponents = <br />
                  &nbsp;&nbsp;| &#39;Container&#39;<br />
                  &nbsp;&nbsp;| &#39;ContainerFluid&#39;<br />
                  &nbsp;&nbsp;| &#39;ContainerFixed&#39;<br />
                  &nbsp;&nbsp;| &#39;ContainerResponsive&#39;<br />
                  &nbsp;&nbsp;| &#39;ContentContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;SectionContainer&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="GRID TYPES">
                <div>
                  export type GridComponents = <br />
                  &nbsp;&nbsp;| &#39;Grid&#39;<br />
                  &nbsp;&nbsp;| &#39;GridContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;GridRow&#39;<br />
                  &nbsp;&nbsp;| &#39;GridColumn&#39;<br />
                  &nbsp;&nbsp;| &#39;GridItem&#39;<br />
                  &nbsp;&nbsp;| &#39;GridArea&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="FLEX TYPES">
                <div>
                  export type FlexComponents = <br />
                  &nbsp;&nbsp;| &#39;Flex&#39;<br />
                  &nbsp;&nbsp;| &#39;FlexContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;FlexRow&#39;<br />
                  &nbsp;&nbsp;| &#39;FlexColumn&#39;<br />
                  &nbsp;&nbsp;| &#39;FlexItem&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="SPACING TYPES">
                <div>
                  export type SpacingComponents = <br />
                  &nbsp;&nbsp;| &#39;Spacer&#39;<br />
                  &nbsp;&nbsp;| &#39;SpacerHorizontal&#39;<br />
                  &nbsp;&nbsp;| &#39;SpacerVertical&#39;<br />
                  &nbsp;&nbsp;| &#39;Divider&#39;<br />
                  &nbsp;&nbsp;| &#39;DividerVertical&#39;<br />
                  &nbsp;&nbsp;| &#39;DividerHorizontal&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="NAVIGATION TYPES">
                <div>
                  export type NavigationComponents = <br />
                  &nbsp;&nbsp;| &#39;Navigation&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationBar&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationWrapper&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationItem&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationLink&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationButton&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationIcon&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationText&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationMobile&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationDesktop&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationTablet&#39;<br />
                  &nbsp;&nbsp;| &#39;NavigationResponsive&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="MENU TYPES">
                <div>
                  export type MenuComponents = <br />
                  &nbsp;&nbsp;| &#39;Menu&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuItem&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuButton&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuLink&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuDropdown&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuExpanded&#39;<br />
                  &nbsp;&nbsp;| &#39;MenuCollapsed&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="BREADCRUMB TYPES">
                <div>
                  export type BreadcrumbComponents = <br />
                  &nbsp;&nbsp;| &#39;Breadcrumb&#39;<br />
                  &nbsp;&nbsp;| &#39;BreadcrumbItem&#39;<br />
                  &nbsp;&nbsp;| &#39;BreadcrumbSeparator&#39;<br />
                  &nbsp;&nbsp;| &#39;BreadcrumbLink&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="HEADER TYPES">
                <div>
                  export type HeaderComponents = <br />
                  &nbsp;&nbsp;| &#39;Header&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderWrapper&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderFixed&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderSticky&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderLogo&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderTitle&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderNav&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderActions&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderSearch&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderProfile&#39;<br />
                  &nbsp;&nbsp;| &#39;HeaderMenu&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="PAGE TYPES">
                <div>
                  export type PageComponents = <br />
                  &nbsp;&nbsp;| &#39;Page&#39;<br />
                  &nbsp;&nbsp;| &#39;PageContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;PageWrapper&#39;<br />
                  &nbsp;&nbsp;| &#39;PageContent&#39;<br />
                  &nbsp;&nbsp;| &#39;PageSection&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="CONTENT TYPES">
                <div>
                  export type ContentComponents = <br />
                  &nbsp;&nbsp;| &#39;Content&#39;<br />
                  &nbsp;&nbsp;| &#39;ContentBlock&#39;<br />
                  &nbsp;&nbsp;| &#39;ContentSection&#39;<br />
                  &nbsp;&nbsp;| &#39;ContentArea&#39;<br />
                  &nbsp;&nbsp;| &#39;ContentWrapper&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="CARD TYPES">
                <div>
                  export type CardComponents = <br />
                  &nbsp;&nbsp;| &#39;Card&#39;<br />
                  &nbsp;&nbsp;| &#39;CardContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;CardHeader&#39;<br />
                  &nbsp;&nbsp;| &#39;CardBody&#39;<br />
                  &nbsp;&nbsp;| &#39;CardFooter&#39;<br />
                  &nbsp;&nbsp;| &#39;CardImage&#39;<br />
                  &nbsp;&nbsp;| &#39;CardTitle&#39;<br />
                  &nbsp;&nbsp;| &#39;CardAction&#39;;
                </div>
              </MiniDropdown>
              <MiniDropdown icon={<RLBIconCode />} title="LIST TYPES">
                <div>
                  export type ListComponents = <br />
                  &nbsp;&nbsp;| &#39;List&#39;<br />
                  &nbsp;&nbsp;| &#39;ListContainer&#39;<br />
                  &nbsp;&nbsp;| &#39;ListItem&#39;<br />
                  &nbsp;&nbsp;| &#39;ListHeader&#39;<br />
                  &nbsp;&nbsp;| &#39;ListFooter&#39;<br />
                  &nbsp;&nbsp;| &#39;ListAction&#39;;
                </div>
              </MiniDropdown>
            </div>
          }
        />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Dropdown4
          title="Cursor AI"
          icon={<OCursorAI />}
          options={[]}
          expanded={cursorAIExpanded}
          onExpand={() => setCursorAIExpanded(true)}
          onCollapse={() => setCursorAIExpanded(false)}
          linkButtonGrid={
            <>
              <ResourceLinkButton label="CursorAI" href="https://cursor.com/en" icon={<RLBIconCode />} />
              <ResourceLinkButton label="Next.js" href="https://nextjs.org/docs" icon={<RLBIconReading />} />
              <ResourceLinkButton label="CursorFigmaMCP" href="https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin" icon={<RLBIconCode />} />
              <ResourceLinkButton label="SVG to JSX" href="https://svg2jsx.com/" icon={<RLBIconCode />} />
              <ResourceLinkButton label="Free Code Camp" href="https://www.freecodecamp.org/" icon={<RLBIconReading />} />
              <ResourceLinkButton label="Figma Sites" href="https://www.figma.com/sites/" icon={<RLBIconReading />} />
            </>
          }
          additionalContent={
            <>
              <MiniDropdown title="Getting Started">
                <ol style={{ color: '#fff', fontSize: '1em', paddingLeft: '1.5em' }}>
                  <li>Start by discussing the details of your project with an AI chatbot. Ask for resources and feasibility. Run it by as many of them as you have time for. Chat GPT and Deepseek are my go to.</li>
                  <li>Ask the AI chatbot for a detailed step by step plan for how to create the project. Ask the chatbot to optimize it for Cursor AI to develop it.</li>
                  <li>Create your design</li>
                  <li>Break your components down to the smallest part you can. And export all the assets into a folder.</li>
                  <li>Ask the AI assistant to begin scaffolding the project. Let it know to leave place holders for assets. Go one component at a time.</li>
                  <li>Use the html from Figma&apos;s devmode along with screenshots to help with communication.</li>
                  <li>
                    When implementing svg assets copy the SVG&apos;s code into the chatbot or use an SVG converter to get the correct format. If you use the converter the AI will take less time implementing it.
                  </li>
                </ol>
              </MiniDropdown>
              <MiniDropdown title="Tips">
                <ul style={{ color: '#fff', fontSize: '1em', paddingLeft: '1.5em' }}>
                  <li>If you notice the AI repeat mistakes, create a ruleset in the cursor rules tab.</li>
                  <li>Learn the correct jargon to keep things efficient.</li>
                  <li>Thank yourself for naming your layers.</li>
                  <li>When animating show the AI each step using your figma design. Step 1, half way through the animation, then the final state. Describe the behavior EX: First the container will expand horizontally.</li>
                  <li>Ask which values you need to adjust to achieve a goal. It&apos;s a lot faster and it teaches you to code.</li>
                  <li>This is not a quick figma to code process. It takes just as long as coding. Don&apos;t worry you&apos;re doing great.</li>
                  <li>Start free code camp if you haven&apos;t. When you know what you&apos;re doing it goes a lot faster, you can use the AI for automating repetitive processes.</li>
                </ul>
              </MiniDropdown>
            </>
          }
          hugContent={true}
        />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Dropdown4
          title="Deployment"
          icon={<ONextVercel />}
          options={[]}
          expanded={deploymentExpanded}
          onExpand={() => setDeploymentExpanded(true)}
          onCollapse={() => setDeploymentExpanded(false)}
          linkButtonGrid={
            <>
              <ResourceLinkButton label="Vercel" href="https://vercel.com/" icon={<RLBIconCode />} />
              <ResourceLinkButton label="Next.JS" href="https://nextjs.org/" icon={<RLBIconCode />} />
              <ResourceLinkButton label="Figma Sites" href="https://www.figma.com/sites/" icon={<RLBIconCode />} />
              <ResourceLinkButton label="Github Pages" href="https://pages.github.com/" icon={<RLBIconCode />} />
            </>
          }
          additionalContent={
            (<div style={{ width: '100%' }}>
              <div style={{ fontWeight: 700, fontSize: '1.2em', color: '#fff', marginBottom: '0.5em' }}>Ready to Deploy?</div>
              <div style={{ color: '#fff', fontSize: '1em', lineHeight: 1.6 }}>
                Vercel has full compatibility with Next JS. You can use dynamic and static elements. If you want any kind of user input that isn&apos;t dependednt on an iframe embed you should use vercel. It has a decent free tier that&apos;s pretty close to what you get in github pages. Just push your project to github and start the deployment process.<br /><br />
                Github Pages is a great free tool for creating your first static website. I had some dynamic stuff so I ended up switching to vercel Use it to build your portfolio and learn to use cursor. I haven&apos;t tried Figma Sites yet. I was too deep into this project to start. But give it a try, it doesn&apos;t hurt.
              </div>
            </div>)
          }
          hugContent={true}
        />
      </div>
    </>
  );
} 