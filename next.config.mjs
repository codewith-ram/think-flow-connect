/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure images
  images: {
    unoptimized: true,
    domains: ['cefksoosqhkkcibecdnj.supabase.co'],
    disableStaticImages: true,
  },
  // Disable React Strict Mode for better compatibility
  reactStrictMode: false,
  // Enable SWC minification
  swcMinify: true,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable static export
  output: 'export',
  // Disable trailing slash for static export
  trailingSlash: false,
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Configure webpack to handle Supabase
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
