/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "limitededt.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.myikas.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "edge.disstg.commercecloud.salesforce.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.skatewarehouse.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.novelship.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.kickpush.com.au",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.skatewarehouse.co.uk",
        port: "",
      },
    ],
  },
};

export default nextConfig;
