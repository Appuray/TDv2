import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about our tattoo process, laser hair reduction, and skincare treatments at Glowly Ink & Aesthetics.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Glowly Ink',
    description: 'Common questions about our tattoo process, laser hair reduction, and skincare treatments at Glowly Ink & Aesthetics.',
    url: 'https://glowlyink.com/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
