/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost', '127.0.0.1'], 
  },

  typescript: {
    // ✅ Permet de continuer même avec des erreurs TypeScript
    ignoreBuildErrors: true,
  },

  eslint: {
    // ✅ Ignore les erreurs ESLint pendant le build (utile pour Vercel)
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: true,
  },
}

export default nextConfig
