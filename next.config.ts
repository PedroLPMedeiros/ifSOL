import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: 'export', //mudança para o github pages
  basePath: '/ifSOL', //mudança para o github pages
  trailingSlash: true, //para garantir que as URLs terminem com uma barra, o que é importante para o github pages
  
  images: {
    unoptimized: true,  //mudança para github pages, para não dar erro de build, já que o github pages não suporta imagens otimizadas
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
