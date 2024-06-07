/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: '#AD88C6',
        customPurple2: '#6A41AE',
      },
    },
  },
  plugins: [],
}

