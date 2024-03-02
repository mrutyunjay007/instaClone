/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#111827",
        color: "#f3f4f6",
      },
      keyframes: {
        bouncy: {
          "0%": {
            transform: "null",
            transitionTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "32%,64%,100%": {
            transform: "translateY(0%)",
            transitionTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "16%": {
            transform: "translateY(-50%)",
            transitionTimingFunction: " cubic-bezier(0.8,0,1,1)",
          },
          "48%": {
            transform: "translateY(-25%)",
            transitionTimingFunction: " cubic-bezier(0.8,0,1,1)",
          },
          "80%": {
            transform: "translateY(-10%)",
            transitionTimingFunction: " cubic-bezier(0.8,0,1,1)",
          },
        },
      },
      animation: {
        bouncy: "bouncy 1s",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
