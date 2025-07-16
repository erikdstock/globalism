import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['globalism'],
  experimental: {
    // Enable external directory imports for the workspace
    externalDir: true,
  },
};

export default nextConfig;
