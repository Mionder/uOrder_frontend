import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Тепер 'font-sans' буде використовувати наш Plus Jakarta Sans
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        // Додаємо наші фірмові "екстремальні" закруглення
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      colors: {
        // Можеш додати базові кольори сервісу
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          gray: "#F9F9F9",
        }
      },
      // Додаємо кастомні тіні для "м'якості" карток
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Це для line-clamp (обрізки тексту), щоб опис не розривав картку
  ],
};
export default config;