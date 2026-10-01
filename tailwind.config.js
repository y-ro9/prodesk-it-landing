/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./index.html",
    "./index-raw-css.html",
    "./js/**/*.js",
  ],

  // Enable dark mode via [data-theme="dark"] on <html>
  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          accent: "#a855f7",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: "1160px",
      },
      boxShadow: {
        brand: "0 12px 32px rgba(99, 102, 241, 0.35)",
        "brand-lg": "0 18px 40px rgba(99, 102, 241, 0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%":      { transform: "translate(30px, -30px) scale(1.08)" },
          "66%":      { transform: "translate(-25px, 20px) scale(0.95)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.5)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(34, 197, 94, 0)" },
        },
      },
      animation: {
        float: "float 14s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s infinite",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
      },
    },
  },

  plugins: [],
};
