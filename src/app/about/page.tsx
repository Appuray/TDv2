import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-main pt-32 pb-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {/* Editorial Split Screen Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: Content Spread */}
          <div className="w-full lg:w-1/2 lg:pt-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-foreground-muted font-bold mb-8">
              The Philosophy
            </p>
            <h1 className="font-editorial text-foreground text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-12">
              More than ink. <br />
              <span className="italic font-light text-foreground/80">A legacy.</span>
            </h1>

            <div className="space-y-8 text-foreground/80 font-medium leading-relaxed text-lg lg:text-xl">
              <p className="first-letter:text-7xl first-letter:font-editorial first-letter:float-left first-letter:mr-4 first-letter:-mt-2 first-letter:text-foreground">
                We believe in the power of aesthetic refinement. Glowly Ink & Aesthetics was founded
                on the principle that premium skin care, advanced laser treatments, and custom
                tattoos all require an environment of absolute focus, modern technology, and high
                hygiene standards.
              </p>
              <p>
                Whether it's a bespoke tattoo draft, an advanced Medifacial, or precision Laser Hair
                Reduction, we customize every treatment to your unique body. We combine expert care
                with artistic precision to deliver refined, visible results.
              </p>
              <p>
                Operating out of our private clinic in Zirakpur, we ensure that your session is
                entirely uninterrupted, providing a calm and sterile atmosphere where true artistry
                and healing can happen.
              </p>
            </div>

            <div className="mt-16 flex items-center gap-12 border-t-2 border-white/10 pt-10">
              <div>
                <span className="block font-editorial text-5xl text-foreground font-bold mb-2">
                  10+
                </span>
                <span className="text-[11px] uppercase tracking-widest2 text-foreground-muted font-bold">
                  Years Exp.
                </span>
              </div>
              <div className="w-px h-16 bg-[#111115]/10" />
              <div>
                <span className="block font-editorial text-5xl text-foreground font-bold mb-2">
                  2k+
                </span>
                <span className="text-[11px] uppercase tracking-widest2 text-foreground-muted font-bold">
                  Clients
                </span>
              </div>
            </div>
          </div>

          {/* Right: Massive High-Contrast Image */}
          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111115]">
              <AppImage
                src="/images/tattoo_making.png"
                alt="Artist at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000 mix-blend-overlay opacity-80 hover:opacity-100"
              />
            </div>
            {/* Caption */}
            <div className="mt-6 flex justify-between items-start text-foreground">
              <p className="text-xs uppercase tracking-widest2 font-bold max-w-[200px]">
                Inside the private clinic.
              </p>
              <p className="font-editorial italic">Zirakpur, India</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
