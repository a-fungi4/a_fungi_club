import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Khaled Momani — designer and developer behind A Fungi Club. Process methodologies: Plasticity, InsideOut, and Automation.',
  alternates: {
    canonical: 'https://www.b8momani.com/about',
  },
  openGraph: {
    title: 'About | A Fungi Club',
    description:
      'Designer, developer, and creative director Khaled Momani — process and background.',
    url: 'https://www.b8momani.com/about',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'About Khaled Momani — A Fungi Club' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
