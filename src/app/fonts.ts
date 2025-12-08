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

export const lobster = localFont({
  src: [
    { path: "../../public/fonts/Lobster/Lobster-400.woff2", weight: "400", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
