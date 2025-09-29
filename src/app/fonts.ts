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

export const dm_sans = localFont({
  src: [
    { path: "../../public/fonts/DMSans/DMSans-VAR.woff2", weight: "100 900", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
