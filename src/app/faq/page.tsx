'use client';
import React, { useState } from 'react';

const FAQS = [
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book a session directly through our "Book Session" page for both aesthetic treatments and tattoos. For custom tattoos, you can also submit your concept via the "Submit Idea" form.',
  },
  {
    question: 'Do you offer consultations for skin and laser treatments?',
    answer:
      'Yes, every skin, hair, and laser journey begins with an expert consultation. We analyze your profile and customize a treatment plan before beginning any procedures.',
  },
  {
    question: 'What is your sanitation and hygiene process?',
    answer:
      'We utilize hospital-grade sanitization protocols, sterile single-use equipment for tattoos, and medical-grade sterilization for our advanced aesthetic tools. Your safety and health are our top priority.',
  },
  {
    question: 'Are your laser and skin treatments safe for all skin types?',
    answer:
      'Absolutely. Our modern technology and expert specialists allow us to safely calibrate our laser and skin treatments (like Medifacials) to suit various skin types and tones for maximum visible results.',
  },
  {
    question: 'Will I see my tattoo design before the appointment?',
    answer:
      'Yes, for custom tattoos, we collaborate closely with you. We will share initial bespoke drafts before the session and make any necessary adjustments to ensure you are 100% happy.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-bg-main pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24 border-b-2 border-white/10 pb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] text-foreground-muted font-bold mb-6">
            Details & Info
          </p>
          <h1 className="font-editorial text-foreground text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            Frequently <br />
            <span className="italic font-light">Asked.</span>
          </h1>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`border-2 transition-all duration-300 ${
                openIndex === idx
                  ? 'border-white/20 bg-[#111115] text-accent'
                  : 'border-white/10 bg-[#18181f] text-foreground hover:border-white/20'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-8 text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span
                  className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${openIndex === idx ? 'text-accent' : 'text-foreground'}`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="transition-colors"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-8 pt-0 text-accent/80 leading-relaxed font-medium text-lg border-t-2 border-white/20 mt-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
