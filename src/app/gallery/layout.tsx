import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tattoo & Aesthetics Gallery',
  description: 'Explore our portfolio of custom tattoos, healed results, and skin transformations at Glowly Ink & Aesthetics.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | Glowly Ink',
    description: 'Explore our portfolio of custom tattoos, healed results, and skin transformations at Glowly Ink & Aesthetics.',
    url: 'https://glowlyink.com/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
