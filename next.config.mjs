/** @type {import('next').NextConfig} */
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const nextConfig = {
  reactStrictMode: false,
  env: {
    name: "Tahir Ahmad",
    fullName: "Tahir Ahmad (Sani)",
    EMAIL_JS_SERVICE_ID: "service_sob3n6t",
    EMAIL_JS_TEMPLATE_ID: "template_ol3bs8a",
    EMAIL_JS_PUBLIC_KEY: "q-Wr4qVce_T4pGFt2",
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
