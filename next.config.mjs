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
    ],
  },
};

export default nextConfig;
