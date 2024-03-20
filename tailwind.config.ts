/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation:{
        'custom-pulse':'custom-pulse 1000ms ease-in-out infinite'
      },
      colors: {
        'white': '#FCFCFC',
        'back-grey': '#3C3C3C',
        'modal-grey': '#333333',
        'primary': 'var(--primary-color)',
        'contrast': 'var(--contrast-color)',
        'primary-opacity':'color-mix(in srgb, var(--primary-color) 50%, white)',
        'secondary-opacity':'color-mix(in srgb, var(--secondary-color) 50%, white)',
        'light-pink': '#f576ae',
        'secondary':'var(--secondary-color)',
          'light-orange':'#fa877a',
          'input-grey':'#F2F2F2',
          'grey-icon':'#E8E6E6 ',
        'input-grey-opacity':'rgba(34, 34, 34, 0.02)',
        'input-toggle-grey': '#E0E0E0'
      },
      screens: {
        smm: '360px',
        '1.5xl': '1440px',
        '3xl': '1792px',
        '4xl': '1792px',
      },
      boxShadow: {
        'blur-10': '0 0px 10px 0px rgba(0, 0, 0, 0.25)',
        'blur-20': '0 0px 20px 0px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        'alata': ['Alata', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  variants: {
    animationDuration: ['responsive'],
  },

  plugins: [
    require("tailwindcss-animation-delay"),
  ],
  darkMode:"class"
}
