// ВАЖНО: кладём сюда корректный next-size-adjust, чтобы Next не добавлял пустой.
export default function Head() {
  return (
    <>
      {/* фикс валидатора: валидный meta вместо пустого, который Next вставляет сам */}
      <meta name="next-size-adjust" content="100%" />

      {/* network warmup */}
      <link rel="preconnect" href="https://api.adkey-seo.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.adkey-seo.com" />

      {/* корректные preloads для изображений героев */}
      <link rel="preload" as="image" href="/block-images/welcome.webp" media="(min-width: 769px)" />
      <link rel="preload" as="image" href="/block-images/welcome-mobile.webp" media="(max-width: 768px)" />
    </>
  );
}