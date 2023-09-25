/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      "winter",
      "night"
    ],
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true
  },
  darkMode: ['class', '[data-theme="night"]']
}

