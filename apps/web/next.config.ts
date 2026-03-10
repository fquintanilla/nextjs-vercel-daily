import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    subscription: {
      stale: 600, // 10 minutes
      revalidate: 900, // 1 minutes
      expire: 86400, // 24 hours
    },
    blog: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 1 week
    },
    featuredArticles: {
      stale: 600, // 10 minutes
      revalidate: 900, // 1 minutes
      expire: 86400, // 24 hours
    },
    article: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 1 week
    },
    publicationConfig: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 1 week
    },
  },
};

export default nextConfig;
