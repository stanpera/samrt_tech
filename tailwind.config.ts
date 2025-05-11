import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        successBg: "#4caf50",
        errorBg: "#f44336",
        warningBg: "#ff9800",
        infoBg: "#2196f3",
        background: "#1c1f21",
        firstContent: "#e8b678",
        secondContent: "#5e5c53",
        whiteContent: "#e7e7e7",
        cards: "#262a2c",
        icons: "#a3b2b7",
        highlights: "#c49a53",
        special: "#5c6b74",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        base: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
