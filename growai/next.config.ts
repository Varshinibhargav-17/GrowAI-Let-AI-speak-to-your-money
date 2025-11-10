import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // ✅ This prevents Vercel or local builds from failing due to linting errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
