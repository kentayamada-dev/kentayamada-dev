import { screenOptions } from './src/app/constants/screens';
import tailwindcssTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.tsx'],
  theme: {
    screens: {
      md: `${screenOptions.md}px`,
      sm: `${screenOptions.sm}px`
    }
  },
  plugins: [tailwindcssTypography],
  darkMode: 'class'
};
