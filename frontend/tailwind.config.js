/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'christmas-red': '#e02f31',    // Christmas red
        'christmas-green': '#2a8f5e',  // Christmas green
        'christmas-gold': '#f1c27d',   // Christmas gold
        'christmas-light-green': '#8df3a1', // Light green for buttons
        'christmas-dark-green': '#1d5e3d', // Darker green for hover effect
        'christmas-white': '#ffffff', // White for text and backgrounds
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
        fade: 'fade 0.5s ease-in-out',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000' },
          '50%': { textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000' },
          '100%': { textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }