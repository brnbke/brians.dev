import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Only add basePath and assetPrefix if deploying to a subdirectory
  // For custom domains like brians.dev, these should be omitted
  ...(process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES
    ? {
        basePath: "",
        assetPrefix: "",
      }
    : {}),
};

export default nextConfig;
