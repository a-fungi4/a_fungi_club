import React from "react";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";
import BehanceIcon from '@/components/icons/BehanceIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import SpotifyIcon from '@/components/icons/SpotifyIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  mainText?: React.ReactNode;
  middleText?: React.ReactNode;
  secondaryText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  mainText = <p className={styles.mainText}>DESIGN - DEVELOPMENT - MARKETING</p>,
  middleText = <p className={styles.middleText}>Khaled Momani</p>,
  secondaryText = <p className={styles.secondaryText}>Designer based in San Antonio TX, driven by curiosity, creating thoughtful, adaptable, and innovative design solutions.</p>,
  className,
  style,
}) => (
  <section
    className={className ? `${styles.heroSection} ${className}` : styles.heroSection}
    style={style}
  >
    <Logo />
    {mainText}
    <div style={{ margin: '24px 0' }}>
      <SocialLinks>
        <a href="https://www.behance.net/a-fungi" target="_blank" rel="noopener noreferrer" aria-label="Behance"><BehanceIcon /></a>
        <a href="https://www.instagram.com/afungiclub/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
        <a href="https://www.linkedin.com/in/khaled-momani-108305211/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
        <a href="https://open.spotify.com/track/0TeJ3B7kOOPUJOtmCyNo3G?si=06d9ce98143148ee&nd=1&dlsi=c56ec555bbcc4cf3" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><SpotifyIcon /></a>
        <a href="https://www.threads.com/@afungiclub?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" aria-label="Threads"><ThreadsIcon /></a>
        <a href="https://www.youtube.com/channel/UCXhax1U7EryRr-b5yPS3X8A" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeIcon /></a>
        <a href="https://github.com/a-fungi4" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
      </SocialLinks>
    </div>
    {middleText}
    {secondaryText}
  </section>
);

export default HeroSection; 