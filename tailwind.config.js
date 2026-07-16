/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clinical: "#F8FAFC", // fundo branco clínico
        mist: "#F0F9FF",     // tint azul ultra claro (alternância de seções)
        ink: "#0F172A",      // azul marinho escuro (texto principal)
        slate: "#475569",    // texto secundário / captions (AA em fundo claro)
        sky: "#0284C7",      // azul tecnológico (acento / texto grande)
        skydeep: "#0369A1",  // azul p/ botões e texto pequeno (AA com branco/fundo claro)
        mint: "#10B981",     // verde menta (acento secundário / preenchimentos)
        mintdeep: "#047857", // verde p/ texto pequeno em fundo claro (AA)
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
}
