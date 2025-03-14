import type { NextConfig } from "next";
const supabaseUrl = process.env.SUPABASE_URL;

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use '_mixin.scss';`
  },
  images: {
    domains: [supabaseUrl || "http://localhost:3000"], 
  },
};

export default nextConfig;