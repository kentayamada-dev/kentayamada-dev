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
  }
};
