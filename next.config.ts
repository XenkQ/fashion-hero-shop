import type { NextConfig } from "next";

const siteBasePath = "/fashion-hero-shop";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? siteBasePath : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? siteBasePath : "",
  },
};

export default nextConfig;
