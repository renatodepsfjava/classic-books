/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d5a3',
          dark: '#8a6d2f',
        },
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#0d0d0d',
          deep: '#050505',
          muted: '#111111',
          subtle: '#2a2a2a',
        },
        cream: '#f5f0e8',
      },
    },
  },
  plugins: [],
}