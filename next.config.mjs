/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t4.ftcdn.net", // Adobe Stock CDN
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // Pixabay
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // Unsplash premium
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash standard
      },
      {
        protocol: "https",
        hostname: "stock.adobe.com", // Adobe Stock sito principale
      },
      {
        protocol: "https",
        hostname: "cdn.stock.adobe.com", // Adobe Stock CDN alternativo
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com", // iStock
      },
    ],
  },
};

export default nextConfig;
