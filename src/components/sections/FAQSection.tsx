'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

const FAQS = [
  {
    q: 'Does getting a tattoo hurt?',
    a: 'Most clients describe the sensation as a steady scratching or concentrated heat. Discomfort varies depending on placement — areas like ribs, spine, and shins are more sensitive, while outer arms and thighs are highly manageable. We focus on comfort, keeping sessions relaxed with scheduled breaks.',
  },
  {
    q: 'How do you price custom tattoo designs?',
    a: 'We quote projects based on size, detail, and estimated hours. You receive a flat, transparent price quote after your design consultation. We never charge extra for revisions to your custom sketch — the quoted price covers all drafting work, stenciling, and tattooing hours.',
  },
  {
    q: 'Can you design cover-ups for old tattoos?',
    a: 'Yes. We specialize in custom cover-up work. During your consultation, we map out your old tattoo and draft a new design that uses custom shading, color blocks, or intricate patterns to completely hide or integrate the existing ink.',
  },
  {
    q: 'How should I prepare for my tattooing session?',
    a: "Eat a hearty meal 1–2 hours before your appointment, stay hydrated, and get a good night's sleep. Wear loose, comfortable clothing that provides easy access to the placement area. Please avoid alcohol, aspirin, or heavy caffeine for 24 hours prior to your session.",
  },
  {
    q: 'What are your sterilization and safety standards?',
    a: 'We maintain a clinical-grade sterile environment. Every needle cartridge is single-use, sterile-sealed, and opened directly in front of you. All grip setups and workstations are double-barrier wrapped, and our artists are fully certified in bloodborne pathogens control.',
  },
  {
    q: 'Do you accept walk-ins or only appointments?',
    a: 'We work strictly by appointment. Because we design custom, bespoke artwork for every client rather than tattooing pre-made flash sheets, we require a brief design consultation (either online or in-studio) before booking your tattooing hours.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 bg-[#0a0a0c]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4">
            Inquiries
          </p>
          <h2
            className="font-editorial text-[#FAFAFA] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Common <span className="italic font-light text-shimmer-light">Questions.</span>
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {FAQS?.map((faq, i) => (
            <details
              key={i}
              className="group border border-[rgba(196,168,130,0.15)] bg-[#111115] open:bg-[#18181f] transition-colors duration-300 rounded-sm"
            >
              <summary className="flex items-center justify-between p-8 cursor-pointer font-medium text-lg tracking-tight list-none">
                <span className="pr-8 text-[#FAFAFA] group-open:text-accent transition-colors">
                  {faq?.q}
                </span>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-300 group-open:rotate-45">
                  <Icon
                    name="PlusIcon"
                    size={18}
                    className="text-[#FAFAFA] group-open:text-accent transition-colors"
                  />
                </span>
              </summary>
              <div className="px-8 pb-8 pt-0">
                <p className="text-[#FAFAFA]/60 leading-relaxed font-light text-base pt-4 border-t border-[rgba(196,168,130,0.1)]">
                  {faq?.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-[#FAFAFA]/50 font-light text-[1.1rem] mb-8 max-w-lg mx-auto">
            Still have questions? We detail everything during your free design consultation.
          </p>
          <a href="/book-session" className="btn-primary inline-flex">
            <span>Book a Design Consult</span>
            <Icon name="ArrowRightIcon" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
