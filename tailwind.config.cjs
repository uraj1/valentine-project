/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"],
      },
      colors: {
        ink: "#0f0f12",
        blush: "#f9f4f6",
        rose: "#ff7aa2",
        lavender: "#c9b3ff",
      },
      boxShadow: {
        soft: "0 20px 80px rgba(0,0,0,0.12)",
        glass: "0 20px 80px rgba(10,10,20,0.20)",
      },
      borderRadius: {
        xl2: "18px",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 8s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
