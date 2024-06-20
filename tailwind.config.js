/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
"node_modules/flowbite-react/lib/esm/**/*.js"
],
  theme: {
    extend: {
      colors:{
        darkPrimaryColor:"rgb(69, 71, 75)",
        lightPrimaryColor:"rgb(73, 94, 87)",
        darkSecColor:"rgb(196, 240, 0)",
        lightSecColor:"rgb(245, 247, 248)",
        wishListColor:"rgb(219, 120, 120)",
        cartColor:"#09681c"
      }
    },
  },
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
}

