/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'white':'#FCFCFC',
        'back-grey':'#3C3C3C',
        'modal-grey':'#333333',
        'primary':'var(--primary-color)',
        'light-pink': '#f576ae',
        'secondary':'var(--secondary-color)',
          'light-orange':'#fa877a',
          'input-grey':'#F2F2F2',
          'grey-icon':'#E8E6E6 ',
        'input-grey-opacity':'rgba(34, 34, 34, 0.02)',
        'input-toggle-grey': '#E0E0E0'
      },
      boxShadow: {
        'blur-10': '0 0px 10px 0px rgba(0, 0, 0, 0.25)',
        'blur-20': '0 0px 20px 0px rgba(0, 0, 0, 0.25)',
      }, 
      fontFamily:{
        'alata':['Alata', 'sans-serif'],
        'montserrat':['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
