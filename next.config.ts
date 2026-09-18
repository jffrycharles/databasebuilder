import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ships .next/standalone: a self-contained server with only the node_modules
     the app actually reaches, traced from the build. It matters here because
     the target is a 2 GB / 1 vCPU VPS — this removes the need to run `npm ci`
     or `next build` on the server at all. */
  output: "standalone",
  /* There is an unrelated package-lock.json in ~/Downloads, and Next walks up
     to find a workspace root. Without this it picks that one, and the
     standalone bundle comes out nested under a "databasebuilder 16" folder
     with no server.js at its root — which fails on the server, not here. */
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  images: {
    contentDispositionType: "inline",
  },
  async headers() {
    return [
      {
        source: "/dashboard.webp",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="databasebuilder-dashboard.webp"',
          },
        ],
      },
    ];
  },
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
