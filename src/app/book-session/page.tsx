'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface FormState {
  artist: string;
  date: string;
  slot: string;
  name: string;
  email: string;
  type: string;
}

interface FormErrors {
  artist?: string;
  date?: string;
  slot?: string;
  name?: string;
  email?: string;
  type?: string;
}

export default function BookSessionPage() {
  const [form, setForm] = useState<FormState>({
    artist: 'Aesthetic Specialist',
    date: '',
    slot: 'Morning (10:00 AM - 1:00 PM)',
    name: '',
    email: '',
    type: 'Consultation',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.artist) tempErrors.artist = 'Please select an artist';
    if (!form.date) tempErrors.date = 'Preferred date is required';
    if (!form.name.trim()) tempErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { db, collection, addDoc, serverTimestamp } = await import('@/lib/firebase');

      await addDoc(collection(db, 'leads_bookings'), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error booking your session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-bg-main flex flex-col lg:flex-row relative">
      {/* Left: Stark Black Area */}
      <div className="w-full lg:w-5/12 relative min-h-[50vh] lg:min-h-[100dvh] lg:sticky lg:top-0 bg-[#111115] text-accent p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20 lg:opacity-40">
          <AppImage
            src="/images/tattoo_making.png"
            alt="Artist tattooing in a modern studio space"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover mix-blend-overlay grayscale"
          />
        </div>

        {/* Top brand indicator */}
        <div className="relative z-20 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-accent/60">
            Glowly Ink & Aesthetics India
          </span>
        </div>

        <div className="relative z-20 flex-grow flex flex-col justify-center py-12 lg:py-0">
          <h2 className="font-editorial text-4xl lg:text-6xl font-light italic mb-6 leading-none">
            Reserve
            <br />
            Your Canvas.
          </h2>
          <p className="text-accent/60 font-light max-w-sm text-sm lg:text-base leading-relaxed">
            Due to high demand, our artists operate strictly by appointment. A non-refundable
            deposit is required to secure your date once your custom design is approved.
          </p>
        </div>

        <div className="relative z-20 hidden lg:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/50 font-bold mb-2">
            Studio Location
          </p>
          <p className="font-editorial text-2xl text-accent font-light">
            Zirakpur, India
            <br />
            Private Clinic & Studio
          </p>
        </div>
      </div>

      {/* Right: Stark Off-Black Form Area */}
      <div className="w-full lg:w-7/12 pt-12 lg:pt-32 pb-20 px-6 lg:px-16 xl:px-24 bg-[#18181f] text-foreground flex flex-col justify-center">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground-muted font-bold mb-4 animate-in">
            Secure Your Spot
          </p>
          <h1 className="font-editorial text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-in-delay-1 text-foreground">
            Book a Session.
          </h1>
          <p className="text-foreground-muted font-light text-sm max-w-md">
            Fill out the details below to request a slot. We will respond with slot confirmations
            within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 animate-in-delay-3">
          {/* Artist Selection */}
          <div className="space-y-4">
            <label id="artist-label" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
              Select Artist
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-labelledby="artist-label">
              <div
                onClick={() => setForm({ ...form, artist: 'Aesthetic Specialist' })}
                className={`border-2 p-6 cursor-pointer relative overflow-hidden group transition-all duration-300 active-press ${
                  form.artist === 'Aesthetic Specialist'
                    ? 'border-accent bg-accent/5'
                    : 'border-white/10 bg-transparent hover:border-white/20'
                }`}
              >
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-300 ${
                      form.artist === 'Aesthetic Specialist' ? 'scale-100' : 'scale-0'
                    }`}
                  />
                </div>
                <h3 className="font-editorial text-2xl text-foreground mb-1">
                  Aesthetic Specialist
                </h3>
                <p className="text-[9px] uppercase tracking-widest2 text-foreground-muted font-bold">
                  Skin, Laser &amp; Medifacials
                </p>
              </div>

              <div
                onClick={() => setForm({ ...form, artist: 'Lead Tattoo Artist' })}
                className={`border-2 p-6 cursor-pointer relative overflow-hidden group transition-all duration-300 active-press ${
                  form.artist === 'Lead Tattoo Artist'
                    ? 'border-accent bg-accent/5'
                    : 'border-white/10 bg-transparent hover:border-white/20'
                }`}
              >
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-300 ${
                      form.artist === 'Lead Tattoo Artist' ? 'scale-100' : 'scale-0'
                    }`}
                  />
                </div>
                <h3 className="font-editorial text-2xl text-foreground mb-1">Lead Tattoo Artist</h3>
                <p className="text-[9px] uppercase tracking-widest2 text-foreground-muted font-bold">
                  Custom Tattoos &amp; SPMU
                </p>
              </div>
            </div>
          </div>

          {/* Date & Slot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label htmlFor="date" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`w-full bg-transparent border-b-2 py-4 text-lg font-light text-foreground focus:outline-none focus:border-accent transition-colors etch-focus-glow ${
                  errors.date ? 'border-red-500/60' : 'border-white/10'
                }`}
              />
              {errors.date && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.date}
                </p>
              )}
            </div>

            <div className="space-y-2 group">
              <label htmlFor="slot" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Time Slot
              </label>
              <div className="relative">
                <select
                  id="slot"
                  value={form.slot}
                  onChange={(e) => setForm({ ...form, slot: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-lg font-light text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                >
                  <option className="bg-[#18181f] text-foreground">
                    Morning (10:00 AM - 1:00 PM)
                  </option>
                  <option className="bg-[#18181f] text-foreground">
                    Afternoon (2:00 PM - 5:00 PM)
                  </option>
                  <option className="bg-[#18181f] text-foreground">
                    Evening (6:00 PM - 9:00 PM)
                  </option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-8">
            <div className="space-y-2 group">
              <label htmlFor="fullName" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full bg-transparent border-b-2 py-4 text-lg md:text-xl font-light text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/25 etch-focus-glow ${
                  errors.name ? 'border-red-500/60' : 'border-white/10'
                }`}
                placeholder="Jane Doe"
              />
              {errors.name && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full bg-transparent border-b-2 py-4 text-lg md:text-xl font-light text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/25 etch-focus-glow ${
                  errors.email ? 'border-red-500/60' : 'border-white/10'
                }`}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Appointment Type */}
            <div className="space-y-4">
              <label id="type-label" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
                Appointment Type
              </label>
              <div className="flex flex-col sm:flex-row flex-wrap gap-6" role="group" aria-labelledby="type-label">
                <div
                  onClick={() => setForm({ ...form, type: 'Consultation' })}
                  className="flex items-center gap-3 cursor-pointer group active-press"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center transition-colors group-hover:border-accent">
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-300 ${
                        form.type === 'Consultation' ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-base font-light transition-colors ${
                      form.type === 'Consultation'
                        ? 'text-foreground font-medium'
                        : 'text-foreground/60'
                    }`}
                  >
                    Consultation
                  </span>
                </div>

                <div
                  onClick={() => setForm({ ...form, type: 'Skin/Laser Treatment' })}
                  className="flex items-center gap-3 cursor-pointer group active-press"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center transition-colors group-hover:border-accent">
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-300 ${
                        form.type === 'Skin/Laser Treatment' ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-base font-light transition-colors ${
                      form.type === 'Skin/Laser Treatment'
                        ? 'text-foreground font-medium'
                        : 'text-foreground/60'
                    }`}
                  >
                    Skin/Laser Treatment
                  </span>
                </div>

                <div
                  onClick={() => setForm({ ...form, type: 'Tattoo Session' })}
                  className="flex items-center gap-3 cursor-pointer group active-press"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center transition-colors group-hover:border-accent">
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-300 ${
                        form.type === 'Tattoo Session' ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-base font-light transition-colors ${
                      form.type === 'Tattoo Session'
                        ? 'text-foreground font-medium'
                        : 'text-foreground/60'
                    }`}
                  >
                    Tattoo Session
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#111115] text-accent py-5 text-xs uppercase tracking-[0.25em] font-bold hover:bg-black transition-all duration-300 active-press border border-accent/20 flex items-center justify-center gap-3 disabled:opacity-50"
              style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Booking Request</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Success Interactive Overlay ── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-500 ${
          showSuccess ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-xl"
          onClick={() => setShowSuccess(false)}
        />

        {/* Modal content */}
        <div
          className={`relative bg-[#111115] border border-accent/20 p-8 md:p-12 max-w-lg w-full text-center shadow-2xl transition-all duration-500 transform ${
            showSuccess ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
          }`}
        >
          <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-6 bg-accent/5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              className="animate-pulse"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h3 className="font-editorial text-3xl text-foreground mb-4">Request Received.</h3>
          <p className="text-foreground-muted font-light leading-relaxed text-sm mb-8">
            Thank you, <strong className="text-foreground">{form.name}</strong>. Your appointment
            request for a <strong className="text-foreground">{form.type}</strong> with{' '}
            <strong className="text-foreground">{form.artist}</strong> has been logged.
          </p>

          <div className="bg-[#18181f] border border-white/5 p-4 rounded text-left mb-8 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">Date</span>
              <span className="text-accent font-medium">{form.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">Time Slot</span>
              <span className="text-foreground font-medium">{form.slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">Contact</span>
              <span className="text-foreground font-medium">{form.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowSuccess(false);
              setForm({
                artist: 'Aesthetic Specialist',
                date: '',
                slot: 'Morning (10:00 AM - 1:00 PM)',
                name: '',
                email: '',
                type: 'Consultation',
              });
            }}
            className="w-full bg-accent text-[#111115] py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-accent/90 transition-colors active-press"
          >
            Close Overview
          </button>
        </div>
      </div>
    </main>
  );
}
