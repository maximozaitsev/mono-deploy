// ВАЖНО: этот файл не нужно импортировать в layout — Next сам его подключит.
// Держим здесь только то, чего нет в Metadata API, и что не конфликтует с ним.

export default function Head() {
  return (
    <>
      {/* фикс валидатора: Next иногда добавляет пустой meta без content */}
      <meta name="next-size-adjust" content="100%" />

      {/* network warmup */}
      <link rel="preconnect" href="https://api.adkey-seo.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.adkey-seo.com" />

      {/* hero preloads (не конфликтуют с Metadata API) */}
      <link rel="preload" as="image" href="/block-images/welcome.webp" media="(min-width: 769px)" />
      <link rel="preload" as="image" href="/block-images/welcome-mobile.webp" media="(max-width: 768px)" />
    </>
  );
}