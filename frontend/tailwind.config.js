/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#0A1628',
        teal:  '#00C4B4',
        gold:  '#F5A623',
        dark2: '#1A2E45',
      },
    },
  },
  plugins: [],
}