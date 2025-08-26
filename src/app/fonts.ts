// src/app/fonts.ts
import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto/Roboto-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roboto/Roboto-900.ttf", weight: "900", style: "normal" }
  ],
  variable: "--font-primary",
  display: "swap",
  preload: true,
  adjustFontFallback: false, // <— ключевая строчка
});

export const poppins = localFont({
  src: [
    { path: "../../public/fonts/Poppins/Poppins-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Poppins/Poppins-900.ttf", weight: "900", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false, // <— и здесь
});