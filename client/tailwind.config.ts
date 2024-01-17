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
      animation: {},
      keyframes: {},
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.semibold"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.semibold"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.semibold"),
        },
        h4: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.light"),
        },
      });
    }),
  ],
  daisyui: {
    themes: ["night", "winter"],
    darkTheme: "night",
  },
};
