/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#263038', // Define your custom background color here
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}
