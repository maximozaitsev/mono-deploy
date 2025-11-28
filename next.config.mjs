// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
import createNextIntlPlugin from "next-intl/plugin";
const url = "chicken-royal-online.com";

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

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  experimental: {
    optimizePackageImports: [
      "react",
      "react-dom",
      "next-intl",
    ],
  },
  // Modern browser support - don't transpile modern JS features
  transpilePackages: [],
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
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        source: "/(block-images|icons|footer-assets|fonts)/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/css/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Disable polyfills for modern browsers
    if (!options.isServer) {
      // Remove core-js and other polyfill libraries
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        '@babel/polyfill': false,
        'regenerator-runtime': false,
        'core-js/modules': false,
        'core-js/stable': false,
        'core-js/features': false,
      };
      
      // Exclude polyfills from node_modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
      
      const existingCacheGroups = config.optimization?.splitChunks?.cacheGroups || {};
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...existingCacheGroups,
            default: {
              ...existingCacheGroups.default,
              minChunks: 2,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 20,
              minSize: 0,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default withNextIntl(withPWA(nextConfig));
