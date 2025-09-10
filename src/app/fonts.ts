import localFont from "next/font/local";
export const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto/Roboto-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roboto/Roboto-900.ttf", weight: "900", style: "normal" }
  ],
  variable: "--font-primary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const nunito_sans = localFont({
  src: [
    { path: "../../public/fonts/NunitoSans/NunitoSans-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/NunitoSans/NunitoSans-900.ttf", weight: "900", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
