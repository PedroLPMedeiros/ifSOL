import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: { //Permite tirar o ícone do Next durante o teste no navegador
    buildActivity: false
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }
    ],
  },

  // --- Configurações para deploy no vercel
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
