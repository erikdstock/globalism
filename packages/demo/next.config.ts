import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath matches the GitHub Pages repo sub-path: github.com/<user>/globalism
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  images: {
    // Required for static export (no Next.js image optimisation server)
    unoptimized: true,
  },
  transpilePackages: ['globalism'],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
