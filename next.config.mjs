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
  
  // 设置trailingSlash
  trailingSlash: true,
  
  // 修复assetPrefix设置，必须以斜杠开头或是绝对URL
  basePath: process.env.NODE_ENV === 'production' ? '/feedme' : '',
  
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
