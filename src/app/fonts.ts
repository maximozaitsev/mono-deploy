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

export const roboto_condensed = localFont({
  src: [
    { path: "../../public/fonts/RobotoCondensed/RobotoCondensed-VAR.ttf", weight: "100 900", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
