import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Stories & Reviews',
  description: 'Read testimonials and real stories from our clients who experienced our premium tattoo and skin care services.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'Stories | Glowly Ink',
    description: 'Read testimonials and real stories from our clients who experienced our premium tattoo and skin care services.',
    url: 'https://glowlyink.com/stories',
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
