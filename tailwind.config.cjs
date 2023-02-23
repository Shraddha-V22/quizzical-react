/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#293264",
        lightBlue: "#4D5B9E",
        lightestBlue: "#D6DBF5",
        offWhite: "#F5F7FB",
        errorRed: "#F8BCBC",
        successGreen: "#94D7A2",
      },
    },
  },
  plugins: [],
};
