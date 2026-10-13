/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FDFBF7',
          white: '#FFFFFF',
          line: '#D0E1FD',
          margin: '#FFAAA6',
        },
        ink: {
          blue: '#0000CD',
          red: '#FF0000',
          dark: '#00008B',
          pencil: '#4A5568',
        },
      },
      fontFamily: {
        korean: ['Gaegu', 'cursive', 'sans-serif'],
        hand: ['Patrick Hand', 'cursive', 'sans-serif'],
        cursive: ['Caveat', 'cursive'],
      },
      boxShadow: {
        doodle: '3px 3px 0px rgba(0, 0, 205, 0.25)',
        'doodle-red': '3px 3px 0px rgba(255, 0, 0, 0.3)',
        'doodle-lg': '5px 5px 0px rgba(0, 0, 205, 0.3)',
      },
      borderRadius: {
        doodle: '255px 15px 225px 15px/15px 225px 15px 255px',
        'doodle-sm': '125px 10px 115px 10px/10px 115px 10px 125px',
      },
    },
  },
  plugins: [],
}
