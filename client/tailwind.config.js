import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  daisyui: {
    themes:[]
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#56c491",
        "gold": "#f6a355",
      }
    },
  },
  plugins: [daisyui],
}