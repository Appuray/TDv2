# 🧠 AI Project Memory

This file serves as the persistent memory for the AI assistant across different sessions. 
By maintaining this document, the AI will remember the project context, our goals, and what we've discussed previously.

---

## 🎯 Project Vision & Goals
* **Project Name:** fade
* **Goal:** Build a "god-level" Tattoo Design and Tattoo Studio website. It should showcase beautiful tattoo designs and professional tattoo-making processes.
* **Vibe/Aesthetics:** Premium, dynamic, rich aesthetics, modern and dark mode friendly, with cinematic and highly detailed visuals.

## 💻 Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + PostCSS + Autoprefixer
* **UI Libraries:** Recharts, Heroicons, tailwindcss-animate

## 📝 Current State & Context
* *[2026-05-21]*: Initialized the AI memory system (`CONTEXT.md`).
* *[2026-05-21]*: Replaced all generic placeholder images across the website with high-quality, AI-generated images of tattoo designs and tattoo making.
* *[2026-05-21]*: Fixed a 500 Internal Server Error in `/submit-idea`.
* *[2026-05-21]*: Upgraded layout across all pages (Masonry gallery, sticky process, split-screen forms) and verified with Next.js build.
* *[2026-05-21]*: Overhauled the entire UI into a "God-Level" Light & Black Editorial aesthetic, but subsequently **reverted** the color theme back to the original Premium Dark Mode (black backgrounds with gold/bronze accents) based on user preference. The app successfully runs on `localhost:3002`.
* *[2026-05-21]*: Successfully implemented state-of-the-art interactive modules: the draggable/scalable **Interactive Tattoo Canvas Simulator** (`TattooVisualizer.tsx`) and the before/after **Healed Curtain Slider** (`HealedSlider.tsx`), fully integrated into the main landing page alongside custom body placement pain consulting estimators.
* *[2026-05-21]*: Fixed a critical Next.js runtime TypeError (`__webpack_modules__[moduleId] is not a function`) by refactoring wildcard `import * as HeroIcons` inside `AppIcon.tsx` into static, tree-shakeable lookups.


## 🧠 Key Decisions & Guidelines
* **Memory Update Rule:** Whenever we make a significant architectural decision or add a major feature, update this `CONTEXT.md` file.
* **Session Startup:** When starting a new session, the user can say "Read Context" or the AI should automatically try to find and read this file to regain context.

## 📅 Session Log
* **Session 1 (Current):** 
  - User requested a persistent memory system. Created `CONTEXT.md`.
  - User established the project theme: Tattoo Design & Tattoo Studio.
  - Generated premium tattoo images and updated website codebase to use these instead of placeholders.
  - Upgraded layouts for `/gallery`, `/process`, `/submit-idea`, `/book-session`, `/faq`, `/about` to be ultra-premium ("god-level" requirement).
  - Fixed a Next.js 500 error on the `/submit-idea` page.
  - Temporarily switched to a high-contrast Light/Black editorial theme, then successfully reverted back to the original Premium Dark theme (black & gold) while keeping the structural layout upgrades.
  - Designed and deployed **Interactive Tattoo Canvas Simulator** with draggable stencils, responsive skin tone presets, dynamic anatomical pain factor scales, and pre-filled scheduling integrations.
  - Created touch-responsive **Healed Curtain Slider** (`HealedSlider.tsx`) comparing digital stencils (`digital_sketch.png`) and fully healed results (`healed_result.png`).
  - Infused the custom idea submission portal with a **Reactive Pain Index HUD** providing healing schedules and custom prep advice.
  - Verified compilation and stability.
