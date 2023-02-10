/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vscblue: '#61afef',
        vscyellow: '#e5c07b',
        vscwhite: '#dcdfe4',
        vscblack: '#282c34',
        vscmagenta: '#c678dd',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(green|yellow|red|sky|purple|indigo|teal|cyan)/,
    },
  ],
};
