import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto/woff2/Roboto-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roboto/woff2/Roboto-900.woff2", weight: "900", style: "normal" }
  ],
  variable: "--font-primary",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const nunito_sans = localFont({
  src: [
    { path: "../../public/fonts/NunitoSans/woff2/NunitoSans-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/NunitoSans/woff2/NunitoSans-900.woff2", weight: "900", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});
