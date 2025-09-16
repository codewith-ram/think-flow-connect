/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add basePath if your site is not hosted at the root of the domain
  // basePath: '/your-base-path',
  // Add assetPrefix if your site is not hosted at the root of the domain
  // assetPrefix: '/your-base-path/',
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Configure images
  images: {
    unoptimized: true,
    domains: ['cefksoosqhkkcibecdnj.supabase.co'],
  },
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
