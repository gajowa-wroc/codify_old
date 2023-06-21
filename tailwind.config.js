/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Menlo', 'DejaVu Sans Mono', 'Consolas', 'Lucida Console', 'monospace'],
    },
    extend: {
      screen: {
      'xs': '470px',


      'sm': '640px',


      'md': '768px',


      'lg': '1024px',


      'xl': '1440px',
    }
    },
    
  },
  plugins: [],


}