// tailwind.config.js
/** @type {import('tailwindcss').Config} */

const { colors, fontFamily } = require('./constants/styling')

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
  plugins: [],
}
