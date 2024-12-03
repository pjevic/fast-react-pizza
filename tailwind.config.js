/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      pizza: "Roboto Mono, monospace",
    },
    extend: {
      height: {
        screen: "100dvh", // DYNAMIC VIEWPORT HEIGHT
      },
    },
  },
  plugins: [],
};
