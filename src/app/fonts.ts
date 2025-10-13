import localFont from "next/font/local";
export const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto/Roboto-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto/Roboto-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-primary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const lato = localFont({
  src: [
    {
      path: "../../public/fonts/Lato/Lato-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const monserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Monserrat/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-third",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
