// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003366',
        accent: '#FACC15',
      },
      boxShadow: {
        card: '0 8px 30px rgba(2, 8, 23, 0.12)',
      },
    },
  },
  plugins: [],
};