/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 5px rgba(0, 0, 0, 0.5)',
        'md': '4px 4px 8px rgba(0, 0, 0, 0.6)',
      },
      keyframes: {
        underlineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        underlineGrow: "underlineGrow 0.3s ease-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradientLeft: "#FF6E5A",
        gradientRight: "#7B61D0"
      },
      fontFamily: {
        dancing: ['var(--font-dancing-script)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient": {
          "@apply text-transparent bg-clip-text bg-gradient-to-r from-gradientLeft to-gradientRight": {},
        },
        
          ".text-shadow": {
            "text-shadow": "3px 3px 3px rgba(0, 0, 0, 0.3)",
          },

          ".text-shadow-md": {
            "text-shadow": "4px 4px 8px rgba(0, 0, 0, 0.6)",
          },
    });
    },
  ],
};
