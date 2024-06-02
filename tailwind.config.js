/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        twitterWhite: '#e8eaeb',
        twitterBlue: '#308cd8',
        twitterBorder: '#2f3336',
        twitterLightGray: '#71767b',
        twitterDarkGray: '#17181c',
      }
    },
  },
  plugins: [],
};
