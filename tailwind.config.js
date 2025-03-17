module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#FF69B4',
          600: '#FF1493',
          700: '#C71585',
        },
        purple: {
          400: '#9370DB',
          500: '#8A2BE2',
          600: '#7B68EE',
          700: '#6A5ACD',
        },
        yellow: {
          400: '#FFD700',
          500: '#FFC107',
          600: '#FF9800',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        base: '18px',
        lg: '22px',
        xl: '26px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}
