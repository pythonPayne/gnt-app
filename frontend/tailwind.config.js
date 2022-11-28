module.exports = {    
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 27s linear infinite',
      }
    },
  },  
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
