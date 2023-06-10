/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    URL_BACK: process.env.URL_BACK,
  }
}

module.exports = nextConfig
