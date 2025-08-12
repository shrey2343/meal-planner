// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // यह लाइन बहुत ज़रूरी है
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}