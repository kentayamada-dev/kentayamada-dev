/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    logs: false
  }
};
