import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Schedule your appointment for custom tattoos, laser hair removal, or medifacial treatments at our Zirakpur studio.',
  alternates: { canonical: '/book-session' },
  openGraph: {
    title: 'Book a Session | Glowly Ink',
    description: 'Schedule your appointment for custom tattoos, laser hair removal, or medifacial treatments at our Zirakpur studio.',
    url: 'https://glowlyink.com/book-session',
  },
};

export default function BookSessionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
