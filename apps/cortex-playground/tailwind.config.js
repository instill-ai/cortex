const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@instill-ai/design-tokens/dist/tailwind.config.cjs")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@instill-ai/design-system/dist/*.js",
    "./node_modules/@instill-ai/toolkit/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary_colour_light_blue: "#40A8F5",
        secondary_colour_black: "#1A1A1A",
        highlight_colour_blue: "#0000FF",
        colour_light_grey: "#F6F6F5",
        dark_blue: "#002357",
        instill_green: "#28F67E",
        instill_gray: "#A5A5A5",
        instill_red: "#FF5353",
        instill_yellow: "#FFDF3A",
        instill_light_blue: "#F4FBFF",
        instill_light_yellow: "#FFFCEB",
        instillGrey95: "#1A1A1A",
        instillGrey90: "#2B2B2B",
        instillGrey80: "#5c5c5c",
        instillGrey70: "#8C8A8A",
        instillGrey50: "#A5A5A5",
        instillGrey30: "#C0C0C0",
        instillGrey20: "#E4E4E4",
        instillGrey15: "#E8E8E8",
        instillGrey05: "#F6F6F6",
        instillBlue: "#0000FF",
        instillBlue85: "#002050",
        instillBlue80: "#0268B5",
        instillBlue70: "#003381",
        instillBlue50: "#40A8F5",
        instillBlue10: "#F4FBFF",
        instillYellow50: "#FFDF3A",
        instillYellow30: "#FFF3E4",
        instillYellow10: "#FFFCEB",
        instillRed: "#FF5353",
        instillRed10: "#FFF1F1",
        instillGreen: "#28F67E",
        instillGreen10: "#ECFFF0",
        instillGreen50: "#02D12F",
        instillNeonBlue: "#0000FF",
        instillWarmOrange: "#FF8A00",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
        instill: ["instill", "IBM Plex Mono"],
      },
      margin: {
        15: "60px",
      },
      flex: {
        "33%": "0 0 33%",
      },
      boxShadow: {
        instillMd: "0px 0px 12px rgba(0, 0, 255, 0.22)",
        instillRound: "4px 4px 8px rgba(129, 129, 129, 0.22);",
      },
      screens: {
        xx: "320px",
        xs: "480px",
        max: "1450px", // We have 10px buffer
        tall: { raw: "(min-height: 800px)" },
        short: { raw: "(min-height: 600px and max-height: 800px)" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
