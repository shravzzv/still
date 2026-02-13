// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        surface: '#F6F4EF',
        primary: '#111827',
        muted: '#6B7280',
        accent: '#6F8196',
        border: '#E5E7EB',
      },
      fontFamily: {
        inter: ['Inter_400Regular'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-black': ['Inter_900Black'],
      },
    },
  },
  plugins: [],
}
