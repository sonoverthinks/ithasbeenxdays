import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "Arial", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blackCoral: "#536471",
        darkGray: "#657786",
        lightGray: "#AAB8C2",
        extraLightGray: "#E1E8ED",
        extraExtraLightGray: "#F5F8FA",
        black: "#14171A",
        blue: "#1DA1F2",
      },
    },
  },
  plugins: [],
};
export default config;
