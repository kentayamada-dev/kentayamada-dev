import TailwindcssTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        mono: ['var(--font-roboto-mono)']
      }
    }
  },
  plugins: [TailwindcssTypography],
  darkMode: 'class'
};
