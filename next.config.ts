import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* The round badge Next.js floats in the corner during `next dev`. It is the
     framework's own dev tooling, never part of a build, but it sits on top of
     every page while you are reviewing designs. */
  devIndicators: false,
  poweredByHeader: false,
  compiler: {
    // strip console.* in production builds, keep errors/warnings
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
