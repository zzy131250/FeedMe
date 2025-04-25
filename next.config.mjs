/** @type {import('next').NextConfig} */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检测是否存在CNAME文件（表示使用自定义域名）
const hasCNAME = fs.existsSync(path.join(__dirname, 'CNAME'));

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
  
  // 根据CNAME存在与否设置basePath
  // 如果有CNAME（自定义域名），则不使用basePath
  // 如果没有CNAME（GitHub Pages默认域名），则在生产环境使用/feedme
  basePath: hasCNAME ? '' : (process.env.NODE_ENV === 'production' ? '/feedme' : ''),
  
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
