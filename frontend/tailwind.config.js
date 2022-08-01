module.exports = {    
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },  
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
