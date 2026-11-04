import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "prodalfwebstr.blob.core.windows.net" }], formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
