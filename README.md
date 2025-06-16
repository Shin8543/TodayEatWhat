# TodayEatWhat

一个帮助你决定今天吃什么的有趣应用！

## 功能特点

- 点击按钮开始随机选择食物
- 动态滚动效果
- 可配置的食物选项
- 使用 Docker 轻松部署

## 技术栈

- 前端：React + TypeScript
- 后端：Node.js + Express
- 数据库：MongoDB
- 容器化：Docker

## 如何运行

1. 确保已安装 Docker 和 Docker Compose
2. 克隆此仓库
3. 在项目根目录运行：
   ```bash
   docker-compose up --build
   ```
4. 访问 http://localhost:3000 查看应用

## 项目结构

```
.
├── frontend/          # React 前端应用
├── backend/           # Node.js 后端服务
├── docker-compose.yml # Docker 编排配置
└── README.md         # 项目文档
``` 