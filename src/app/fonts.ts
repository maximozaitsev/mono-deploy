import localFont from "next/font/local";
export const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto/Roboto-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roboto/Roboto-900.woff2", weight: "900", style: "normal" }
  ],
  variable: "--font-primary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const trirong = localFont({
  src: [
    { path: "../../public/fonts/Trirong/Trirong-800.woff2", weight: "800", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const barlow = localFont({
  src: [
    { path: "../../public/fonts/Barlow/Barlow-ExtraBold.ttf", weight: "800", style: "normal" }
  ],
  variable: "--font-third",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
