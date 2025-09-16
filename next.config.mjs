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
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
  },
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable static export
  output: 'export',
  // Disable trailing slash for static export
  trailingSlash: false,
  // Configure webpack to handle Supabase
  webpack: (config, { isServer }) => {
    // Add environment variables to the client bundle
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cefksoosqhkkcibecdnj.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      })
    );

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

// Import webpack at the top level
import webpack from 'webpack';

export default nextConfig;
