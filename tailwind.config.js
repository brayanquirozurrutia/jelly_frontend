/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple1: '#be87e7',
        purple2: '#a57ee8',
        green1: '#c2d5de',
        green2: '#4e9d9b',
        pink1: '#efaea4',
        pink2: '#e6d0dd',
        pink3: '#fdbb9f',
        blue1: '#82b5eb',
      },
    },
  },
  plugins: [],
}
