#!/bin/bash

echo "启动 TodayEatWhat 应用..."

# 停止现有容器
echo "停止现有容器..."
docker-compose down

# 启动后端服务
echo "启动后端服务..."
docker-compose up -d backend

echo "等待后端服务启动..."
sleep 15

# 检查后端服务是否正常运行
echo "检查后端服务状态..."
until curl -f http://localhost:4000/api/options > /dev/null 2>&1; do
    echo "等待后端服务完全启动..."
    sleep 5
done

echo "后端服务已启动完成"

# 启动前端服务
echo "启动前端服务..."
docker-compose up -d frontend

echo "等待前端服务启动..."
sleep 10

echo "所有服务启动完成！"
echo "前端访问地址: http://localhost:3000"
echo "后端API地址: http://localhost:4000"

# 显示服务状态
docker-compose ps 