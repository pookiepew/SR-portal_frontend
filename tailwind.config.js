module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#69207E",
        primaryHover: "#5b236b",
        secondary: "#00539F",
        body: "#363642",
        label: "#A5A5A5",
      },
      fontFamily: {
        heading: ["'Fira Sans'"],
        body: ["'Nunito'"],
      },
      scale: {
        "200": "2",
        "250": "2.5",
        "300": "3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
