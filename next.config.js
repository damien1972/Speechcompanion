// Update next.config.js to remove the invalid option

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [],
  },
  // Remove the invalid experimental.optimizeFonts option
  experimental: {
    // optimizeFonts: true, // This was causing the warning
  },
}

module.exports = nextConfig
