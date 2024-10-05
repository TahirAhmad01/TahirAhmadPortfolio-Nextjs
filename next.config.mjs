/** @type {import('next').NextConfig} */
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const nextConfig = {
  reactStrictMode: false,
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
      {
        protocol: "https",
        hostname: "**.example.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
