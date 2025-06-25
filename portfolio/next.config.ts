import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    useCache: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: `/${process.env['CONTENTFUL_SPACE_ID']}/**`
      }
    ]
  }
};

export default nextConfig;
