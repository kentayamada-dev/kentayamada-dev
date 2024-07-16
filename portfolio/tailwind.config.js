import { screenOptions } from './src/app/constants/screens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.tsx'],
  theme: {
    screens: {
      sm: `${screenOptions.sm}px`,
      md: `${screenOptions.md}px`
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        mono: ['var(--font-roboto-mono)']
      }
    }
  },
  darkMode: 'class'
};
