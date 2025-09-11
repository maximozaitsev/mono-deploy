// next.config.mjs
/** @type {import('next').NextConfig} */

import nextPWA from "@ducanh2912/next-pwa";
const url = "highroller-casino-luck.com";

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
  // Modern browsers support - no polyfills needed
  swcMinify: true, // Use SWC
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Disable polyfills for modern browsers
  experimental: {
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
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Optimize for modern browsers
    if (options.isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Disable polyfills for modern browsers
    config.resolve.alias = {
      ...config.resolve.alias,
      // Disable core-js polyfills
      'core-js': false,
    };
    
    
    return config;
  },
};

export default withPWA(nextConfig);
