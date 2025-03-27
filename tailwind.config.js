/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'dark-gray': '#1E1E1E',
        'light-gray': '#A9A9A9',
      },
      fontSize: {
        'lg-bold': ['18px', { fontWeight: '700' }],
      },
      borderRadius: {
        'btn': '25px',
      },
      padding: {
        'btn-y': '12px',
        'btn-x': '30px',
      },
    },
  },
  plugins: [],
};