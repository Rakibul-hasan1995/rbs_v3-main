/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontSize: {
      base: "11px",
      sm: "11px",
      xs: "9px",
      md: "13px",
      lg: "15px",
    },  
    extend: {
      colors: {
        sidebar: {
          bg: {
            primary: "#1e293b",
            secondary: "#0f172a",
          },
        },
        base: {
          dark: {
            primary: "#0f172a",
            secondary: "#1e293b",
          },
          light: {
            primary: "#f1f1f1",
            secondary: "#fff",
          },
        },
        text: {
          primary: {
            light: "#408dfb",
            dark: "#41d2ff",
          },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
});
