import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the philosophy behind Glowly Ink. We merge advanced aesthetic science with the art of permanent custom tattoos in Zirakpur.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Glowly Ink',
    description: 'Discover the philosophy behind Glowly Ink. We merge advanced aesthetic science with the art of permanent custom tattoos in Zirakpur.',
    url: 'https://glowlyink.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
