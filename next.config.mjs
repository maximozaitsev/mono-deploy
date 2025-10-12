// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
const url = "goodman-casino.net";

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
            maxAgeSeconds: 31536000, // 1 year
          },
        },
      },
      {
        urlPattern: new RegExp(`^${url}/block-images/.*`),
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 31536000, // 1 year
          },
        },
      },
      {
        urlPattern: new RegExp(`^${url}/icons/.*`),
        handler: "CacheFirst",
        options: {
          cacheName: "icons",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 31536000, // 1 year
          },
        },
      },
      {
        urlPattern: new RegExp(`^${url}/_next/static/.*?/buildManifest\\.js$`),
        handler: "NetworkOnly",
      },
      {
        urlPattern: new RegExp(`^https://api\\.adkey-seo\\.com/.*`),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 300, // 5 minutes
          },
        },
      },
    ],
  },
});

const nextConfig = {
  // Modern JavaScript optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
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
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/block-images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Optimize CSS
    if (options.isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|scss|sass)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    // Modern JavaScript optimization
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    
    // Remove polyfills for modern browsers
    if (!options.isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

export default withPWA(nextConfig);
