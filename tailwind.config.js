// tailwind.config.js
/** @type {import('tailwindcss').Config} */

const { tailwind } = require('./constants/styling')

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: tailwind.colors,
      fontFamily: tailwind.fontFamily,
    },
  },
  plugins: [],
  darkMode: 'class',
  // sets a `class="dark"` on the web's html tag
}
