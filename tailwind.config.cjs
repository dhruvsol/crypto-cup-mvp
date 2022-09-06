/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Background.blue": "#0F111E",
      },
      fontFamily: {
        "dm-serif": "DM Serif Display",
      },
    },
  },
  plugins: [],
};
