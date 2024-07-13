import { screenOptions } from './app/constants/screens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.tsx'],
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
