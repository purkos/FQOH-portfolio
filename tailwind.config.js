/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        navyBlue: '#000080',
        teal: '#008080',
        green: '#008000',
        oliveGreen: '#808000',
        silver: '#C0C0C0',
        purple: '#800080',
        plum: '#800080',
        fuchsia: '#FF00FF',
        maroon: '#800000',
        red: '#FF0000',
        orange: '#FFA500',
        yellow: '#FFFF00',
        lime: '#00FF00',
        aqua: '#00FFFF',
        skyBlue: '#87CEEB',
        dodgerBlue: '#1E90FF',
      }
    },
  },
  plugins: [],
}

