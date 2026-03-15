import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Design to Code | Khaled Momani — AI Systems Engineer & Designer',
  description:
    'Design to Code project by Khaled Momani. Exploring the transition from Figma to live code using Cursor AI and the Unpacking Figma process.',
  alternates: {
    canonical: 'https://www.b8momani.com/designtocode',
  },
  openGraph: {
    title: 'Design To Code | A Fungi Club',
    description:
      'Exploring the transition from Figma to live code using Cursor AI.',
    url: 'https://www.b8momani.com/designtocode',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Design To Code — A Fungi Club' }],
  },
};

export default function DesignToCodeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
