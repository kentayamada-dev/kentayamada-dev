import { screenOptions } from './src/app/constants/screens';
import tailwindcssTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.tsx'],
  theme: {
    screens: {
      sm: `${screenOptions.sm}px`
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        mono: ['var(--font-roboto-mono)']
      }
    }
  },
  plugins: [tailwindcssTypography],
  darkMode: 'class'
};
