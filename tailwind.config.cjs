/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'violet-light': 'hsl(270,3%,87%)',
        'violet-medium': 'hsl(279,6%,55%)',
        'violet-dark': 'hsl(278, 68%, 11%)',
        red: 'hsl(0, 100%, 66%)'
      }
    }
  },
  plugins: []
}
