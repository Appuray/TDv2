'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const STYLES = [
  { id: 'fineline', name: 'Fine-line Artistry' },
  { id: 'geometric', name: 'Custom Pattern & Geometry' },
  { id: 'blackwork', name: 'Blackwork & Illustration' },
  { id: 'coverup', name: 'Custom Cover-up Work' },
];

const ARTISTS = [
  { id: 'lead1', name: 'Lead Artist (Fine-line & Realism)' },
  { id: 'lead2', name: 'Lead Artist (Geometric & Dotwork)' },
  { id: 'any', name: 'First Available Professional' },
];

const FITZPATRICK_TYPES = [
  { type: 'I', desc: 'Pale white skin, blue/green eyes, burns easily' },
  { type: 'II', desc: 'Fair skin, blue/grey/green eyes, burns easily' },
  { type: 'III', desc: 'Light brown skin, brown eyes, burns moderately' },
  { type: 'IV', desc: 'Moderate brown skin, dark eyes, burns minimally' },
  { type: 'V', desc: 'Dark brown skin, dark eyes, rarely burns' },
  { type: 'VI', desc: 'Deeply pigmented dark skin, dark eyes, never burns' },
];

export default function DualCTA() {
  // Left: Booking State
  const [selectedStyle, setSelectedStyle] = useState('fineline');
  const [selectedArtist, setSelectedArtist] = useState('lead1');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Right: Estimate State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sizeRange, setSizeRange] = useState('medium');
  const [skinType, setSkinType] = useState('III');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [estimateSubmitted, setEstimateSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEstimateSubmitted(true);
  };

  return (
    <section
      id="booking"
      className="py-32 px-6 bg-[#FAF9F6] border-t border-[rgba(196,168,130,0.2)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Form: Booking */}
          <div
            id="scheduler"
            className="p-10 lg:p-14 bg-[#FDFBF7] border border-[rgba(196,168,130,0.2)] rounded-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
                Session Booking
              </span>
              <h3
                className="font-editorial mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#2E2E38',
                }}
              >
                Schedule your
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6B6B78' }}>
                  design consultation.
                </em>
              </h3>
              <p className="text-foreground-muted font-light leading-relaxed mb-10 text-sm max-w-md">
                Select your preferred style focus and artist category. We will contact you within 24
                hours to confirm your consultation details.
              </p>

              {!bookingSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Style Focus */}
                  <div>
                    <label className="etch-label mb-2 block">Style Focus</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {STYLES.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setSelectedStyle(style.id)}
                          className={`etch-select text-left ${selectedStyle === style.id ? 'active' : ''}`}
                        >
                          <span className="text-xs font-medium uppercase tracking-wider block">
                            {style.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Artist */}
                  <div>
                    <label className="etch-label mb-2 block">Preferred Artist</label>
                    <select
                      value={selectedArtist}
                      onChange={(e) => setSelectedArtist(e.target.value)}
                      className="etch-input w-full"
                    >
                      {ARTISTS.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                          {artist.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="etch-label mb-2 block">Select Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="etch-input w-full font-sans"
                      />
                    </div>
                    <div>
                      <label className="etch-label mb-2 block">Preferred Time</label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="etch-input w-full font-sans"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 mt-8">
                    <span>Request Booking</span>
                    <Icon name="CalendarIcon" size={14} />
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center animate-in">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckIcon" size={20} className="text-accent" />
                  </div>
                  <h4 className="font-editorial text-xl mb-3 text-foreground">
                    Consultation Requested
                  </h4>
                  <p className="text-foreground-muted font-light leading-relaxed max-w-sm mx-auto text-sm">
                    Thank you. We have received your request for a custom design session. An artist
                    will review your details and confirm via email shortly.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Form: Concept Upload */}
          <div
            id="estimate"
            className="p-10 lg:p-14 bg-[#111115] border border-[rgba(250,250,250,0.06)] rounded-sm flex flex-col justify-between text-[#FAFAFA]"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
                Concept Submission
              </span>
              <h3
                className="font-editorial mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#FAFAFA',
                }}
              >
                Submit your
                <br />
                <em className="text-shimmer-light" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                  custom design idea.
                </em>
              </h3>
              <p className="text-[#FAFAFA]/45 font-light leading-relaxed mb-10 text-sm max-w-md">
                Send us reference sketches, photos of the placement area, and your sizing
                preferences. We will draw a custom design proposal and provide a project estimate.
              </p>

              {!estimateSubmitted ? (
                <form onSubmit={handleEstimateSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="etch-label text-[#FAFAFA]/70 mb-2 block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Carter"
                        className="etch-input w-full bg-[#18181f] border-[rgba(250,250,250,0.1)] text-[#FAFAFA]"
                      />
                    </div>
                    <div>
                      <label className="etch-label text-[#FAFAFA]/70 mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="etch-input w-full bg-[#18181f] border-[rgba(250,250,250,0.1)] text-[#FAFAFA]"
                      />
                    </div>
                  </div>

                  {/* Size Range */}
                  <div>
                    <label className="etch-label text-[#FAFAFA]/70 mb-2 block">
                      Approximate Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'small', label: '1 - 3" (Micro)' },
                        { id: 'medium', label: '3 - 6" (Medium)' },
                        { id: 'large', label: '6"+ (Sleeve/Back)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSizeRange(item.id)}
                          className={`etch-select bg-[#18181f] text-[#FAFAFA]/60 border-[rgba(250,250,250,0.1)] text-left ${sizeRange === item.id ? 'active border-accent text-accent' : ''}`}
                        >
                          <span className="text-xs font-medium block text-center">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fitzpatrick skin undertone calibration */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="etch-label text-[#FAFAFA]/70">
                        Skin Undertone Category
                      </label>
                      <span className="text-[10px] text-accent font-medium uppercase">
                        For Ink Palette Calibration
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      {FITZPATRICK_TYPES.map((f) => (
                        <button
                          key={f.type}
                          type="button"
                          onClick={() => setSkinType(f.type)}
                          title={f.desc}
                          className={`w-10 h-10 rounded-full font-medium text-xs flex items-center justify-center transition-all ${
                            skinType === f.type
                              ? 'bg-accent text-[#111115] scale-110 shadow-lg shadow-accent/20'
                              : 'bg-[#18181f] border border-[rgba(250,250,250,0.1)] text-[#FAFAFA]/65 hover:bg-[#242430]'
                          }`}
                        >
                          {f.type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="etch-label text-[#FAFAFA]/70 mb-2 block">
                      Upload Reference / Placement Photos
                    </label>
                    <div className="upload-zone border-[rgba(250,250,250,0.15)] bg-[#18181f] hover:bg-[#242430] hover:border-accent/40 relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />

                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Icon name="ArrowUpTrayIcon" size={14} />
                        </div>
                        <p className="text-xs text-[#FAFAFA]/60">
                          {selectedFile
                            ? `Selected: ${selectedFile.name}`
                            : 'Drag and drop or click to upload reference files'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="etch-label text-[#FAFAFA]/70 mb-2 block">
                      Describe your design concept
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share details about style preferences, colors (blackwork vs color), placement alignment, and any symbolic elements..."
                      className="etch-input w-full bg-[#18181f] border-[rgba(250,250,250,0.1)] text-[#FAFAFA] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-4 mt-8 bg-accent text-[#111115] hover:bg-accent/90"
                  >
                    <span>Request Custom Quote & Stencil Mockup</span>
                    <Icon name="ArrowRightIcon" size={14} />
                  </button>
                </form>
              ) : (
                <div className="py-24 text-center animate-in">
                  <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckIcon" size={20} className="text-accent" />
                  </div>
                  <h4 className="font-editorial text-xl mb-3 text-[#FAFAFA]">
                    Concept Design Received!
                  </h4>
                  <p className="text-[#FAFAFA]/45 font-light leading-relaxed max-w-sm mx-auto text-sm">
                    Thank you, {name}. Our design artists will review your reference photo and
                    notes. We will email you a stencil design draft and custom session quote within
                    48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
