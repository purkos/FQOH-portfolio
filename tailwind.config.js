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
        black: '#000000',
        wPrimaryWhite: '#F0F0F0',
        wSecondaryWhite: '#fdffff',
        wOffsetWhite: '#DFDFDF',
        wPrimaryGray: '#C0C0C0',
        wSecondaryGray: '#818181',
        wBlue: '#0827f5',
        wTeal: '#008080',
        wDarkerTeal: '#007777',
        wPink: '#ff0081'
      }
    },
  },
  plugins: [],
}

