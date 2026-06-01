import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import '../styles/tailwind.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://glowlyink.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: {
    default: 'Glowly Ink & Aesthetics — Premium Skin, Hair & Tattoos',
    template: '%s | Glowly Ink',
  },
  description:
    'Glowly Ink & Aesthetics offers premium skin care treatments, hair treatments, advanced laser hair reduction, medifacials, and custom permanent tattoos.',
  keywords: [
    // Tattoo & Piercing
    'tattoo studio', 'best tattoo artist in India', 'tattoo shop near me', 'custom tattoos', 'permanent tattoo',
    'tattoo artist Zirakpur', 'tattoo studio Chandigarh', 'cover up tattoo', 'portrait tattoo', 'black and grey tattoo',
    'color tattoo', 'minimalist tattoo', 'tattoo design', 'sleeve tattoo', 'tattoo parlor',
    // Aesthetics & Skin Care
    'skin care clinic', 'best dermatologist in tricity', 'medifacial', 'hydrafacial treatment', 'acne treatment',
    'glowing skin treatment', 'skin whitening', 'chemical peel', 'skin doctor in Zirakpur', 'skin clinic Chandigarh',
    'anti aging treatment', 'pigmentation treatment', 'glowly ink', 'best aesthetics clinic',
    // Laser Hair Reduction
    'laser hair removal', 'laser hair reduction', 'permanent hair removal', 'painless laser hair removal', 'best laser clinic',
    // Hair Treatments
    'hair fall treatment', 'PRP for hair', 'hair regrowth treatment', 'dandruff treatment', 'hair specialist Zirakpur',
    // Geo Targets
    'Zirakpur', 'Chandigarh', 'Panchkula', 'Mohali', 'Tricity', 'Punjab', 'India aesthetics'
  ],
  authors: [{ name: 'Glowly Ink Team' }],
  creator: 'Glowly Ink',
  publisher: 'Glowly Ink',
  openGraph: {
    title: 'Glowly Ink & Aesthetics',
    description: 'Premium skin care treatments, hair treatments, and custom tattoos.',
    url: 'https://glowlyink.com',
    siteName: 'Glowly Ink',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glowly Ink & Aesthetics',
    description: 'Premium skin care treatments, hair treatments, and custom tattoos.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
    name: 'Glowly Ink & Aesthetics',
    image: 'https://glowlyink.com/assets/images/app_logo.png',
    '@id': 'https://glowlyink.com',
    url: 'https://glowlyink.com',
    telephone: '+910000000000', // Update with real phone if known
    email: 'vermasanil16@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 21, Aakriti Complex',
      addressLocality: 'Zirakpur',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹₹',
    description: 'Premium skin care treatments, hair treatments, and custom tattoos in Zirakpur.',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased bg-bg-main overflow-x-hidden`}>
        {/* Injecting Local SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Header />
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
