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
        twitterRose: '#fa1982',
        twitterPurple: '#c935cc',
        twitterGreen: '#00ba7c',
        twitterBorder: '#2f3336',
        twitterLightGray: '#71767b',
        twitterDarkGray: '#17181c',
      }
    },
    screens: {
      "2xl" : {max: "1535px"},
      // => @media(max-width: 1535px) { ... }

      "xl": { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      "lg": { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      "md": { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "sm": { max: "639px" },
      // => @media (max-width: 639px) { ... }

      "xs": { max: "479px" },
      // => @media (max-width: 479px) { ... }
    }

  },
  plugins: [],
};
