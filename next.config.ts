import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repository also contains Cloudflare Worker helpers for Sites/Vinext.
  // Vercel's native Next.js build should type-check only the Next.js app.
  typescript: {
    tsconfigPath: process.env.VERCEL
      ? "tsconfig.vercel.json"
      : "tsconfig.json",
  },
};

export default nextConfig;
