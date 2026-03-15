import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Hostinger deployment with Node.js:
  // output: 'standalone'  ← uncomment for production build to Hostinger Node.js
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bemoredesignstudio.in',
      },
    ],
  },
};

export default nextConfig;
