/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        surface: 'var(--color-surface)',
        'bg-main': 'var(--color-bg)',
        foreground: 'var(--color-foreground)',
        'foreground-muted': 'var(--color-foreground-muted)',
        dark: 'var(--color-dark)',
        'dark-surface': 'var(--color-dark-surface)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        editorial: ['Fraunces', 'serif'],
      },
      fontSize: {
        '10px': '10px',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};