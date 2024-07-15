/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   unoptimized: true,
  // },
  env: {
    name: "Tahir Ahmad",
    fullName: "Tahir Ahmad (Sani)",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
