/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scia-project-questit.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "scia-project-questit.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "stock.adobe.com",
      },
      {
        protocol: "https",
        hostname: "cdn.stock.adobe.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://52.59.162.108:4000/api/:path*", // proxy verso il backend
      },
    ];
  },
};

export default nextConfig;
