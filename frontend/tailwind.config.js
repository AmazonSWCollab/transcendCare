/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink_bg: "#FFDCED",
        purple_main: "#C5A3CB",
      },
      fontFamily: {
        lexend: ["Lexend"],
      },
    },
  },
  plugins: [],
};
