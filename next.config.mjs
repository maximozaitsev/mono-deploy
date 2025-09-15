// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
const url = "casinoprestige-online.com";

const withPWA = nextPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp(`^${url}/_next/static/.*`),
        handler: "CacheFirst",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 50,
          },
        },
      },
      {
        urlPattern: new RegExp(`^${url}/_next/static/.*?/buildManifest\\.js$`),
        handler: "NetworkOnly",
      },
      // Кеширование изображений API
      {
        urlPattern: new RegExp(`^https://api\\.adkey-seo\\.com/.*\\.(webp|jpg|jpeg|png|gif)$`),
        handler: "CacheFirst",
        options: {
          cacheName: "api-images",
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 год
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      // Кеширование API данных
      {
        urlPattern: new RegExp(`^https://api\\.adkey-seo\\.com/.*`),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-data",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 дней
          },
        },
      },
      // Дополнительное кеширование для всех изображений
      {
        urlPattern: new RegExp(`.*\\.(webp|jpg|jpeg|png|gif|svg)$`),
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 год
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

const nextConfig = {
  // Оптимизация для современных браузеров
  swcMinify: true,
  compiler: {
    // Удаляем console.log в продакшене
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Настройки для современных браузеров
  experimental: {
    // Используем современный JavaScript
    esmExternals: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.adkey-seo.com",
      },
      {
        protocol: "https",
        hostname: url,
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
      // Кеширование статических ресурсов
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Кеширование изображений
      {
        source: "/(.*\\.webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*\\.jpg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*\\.jpeg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*\\.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*\\.gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*\\.svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
            {
              source: "/(.*\\.ico)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=2592000, stale-while-revalidate=86400",
                },
              ],
            },
            // Кеширование для API изображений (если они проксируются)
            {
              source: "/api/images/(.*)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
    ];
  },
  webpack(config, { dev, isServer }) {
    // SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Оптимизация для современных браузеров
    if (!dev && !isServer) {
      // Настройки для современных браузеров
      config.target = ['web', 'es2020'];
      
      // Минимизация полифиллов
      config.resolve.alias = {
        ...config.resolve.alias,
        // Отключаем полифиллы для современных браузеров
        'core-js': false,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);
