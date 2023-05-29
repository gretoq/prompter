/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/prompt',
        destination: '/api/prompt',
        has: [
          {
            type: 'query',
            key: 'no-isr',
            value: 'true',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
