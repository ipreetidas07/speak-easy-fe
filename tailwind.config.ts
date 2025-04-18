/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#F59E0B",
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      fontSize: {},
      padding: {
        "30px": "30px",
        "50px": "50px",
      },
      height: {},
      width: {},
      maxHeight: {},
      minHeight: {},
      minWidth: {},
      margin: {},
      borderRadius: {},
      gap: {},
      lineHeight: {},
      inset: {},
      spacing: {},
      borderWidth: {},
      screens: {},
    },
  },
  plugins: [],
};
