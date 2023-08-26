/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        tilt: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(25deg)" },
          "50%": { transform: "rotate(0eg)" },
          "75%": { transform: "rotate(-25deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        tilt: "tilt 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};
