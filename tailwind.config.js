const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      // Specific colours
      black: colors.black,
      white: colors.white,
      gray: colors.gray,

      // Named colours
      base: colors.gray,
      primary: colors.indigo,
      accent: colors.indigo,
    },
    fluidType: {
      settings: {
        fontSizeMin: toRem(16),
        fontSizeMax: toRem(18),
        ratioMin: 1.125,
        ratioMax: 1.25,
        screenMin: toRem(375),
        screenMax: toRem(1600),
        unit: 'rem',
        prefix: '',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('tailwindcss-fluid-type'),
  ],
};

function toRem(pixelValue) {
  return pixelValue / 16;
}
