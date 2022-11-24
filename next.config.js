/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'byndid-public-assets.s3-us-west-2.amazonaws.com',
        port: '',
        pathname: '/logos/beyondidentity.png',
      },
    ],
  },
}
