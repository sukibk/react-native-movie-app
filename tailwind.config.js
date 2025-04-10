/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        secondary: "#4865e5",
        "accent-dark": "#412be4",
        "accent-light": "#9485ff",
        "primary-dark": "#412be4",
        "primary-light": "#9e90ff",
        "modal-light-bg": "#e4e1ff",
        "modal-dark-bg": "#14213d",
        "modal-light-fg": "#808080",
        "modal-dark-fg": "#7d8bae",
        "dark-bg": "#0c0e1a",
        "dark-fg": "#f9f9f9",
        "light-bg": "#f9f9f9",
        "light-fg": "#3b3b3b",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
