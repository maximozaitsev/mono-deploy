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
  workboxOptions: {
    disableDevLogs: true,
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
