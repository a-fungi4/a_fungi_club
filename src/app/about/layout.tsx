import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About | Khaled Momani — AI Systems Engineer & Designer',
  description:
    'Learn about Khaled Momani — AI Systems Engineer & Designer behind A Fungi Club. Bridging the gap between intelligent systems and human-centric design through Plasticity, InsideOut, and Automation.',
  alternates: {
    canonical: 'https://www.b8momani.com/about',
  },
  openGraph: {
    title: 'About | Khaled Momani — AI Systems Engineer & Designer',
    description:
      'AI Systems Engineer & Designer Khaled Momani — research, process, and creative background.',
    url: 'https://www.b8momani.com/about',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'About Khaled Momani — A Fungi Club' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
