module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
