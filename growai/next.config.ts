import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // ✅ Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ✅ Ignore TypeScript errors during build (won’t stop deployment)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
