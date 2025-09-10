// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
const url = "7bitcasino-wins.com";

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
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: new RegExp(`^${url}/_next/static/.*?/buildManifest\\.js$`),
        handler: "NetworkOnly",
      },
      {
        urlPattern: new RegExp(`^${url}/_next/image.*`),
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
      {
        urlPattern: new RegExp(`^https://api\\.adkey-seo\\.com/.*`),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 minutes
          },
        },
      },
    ],
  },
});

       const nextConfig = {
         images: {
           unoptimized: false,
           formats: ['image/webp', 'image/avif'],
           deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
           imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
           minimumCacheTTL: 60,
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
         compress: true,
         poweredByHeader: false,
         generateEtags: false,
         experimental: {
           optimizePackageImports: ['react', 'react-dom'],
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
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
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
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, s-maxage=604800",
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

           // Optimize bundle splitting
           if (!options.isServer) {
             config.optimization.splitChunks = {
               chunks: 'all',
               minSize: 20000,
               maxSize: 244000,
               cacheGroups: {
                 default: {
                   minChunks: 2,
                   priority: -20,
                   reuseExistingChunk: true,
                 },
                 vendor: {
                   test: /[\\/]node_modules[\\/]/,
                   name: 'vendors',
                   priority: -10,
                   chunks: 'all',
                   maxSize: 244000,
                 },
                 common: {
                   name: 'common',
                   minChunks: 2,
                   priority: -5,
                   reuseExistingChunk: true,
                   maxSize: 244000,
                 },
                 react: {
                   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                   name: 'react',
                   priority: 20,
                   chunks: 'all',
                 },
               },
             };
             
             // Tree shaking optimization
             config.optimization.usedExports = true;
             config.optimization.sideEffects = false;
           }

           return config;
         },
};

export default withPWA(nextConfig);
