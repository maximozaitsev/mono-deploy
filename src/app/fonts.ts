import localFont from "next/font/local";

// Primary font - only load 500 weight initially, 900 can be loaded on demand
export const roboto = localFont({
  src: "../../public/fonts/Roboto/Roboto-500.ttf",
  weight: "500",
  style: "normal",
  variable: "--font-primary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

// Secondary font - only load 700 weight initially, 900 can be loaded on demand
export const nunito_sans = localFont({
  src: "../../public/fonts/NunitoSans/NunitoSans-700.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

// Lazy load heavy font weights
export const robotoBlack = localFont({
  src: "../../public/fonts/Roboto/Roboto-900.ttf",
  weight: "900",
  style: "normal",
  variable: "--font-primary-black",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const nunitoSansBlack = localFont({
  src: "../../public/fonts/NunitoSans/NunitoSans-900.ttf",
  weight: "900",
  style: "normal",
  variable: "--font-secondary-black",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
