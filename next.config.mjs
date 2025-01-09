/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  env: {
    name: "Tahir Ahmad",
    fullName: "Tahir Ahmad (Sani)",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/css")],
    silenceDeprecations: ["legacy-js-api"],
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
