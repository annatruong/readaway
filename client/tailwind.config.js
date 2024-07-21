/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGreen: '#36BA98',
        customDarkGreen: '#2b997d',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
