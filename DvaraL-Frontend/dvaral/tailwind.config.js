export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './index.html',
    './src//*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
                'dancing-script': ['"Dancing Script"', 'cursive'],
                'acme': ['"Acme"', 'sans-serif'],
                'poppins': ['"Poppins"', 'sans-serif'],
                'merienda': ['"Merienda"', 'cursive'],
                'josefin-sans': ['"Josefin Sans"', 'sans-serif'],
              },
    },
    extend: {},
  },
  plugins: [],
}
