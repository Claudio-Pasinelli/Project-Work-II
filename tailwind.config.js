/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      DMSans: ['DM Sans', 'sans-serif'],
    },
    fontSize: {
      h1: '4.5rem',
      h2: '3rem',
      h3: '2.5rem',
      h4: '2rem',
      h5: '1.5rem',
      h6: '1.125rem',
      xxl: '3.5rem',
      smm: '1.5rem',
      sm: '1.125rem',
      xl: '3rem',
      lg: '2.5rem',
      md: '2rem',
      s: '0.925rem',
      xs: '0.875rem',
      xxs: '0.675rem',
      '6xl': '3.75rem',
    },
    colors:{
      black: '#000000',
      white: '#ffffff',
      gray: {
        50: '#F8F8F8',
        100: '#F5F5F0',
        200: '#C1C1C1',
        300: '#8f8f8f',
      },
      red: '#FF2323',
      yellow: {
        50: '#FFE500',
        100: '#FFD700'
      },
      orange: '#FFB800',
      lightblue: '#3ADBFF',
      green: '#00E408',
    },
    extend: {},
  },
  plugins: [],
}

