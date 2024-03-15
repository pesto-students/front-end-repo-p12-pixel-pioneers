/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#B9FF66",
        grey: "#F3F3F3",
        error: "rgb(239, 68 ,68 )",
        navyblue: "#191A23",
      },
    },
  },
  plugins: [],
};
