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
  
  // 只设置trailingSlash，确保所有路径都是一致的
  trailingSlash: true,
  
  // 在生产环境下动态设置assetPrefix
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  
  // 解决 fs 和 path 模块的问题
  webpack: (config, { isServer }) => {
    // 为fs和path等Node.js模块提供空模拟
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
