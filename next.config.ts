import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
  },
  // Keystatic-Admin wird nur gebraucht, wenn gepflegt wird; die öffentlichen Seiten sind statisch.
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
