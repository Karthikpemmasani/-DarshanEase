/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3ec',
          100: '#ffe5d3',
          200: '#ffcba5',
          300: '#ffaa6d',
          400: '#ff7d32',
          500: '#ff5c0a',
          600: '#ef4400',
          700: '#c63102',
          800: '#9d270a',
          900: '#7e230c',
          950: '#440f04',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
