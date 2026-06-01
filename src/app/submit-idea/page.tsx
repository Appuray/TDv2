'use client';

import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface FormState {
  name: string;
  email: string;
  placement: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  placement?: string;
  description?: string;
  files?: string;
}

export default function SubmitIdeaPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    placement: '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getPlacementPainDetails = (placementStr: string) => {
    const norm = placementStr.toLowerCase();
    if (!norm.trim()) return null;
    if (
      norm.includes('rib') ||
      norm.includes('sternum') ||
      norm.includes('chest') ||
      norm.includes('stomach') ||
      norm.includes('belly')
    ) {
      return {
        pain: 9,
        level: 'Extreme',
        healing: '3-4 weeks',
        sessions: 2,
        advice:
          'The ribs and chest are high-sensitivity zones. Prepare for intense sensations and wear loose-fitting clothing.',
      };
    }
    if (
      norm.includes('spine') ||
      norm.includes('neck') ||
      norm.includes('head') ||
      norm.includes('throat')
    ) {
      return {
        pain: 9,
        level: 'Extreme',
        healing: '3 weeks',
        sessions: 2,
        advice: 'Bone-adjacent locations trigger strong resonance. We recommend split sessions.',
      };
    }
    if (
      norm.includes('arm') ||
      norm.includes('forearm') ||
      norm.includes('bicep') ||
      norm.includes('tricep') ||
      norm.includes('shoulder')
    ) {
      return {
        pain: 3,
        level: 'Low',
        healing: '2-3 weeks',
        sessions: 1,
        advice:
          'Excellent canvas for fine-line details. Outer arm areas are typically the least sensitive.',
      };
    }
    if (
      norm.includes('wrist') ||
      norm.includes('ankle') ||
      norm.includes('foot') ||
      norm.includes('hand') ||
      norm.includes('finger')
    ) {
      return {
        pain: 5,
        level: 'Moderate',
        healing: '2-3 weeks',
        sessions: 1,
        advice: 'Extremities experience high friction. Requires diligent aftercare wrapping.',
      };
    }
    if (
      norm.includes('leg') ||
      norm.includes('calf') ||
      norm.includes('thigh') ||
      norm.includes('shin')
    ) {
      return {
        pain: 6,
        level: 'High',
        healing: '2 weeks',
        sessions: 2,
        advice: 'Large muscle groups conform beautifully to Neo-Traditional styling.',
      };
    }
    return {
      pain: 4,
      level: 'Moderate',
      healing: '2 weeks',
      sessions: 1,
      advice: 'Standard flat surface with minor bone contact. Comfortable for medium-sized drafts.',
    };
  };

  const activePain = getPlacementPainDetails(form.placement);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const simulateFileUpload = (fileNames: string[]) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFiles((prevFiles) => [...prevFiles, ...fileNames].slice(0, 3));
          setTimeout(() => setUploadProgress(null), 600);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileNames = Array.from(e.dataTransfer.files).map((file) => file.name);
      simulateFileUpload(fileNames);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map((file) => file.name);
      simulateFileUpload(fileNames);
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!form.placement.trim()) tempErrors.placement = 'Body placement is required';
    if (!form.description.trim()) tempErrors.description = 'Design description is required';
    if (uploadedFiles.length === 0) tempErrors.files = 'Please upload at least one reference image';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Dynamically import to avoid SSR issues if firebase is client-only
      const { db, collection, addDoc, serverTimestamp } = await import('@/lib/firebase');

      await addDoc(collection(db, 'leads_ideas'), {
        ...form,
        files: uploadedFiles,
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('There was an error submitting your idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (idxToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <main className="min-h-[100dvh] bg-bg-main flex flex-col lg:flex-row-reverse relative">
      {/* Right: Stark Black Decorative Area */}
      <div className="w-full lg:w-5/12 relative min-h-[40vh] lg:min-h-[100dvh] lg:sticky lg:top-0 bg-[#111115] text-accent flex flex-col justify-center items-center p-8 lg:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 lg:opacity-40">
          <AppImage
            src="/images/tattoo_design.png"
            alt="Tattoo designer sketching fine line artwork stencils"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover mix-blend-overlay grayscale"
          />
        </div>

        <div className="relative z-20 text-center w-full px-6 flex flex-col items-center">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            className="mx-auto animate-[spin_80s_linear_infinite] mb-8 opacity-60"
          >
            <circle cx="50" cy="50" r="48" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M50 10L50 90M10 50L90 50" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
          <h2 className="font-editorial text-3xl lg:text-5xl font-light italic mb-4 leading-none">
            Your Vision.
            <br />
            Our Execution.
          </h2>
          <p className="text-accent/60 text-xs max-w-sm mx-auto uppercase tracking-widest2">
            Bespoke Body Art atelier
          </p>
        </div>
      </div>

      {/* Left: Stark Off-Black Form Area */}
      <div className="w-full lg:w-7/12 pt-12 lg:pt-32 pb-20 px-6 lg:px-16 xl:px-24 bg-[#18181f] text-foreground flex flex-col justify-center">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground-muted font-bold mb-4 animate-in">
            Custom Projects
          </p>
          <h1 className="font-editorial text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-in-delay-1 text-foreground">
            Submit Your Idea.
          </h1>
          <p className="text-foreground-muted font-light max-w-lg leading-relaxed text-sm lg:text-base animate-in-delay-2">
            Share your vision, references, and placement ideas. We carefully review every submission
            to ensure it aligns with our artistic style.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 animate-in-delay-3">
          <div className="space-y-8">
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Placement */}
            <div className="space-y-4 group">
              <label htmlFor="placement" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Placement on Body
              </label>
              <input
                id="placement"
                type="text"
                value={form.placement}
                onChange={(e) => setForm({ ...form, placement: e.target.value })}
                className={`w-full bg-transparent border-b-2 py-4 text-lg md:text-xl font-light text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/25 etch-focus-glow ${
                  errors.placement ? 'border-red-500/60' : 'border-white/10'
                }`}
                placeholder="e.g. Inner left forearm"
              />

              {/* Presets List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Outer Forearm',
                  'Spine Alignment',
                  'Rib Cage',
                  'Ankle / Foot',
                  'Thigh Panel',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setForm({ ...form, placement: preset })}
                    className={`px-3 py-1.5 text-[9px] uppercase tracking-widest font-semibold border transition-all duration-300 ${
                      form.placement === preset
                        ? 'bg-accent border-accent text-dark'
                        : 'bg-transparent border-white/10 text-foreground/60 hover:border-accent/40 hover:text-accent'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Reactive Pain HUD Panel */}
              {activePain && (
                <div className="bg-[#111115] border border-accent/25 p-5 rounded-xl space-y-4 mt-4 animate-in duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
                      Anatomical Pain Index
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold ${
                        activePain.pain >= 8
                          ? 'bg-red-950/60 text-red-400 border border-red-800/40 shadow-[0_0_12px_rgba(239,68,68,0.1)]'
                          : activePain.pain >= 5
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      }`}
                    >
                      {activePain.level} Sensitivity ({activePain.pain}/10)
                    </span>
                  </div>

                  {/* Pain Bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-750 ${
                        activePain.pain >= 8
                          ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                          : activePain.pain >= 5
                            ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'
                            : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                      }`}
                      style={{ width: `${(activePain.pain / 10) * 100}%` }}
                    />
                  </div>

                  {/* Technical stats grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-b border-white/5 pb-3">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-0.5 font-bold">
                        Healing Timeline
                      </span>
                      <span className="text-foreground font-semibold">{activePain.healing}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-0.5 font-bold">
                        Recommended Sessions
                      </span>
                      <span className="text-foreground font-semibold">
                        {activePain.sessions} Session(s)
                      </span>
                    </div>
                  </div>

                  {/* Professional Advice */}
                  <p className="text-[10.5px] italic text-accent font-light leading-relaxed">
                    &ldquo;{activePain.advice}&rdquo;
                  </p>
                </div>
              )}

              {errors.placement && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.placement}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 group">
              <label htmlFor="description" className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground transition-colors">
                Design Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`w-full bg-transparent border-b-2 py-4 text-lg md:text-xl font-light text-foreground focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-foreground/25 leading-relaxed etch-focus-glow ${
                  errors.description ? 'border-red-500/60' : 'border-white/10'
                }`}
                placeholder="Describe your vision, placement details, general size, and artistic style preferences..."
              />
              {errors.description && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Reference Upload Box with Drag and Drop */}
            <div className="space-y-3">
              <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
                Reference Images
              </label>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleFileSelect}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group active-press ${
                  isDragOver
                    ? 'border-accent bg-accent/5'
                    : 'border-white/20 hover:border-accent/40 hover:bg-[#111115]/30'
                }`}
              >
                <div className="mb-4 text-accent/70 flex justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                <p className="text-lg font-light text-foreground mb-1 group-hover:text-accent transition-colors">
                  Drag &amp; drop images here or{' '}
                  <span className="underline font-medium text-accent">browse</span>
                </p>
                <p className="text-[9px] uppercase tracking-widest2 text-foreground-muted font-bold">
                  Max 3 files (JPEG, PNG) • 5MB each
                </p>
              </div>

              {/* Uploading progress bar */}
              {uploadProgress !== null && (
                <div className="bg-[#111115] border border-accent/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-accent uppercase tracking-wider font-semibold">
                      Uploading references
                    </span>
                    <span className="text-foreground font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 overflow-hidden rounded-full">
                    <div
                      className="bg-accent h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Uploaded files listing */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
                    Attached Files ({uploadedFiles.length}/3)
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {uploadedFiles.map((fileName, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-[#111115] border border-white/5 px-4 py-3 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth="1.5"
                            className="flex-shrink-0"
                          >
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5zM14 2v5h5" />
                          </svg>
                          <span className="text-foreground font-medium truncate">{fileName}</span>
                        </div>
                        <button
                          type="button"
                          aria-label={`Delete ${fileName}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="text-red-400 hover:text-red-300 font-bold px-2 py-1 active-press"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.files && (
                <p className="text-[10px] text-red-500 tracking-wider font-medium uppercase mt-1">
                  {errors.files}
                </p>
              )}
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
                  <span>Processing Concept...</span>
                </>
              ) : (
                <span>Submit Concept</span>
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

          <h3 className="font-editorial text-3xl text-foreground mb-4">Concept Lodged.</h3>
          <p className="text-foreground-muted font-light leading-relaxed text-sm mb-8">
            Thank you, <strong className="text-foreground">{form.name}</strong>. Your custom tattoo
            concept for body placement "
            <strong className="text-foreground">{form.placement}</strong>" has been submitted
            successfully.
          </p>

          <div className="bg-[#18181f] border border-white/5 p-4 rounded text-left mb-8 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">Placement</span>
              <span className="text-accent font-medium truncate max-w-[200px]">
                {form.placement}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">References</span>
              <span className="text-foreground font-medium">
                {uploadedFiles.length} file(s) attached
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted uppercase tracking-wider">Contact</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {form.email}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowSuccess(false);
              setForm({
                name: '',
                email: '',
                placement: '',
                description: '',
              });
              setUploadedFiles([]);
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
