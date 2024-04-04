module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#4226ff",
        accentLighter: "#5184ff",
        accentLight: "#bad9ff",
        accentBlue: "#366dff",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
