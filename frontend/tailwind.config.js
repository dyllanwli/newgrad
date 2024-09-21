/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#5603fc', // You can adjust this hex code to your preferred shade of navy blue
        "coral": "#fc7b54"
      },
    },
  },
  plugins: [],
}

