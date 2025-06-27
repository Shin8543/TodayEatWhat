# TodayEatWhat

一个帮助你决定今天吃什么的有趣应用！

## 功能特点

- 点击按钮开始随机选择食物
- 动态滚动效果
- 可配置的食物选项
- 使用 Docker 轻松部署
- 支持服务器部署，可通过IP地址访问

## 技术栈

- 前端：React + TypeScript
- 后端：Java + Spring Boot
- 数据库：MongoDB
- 容器化：Docker

## 快速开始

### 本地开发

1. 确保已安装 Docker 和 Docker Compose
2. 克隆此仓库
3. 在项目根目录运行：
   ```bash
   docker-compose up --build
   ```
4. 访问 http://localhost:3000 查看应用

### 服务器部署

1. 在本地构建镜像：
   ```bash
   docker-compose build
   docker save todayeatwhat_frontend:latest todayeatwhat_backend:latest mongo:latest -o todayeatwhat_images.tar
   ```

2. 传输镜像到服务器并加载：
   ```bash
   scp todayeatwhat_images.tar user@your-server-ip:/path/to/destination/
   docker load -i todayeatwhat_images.tar
   ```

3. 在服务器上创建docker-compose.yml并启动服务

详细说明请查看 [BUILD_AND_DEPLOY.md](./BUILD_AND_DEPLOY.md)

## 项目结构

```
.
├── frontend/          # React 前端应用
├── backend/           # Java Spring Boot 后端服务
├── docker-compose.yml # Docker 编排配置
├── BUILD_AND_DEPLOY.md # 构建和部署说明
└── README.md         # 项目文档
```

## 开发环境要求

### 后端开发
- Java 8
- Maven 3.6+
- MongoDB

### 前端开发
- Node.js 16+
- npm 或 yarn

## 常用命令

```bash
# 本地开发
docker-compose up --build

# 构建镜像
docker-compose build

# 保存镜像
docker save todayeatwhat_frontend:latest todayeatwhat_backend:latest mongo:latest -o todayeatwhat_images.tar

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 访问地址

- **本地开发**: http://localhost:3000
- **服务器部署**: http://你的服务器IP:3000
- **后端API**: http://你的服务器IP:4000 