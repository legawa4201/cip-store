/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      'text': '#181511',
      'background': '#ffffff',
      'primary': '#313844',
      'secondary': '#c9c7d6',
      'accent': '#937648',
     },
     fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Noto Sans Manichaean',
      body: 'Noto Sans Manichaean',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
  },
  plugins: [require(`daisyui`)],
}

