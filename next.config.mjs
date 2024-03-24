/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
const isProduction = process.env.NODE_ENV === "production";

const config = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const nextConfig = withPWA({
  dest: "public",
  disable: !isProduction,
})(config);

export default nextConfig;
