import type { Metadata } from "next";
import { roboto, inter } from "./fonts";
import Header from "@/components/header/Header";

// Critical CSS for fonts and layout
const criticalCSS = `
  :root {
    --font-primary: ${roboto.style.fontFamily};
    --font-secondary: ${inter.style.fontFamily};
  }
  
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    line-height: 1.5;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: #1e1e20;
    color: #ffffff;
    font-family: var(--font-primary), Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Critical above-the-fold styles */
  .welcome-section-optimized {
    background: #1e1e20;
    margin-bottom: 140px;
    width: 100%;
  }
  
  .welcome-mobile-figure {
    display: none;
    margin: 0;
    width: 100%;
    text-align: center;
    min-height: 200px;
    aspect-ratio: 3 / 2;
    contain: layout style paint;
  }
  
  .welcome-mobile-image {
    display: inline-block;
    width: 100vw;
    max-width: 400px;
    height: auto;
    will-change: auto;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  
  .h1-section-optimized {
    display: flex;
    justify-content: center;
    margin: -76px auto 136px auto;
    content-visibility: auto;
    contain-intrinsic-size: auto 96px;
  }
  
  .h1-section-optimized h1 {
    font-family: var(--font-secondary);
    font-weight: 900;
    color: #ffffff;
    font-size: 28px;
    text-transform: uppercase;
    background-color: #2a2a2c;
    border-radius: 8px;
    padding: 23px;
    max-width: 1120px;
    width: 100%;
    text-align: center;
    content-visibility: auto;
    contain-intrinsic-size: auto 96px;
  }
  
  @media (max-width: 768px) {
    .welcome-section-optimized {
      margin-bottom: 62px;
    }
    .welcome-mobile-figure {
      display: block;
    }
    .h1-section-optimized {
      margin: 64px auto;
      contain-intrinsic-size: auto 72px;
    }
    .h1-section-optimized h1 {
      font-size: 20px;
      margin: -24px 40px 0;
      max-width: 496px;
      padding: 16px;
      contain-intrinsic-size: auto 72px;
    }
  }
`;

export const metadata: Metadata = {
  title: "HighRoller Casino - Level Up Your Gaming Adventure",
  description: "HighRoller Casino offers the best gaming experience with exclusive bonuses and top games.",
  keywords: "casino, gaming, slots, bonus, highroller",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "HighRoller Casino - Level Up Your Gaming Adventure",
    description: "HighRoller Casino offers the best gaming experience with exclusive bonuses and top games.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HighRoller Casino - Level Up Your Gaming Adventure",
    description: "HighRoller Casino offers the best gaming experience with exclusive bonuses and top games.",
  },
};

export default function RootLayoutOptimized({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = `${roboto.variable} ${inter.variable}`;

  return (
    <html lang="en" className={fontVars}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e1e20" />
        
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://api.adkey-seo.com" />
        <link rel="dns-prefetch" href="https://api.adkey-seo.com" />
        
        {/* Critical image preload */}
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        
        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Icons */}
        <link rel="icon" href="/icons/ico-192.png" />
        <link rel="apple-touch-icon" href="/icons/ico-57.png" sizes="57x57" />
        <link rel="apple-touch-icon" href="/icons/ico-60.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/icons/ico-72.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/icons/ico-76.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/icons/ico-114.png" sizes="114x114" />
        <link rel="apple-touch-icon" href="/icons/ico-120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icons/ico-144.png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/icons/ico-152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icons/ico-180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/icons/ico-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icons/ico-512.png" sizes="512x512" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={fontVars}>
        <Header />
        {children}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(){
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    var delay = 'requestIdleCallback' in window ? requestIdleCallback : function(cb){setTimeout(cb, 2000)};
                    delay(function(){
                      navigator.serviceWorker.register('/sw.js');
                    });
                  });
                }
              })();
            `,
            }}
          />
        )}
      </body>
    </html>
  );
}
