import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use '_mixin.scss';`
  },
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmmqdlqltpdygchpwbkd.supabase.co',
      },
    ],
  },
};

export default nextConfig;