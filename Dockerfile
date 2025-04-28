FROM node:20-alpine

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm@8.4.0

# 复制项目文件（包括可能存在的data目录）
COPY . .

# 确保data目录存在
RUN mkdir -p /app/data

# 安装依赖
RUN pnpm install

# 环境变量
ENV NODE_ENV=development

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["pnpm", "dev"] 