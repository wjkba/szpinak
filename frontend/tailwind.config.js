/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        szpgray: "#F4F4F4",
        szpgreen: "#82B536",
        szppurple: "#3F3D56",
        offwhite: "#FAF9F6",
      },
      screens: {
        xs: { max: "350px" },
      },
    },
  },
  plugins: [],
};
