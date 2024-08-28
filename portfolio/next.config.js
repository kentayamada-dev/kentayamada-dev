/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: true
      }
    ];
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
