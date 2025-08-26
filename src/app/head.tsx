// /src/app/head.tsx
// Минимальный ручной <head>: только ссылки/прелоады. Никаких <meta> здесь!
export default function Head() {
  return (
    <>
      {/* network warmup */}
      <link rel="preconnect" href="https://api.adkey-seo.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.adkey-seo.com" />

      {/* hero preloads (валидные, без imagesrcset/imagesizes) */}
      <link rel="preload" as="image" href="/block-images/welcome.webp" media="(min-width: 769px)" />
      <link rel="preload" as="image" href="/block-images/welcome-mobile.webp" media="(max-width: 768px)" />
    </>
  );
}