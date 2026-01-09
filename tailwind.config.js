/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FDFAF8", // Warm Off White
        primary: {
          DEFAULT: "#00695C", // Deep Teal
          light: "#4DB6AC",
          dark: "#004D40",
        },
        secondary: {
          DEFAULT: "#FF7043", // Warm Coral
          light: "#FF8A65",
          dark: "#D84315",
        },
        text: {
          DEFAULT: "#212121", // Dark Gray
          light: "#757575",
        },
        success: "#4CAF50",
        error: "#F44336",
        warning: "#FFC107",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
      },
    },
  },
  plugins: [],
};
