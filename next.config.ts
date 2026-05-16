import type { NextConfig } from "next";

const siteBasePath = "/fashion-hero-shop";
const isGitHubPagesBuild = process.env.GITHUB_PAGES_BUILD === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: siteBasePath,
      }
    : {}),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPagesBuild ? siteBasePath : "",
  },
};

export default nextConfig;
