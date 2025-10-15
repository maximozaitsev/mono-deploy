// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
const url = "rich-palms-casino.net";

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
  // Оптимизация изображений
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
  
  // Оптимизация компилятора для production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Включение SWC минификации (по умолчанию в Next.js 14)
  swcMinify: true,
  
  // Экспериментальные функции для оптимизации
  experimental: {
    optimizePackageImports: ['@svgr/webpack'],
  },
  
  // Безопасность заголовков
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
  
  // Webpack конфигурация
  webpack(config, options) {
    // SVG обработка
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    return config;
  },
};

export default withPWA(nextConfig);
