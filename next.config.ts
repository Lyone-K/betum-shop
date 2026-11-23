import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/betum-shop",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
