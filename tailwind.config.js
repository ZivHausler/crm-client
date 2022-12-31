/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        task: "1px 1px 8px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};