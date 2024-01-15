/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "environmental-protection":
          "url('/images/environmental-protection.jpg')",
        "lush-stream": "url('/images/lush-stream.png')",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.semibold"),
        },
      });
    }),
  ],
  daisyui: {
    themes: ["nord", "forest"],
  },
};
