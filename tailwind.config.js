/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#1F1F1F",
        border: "#222222",
        foreground: "#E8E6E1",
        muted: "#8A93A3",
      },
    },
  },
  plugins: [],
};
