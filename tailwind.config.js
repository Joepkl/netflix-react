/** @type {import('tailwindcss').Config} */
const screens = {
  xsm: "400px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "2000px",
};

const safelist = [
  ...Object.keys(screens).map((el) => `${el}:hidden ${el}:block`),
  ...Object.keys(screens).map((el) => `${el}:block`),
];

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist,
  theme: {
    screens,
    extend: {
      fontFamily: {
        sans: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
      },
      colors: {
        // Main
        "red-main": "#E50914",
        "white-main": "#fff",
        "grey-main": "#505050",
        "blue-main": "#0d1b2a",
        "black-main": "#000000",
        // Light
        "grey-light": "#9A9A9A",
        // Background
        "black-transparent": "#000000b3",
        "bg-dark": "#141414",
        "bg-light": "#181818",
      },
      backgroundImage: {
        "black-gradient-to-right": "linear-gradient(to right, #000000b3 0%, #000000b3 50%, transparent)",
      },
      borderRadius: {
        default: "5px",
      },
      zIndex: {
        999: "999",
      },
    },
  },
  plugins: [],
};
