import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunburn: {
          dark: "#152935",
          slate: "#698ea2",
          warm: "#e4a576",
          light: "#ccd5d2",
          cream: "#fde5d6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
