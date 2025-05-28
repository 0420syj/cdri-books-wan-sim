import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        port: "",
        pathname: "/thumb/**",
      },
    ],
  },
};

export default nextConfig;
