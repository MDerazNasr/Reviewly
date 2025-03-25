/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Disable the crossOrigin attribute on images
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
};

module.exports = nextConfig;
