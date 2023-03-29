/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.mux.com', 'testnet.forge.trade'],
  },
}

module.exports = nextConfig
