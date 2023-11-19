import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#503AF2',
        light:"#f4f0ff",
        primaryHover:"#2413a3d4",
        secondary: '#63a8f8',
        error:"#ff4d4f",
        warning:"#faad14",
        success:"#52c41a",
      },
      screens: {
        xs: '480px',
        smAnt: '576px',
        lgAnt: '992px',
        xlAnt: '1200px',
        xxlAnt: '1600px',
      },
    },
  },
  plugins: [],
};
export default config;
