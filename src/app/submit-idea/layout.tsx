import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your Tattoo Idea',
  description: 'Got a tattoo idea? Submit your design references and details to our expert tattoo artists in Zirakpur for a consultation.',
  alternates: { canonical: '/submit-idea' },
  openGraph: {
    title: 'Submit Idea | Glowly Ink',
    description: 'Got a tattoo idea? Submit your design references and details to our expert tattoo artists in Zirakpur for a consultation.',
    url: 'https://glowlyink.com/submit-idea',
  },
};

export default function SubmitIdeaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
