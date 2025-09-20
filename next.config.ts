import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "b0m772h91854471.pocketbasecloud.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "kedanang.senhome.vn",
          },
        ],
        destination: "https://kedanang.senhome.vn/ke-da-nang",
      },
    ];
  },
};

export default nextConfig;
