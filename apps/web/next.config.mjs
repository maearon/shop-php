/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.png","blob.v0.dev"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3001',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ruby-rails-boilerplate-3s9t.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {  
    CLIENT_ID: process.env.CLIENT_ID,  
    REDIRECT_URI: process.env.REDIRECT_URI, 
    SCOPE: process.env.SCOPE,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    API_KEY: process.env.API_KEY
  },
  webpack(config) {
    // 👇 Cấu hình @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      // Rewrite URL type /some-slug/ABC123.html → /some-slug/ABC123
      {
        source: '/:slug/:model.html',
        destination: '/:slug/:model', // dùng route động thật sự ở đây
      },
    ];
  },
};

export default nextConfig;
