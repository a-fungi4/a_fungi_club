import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Art | Khaled Momani — AI Systems Engineer & Designer',
  description:
    'Art by Khaled Momani — Free Therapy, 8th and Lucas, and the Tacky Garbage collection. Explorations in emotion, context, and rule-breaking within creative systems.',
  alternates: {
    canonical: 'https://www.b8momani.com/art',
  },
  openGraph: {
    title: 'Art | A Fungi Club',
    description:
      'Explorations in emotion and digital art by Khaled Momani.',
    url: 'https://www.b8momani.com/art',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Art by Khaled Momani — A Fungi Club' }],
  },
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
