/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef7ed",
          100: "#fdecd3",
          200: "#fbdaa7",
          300: "#f7c072",
          400: "#f2a13d",
          500: "#e88527",
          600: "#d4691e",
          700: "#b4531a",
          800: "#924017",
          900: "#783714",
        },
      },
    },
  },
  plugins: [],
};
