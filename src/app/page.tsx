import React from 'react';
import HeroPhotoWall from '@/components/sections/HeroPhotoWall';
import BentoCaseStudies from '@/components/sections/BentoCaseStudies';
import HorizontalProcess from '@/components/sections/HorizontalProcess';
import TattooVisualizer from '@/components/sections/TattooVisualizer';
import HealedSlider from '@/components/sections/HealedSlider';
import TrustSection from '@/components/sections/TrustSection';
import DualCTA from '@/components/sections/DualCTA';
import FAQSection from '@/components/sections/FAQSection';

export default function HomePage() {
  return (
    <>
      <HeroPhotoWall />
      <HorizontalProcess />
      <BentoCaseStudies />
      <HealedSlider />
      <TattooVisualizer />
      <TrustSection />
      <DualCTA />
      <FAQSection />
    </>
  );
}
