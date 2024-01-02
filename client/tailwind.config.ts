/** @type {import('tailwindcss').Config} */

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
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["nord", "forest"],
  },
};
