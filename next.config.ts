import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['gigslist.02f6986e3d401ce158d6c02a3900ebc2.r2.cloudflarestorage.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};



export default nextConfig;
