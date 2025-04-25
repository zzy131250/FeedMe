/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ? '' : (process.env.NODE_ENV === 'production' ? '/feedme' : ''),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, 
        path: false,
      };
    }
    return config;
  },
}

export default nextConfig
