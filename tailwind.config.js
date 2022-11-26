module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-right-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-right-left": "fade-right-left 0.5s ease-out",
      },
      textColor: {
        "blue-default": "#0369a1",
        "dark-blue-default": "#0c4a6e",
      },
      backgroundColor: {
        "blue-default": "#0369a1",
        "dark-blue-default": "#0c4a6e",
      },
      borderColor: {
        "blue-default": "#0369a1",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          link: "#64748B",
          ghost: "#64748B",
          "ghost-hover": "#c1c8d4",
          "ghost-active": "#ffe0e6",
          primary: "#0369a1",
          "primary-active": "#075985",
          "primary-focus": "#075985",
          "primary-hover": "#075985",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
