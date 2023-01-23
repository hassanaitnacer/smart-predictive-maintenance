/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#2563eb",
          "primary-focus": "#3b82f6",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#2563eb",
          "primary-focus": "#3b82f6",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: "dark",
  },
}
