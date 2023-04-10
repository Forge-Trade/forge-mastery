/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})
module.exports = withNextra({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.mux.com', 'testnet.forge.trade'],
  },
})
