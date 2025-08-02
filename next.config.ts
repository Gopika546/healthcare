import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    // Allow build to succeed even if there are type errors
    ignoreBuildErrors: true,
  },

  eslint: {
    // Allow build to succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },

  images: {
    // Disable Next.js image optimization (optional, useful for Vercel/Netlify issues)
    unoptimized: true,
  },
};

export default nextConfig;
