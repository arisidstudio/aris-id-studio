/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           '#0F0D0C',
        surface:      '#171412',
        text: {
          DEFAULT: '#F3EEE7',
          2:       '#C9C1B7',
          3:       '#A39B91',
        },
        accent: {
          DEFAULT: '#5B2EFF',
          soft:    '#AD96FF',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans:    ['"Excon"',         'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [],
}
