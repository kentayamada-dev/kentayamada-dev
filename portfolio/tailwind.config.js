import TailwindcssTypography from '@tailwindcss/typography';
import Daisyui from 'daisyui';
import { constants } from './app/constants/index.ts';

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
  plugins: [TailwindcssTypography, Daisyui],
  darkMode: ['selector', '[data-theme="dark"]'],
  daisyui: {
    logs: false,
    themes: constants.themes
  }
};
