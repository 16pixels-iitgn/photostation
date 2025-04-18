/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
  // Set base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/photostation' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
