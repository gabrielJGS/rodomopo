/**
 * @type {import('next').NextConfig}
 */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    unoptimized: true,
    loader: "imgix",
    path: isProd ? "https://gabrieljgs.github.io/rodomopo/" : "/rodomopo",
    // formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "gabrieljs.online",
    //     port: "",
    //     pathname: "/image/upload/**",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "3000",
    //     pathname: "/image/upload/**",
    //   }
    // ],
  },
  assetPrefix: isProd ? "https://gabrieljgs.github.io/rodomopo/" : "http://localhost:3000",
};

export default nextConfig;
