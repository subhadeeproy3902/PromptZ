/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#6000de",
        xd1: "rgba(124, 58, 237, 0.2)",
        xd2: "rgba(59, 130, 246, 0.2)",
      },
    },
  },
  plugins: [],
};
