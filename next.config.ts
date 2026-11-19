import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export',
   trailingSlash: true,
   images: {
     unoptimized: true,
   },
   experimental: {
     cpus: 1,
   },
};

export default nextConfig;
