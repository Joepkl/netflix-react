/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
      },
      colors: {
        // Main
        "red-main": "#E50914",
        "white-main": "#fff",
        "grey-main": "#403d39",
        "blue-main": "#0d1b2a",
        "black-main": "#000000",
        // Background
        "black-transparent": "#000000b3",
        "bg-dark": "#141414",
        "bg-light": "#181818",
      },
      backgroundImage: {
        "bg-blue-gradient": "linear-gradient(to top, #141414, #0d1b2a)",
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
