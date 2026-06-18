import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09090B",
        panel: "#131316",
        line: "#2A2A30",
        gold: "#F5C542",
        "gold-soft": "#FFE28A",
        steel: "#A7B0BE",
        mint: "#59D3A5"
      },
      boxShadow: {
        glow: "0 0 60px rgba(245, 197, 66, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
