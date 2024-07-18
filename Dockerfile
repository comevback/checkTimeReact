# 基于一个node镜像进行构建阶段
FROM node:20 AS build

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将整个应用程序代码复制到工作目录
COPY . .

# 构建React应用
RUN npm run build

# 使用轻量级的web服务器Nginx作为生产阶段的基础镜像
FROM nginx:alpine

# 将构建的文件复制到Nginx的默认HTML目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]
