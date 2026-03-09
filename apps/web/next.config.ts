import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    blog: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 1 week
    },
  },
};

export default nextConfig;
