# 构建和部署说明

## 本地构建镜像

### 1. 构建所有镜像
```bash
# 构建前端和后端镜像
docker-compose build

# 或者分别构建
docker-compose build frontend
docker-compose build backend
```

### 2. 保存镜像到文件
```bash
# 保存所有镜像
docker save todayeatwhat/frontend:latest todayeatwhat/backend:latest -o todayeatwhat_images.tar

# 或者分别保存
docker save todayeatwhat/frontend:latest -o frontend.tar
docker save todayeatwhat/backend:latest -o backend.tar
```

### 3. 压缩镜像文件（可选）
```bash
# 压缩镜像文件以减小传输大小
gzip todayeatwhat_images.tar
```

## 服务器部署

### 1. 传输镜像文件到服务器
```bash
# 使用scp传输
scp todayeatwhat_images.tar.gz user@your-server-ip:/path/to/destination/

# 或者使用rsync
rsync -avz todayeatwhat_images.tar.gz user@your-server-ip:/path/to/destination/
```

### 2. 在服务器上加载镜像
```bash
# 解压（如果之前压缩了）
gunzip todayeatwhat_images.tar.gz

# 加载镜像
docker load -i todayeatwhat_images.tar
```

### 3. 创建docker-compose.yml文件
在服务器上创建以下docker-compose.yml文件：

```yaml
version: '3.8'

services:
  frontend:
    image: todayeatwhat/frontend:latest
    ports:
      - "0.0.0.0:3000:3000"
    depends_on:
      backend:
        condition: service_healthy
    environment:
      - REACT_APP_API_URL=http://SERVER_IP:4000

  backend:
    image: todayeatwhat/backend:latest
    ports:
      - "0.0.0.0:4000:4000"
    environment:
      - PORT=4000
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/api/options"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 20s
```

**注意**: 将 `SERVER_IP` 替换为你的服务器实际IP地址。

### 4. 启动服务

#### 方法一：使用启动脚本（推荐）
```bash
# 给启动脚本执行权限
chmod +x start.sh

# 运行启动脚本
./start.sh
```

#### 方法二：手动启动
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 访问应用

- **前端界面**: `http://你的服务器IP:3000`
- **后端API**: `http://你的服务器IP:4000`

## 常用命令

```bash
# 查看运行中的容器
docker ps

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 查看特定服务的日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新镜像后重新部署
docker-compose up -d --force-recreate
```

## 故障排除

### 后端服务启动问题
如果后端无法启动：

1. **检查后端日志**：
   ```bash
   docker-compose logs backend
   ```

2. **检查健康状态**：
   ```bash
   curl http://localhost:4000/api/options
   ```

3. **重新构建镜像**：
   ```bash
   docker-compose build backend
   docker-compose up -d backend
   ```

### 前端无法连接后端
如果前端无法连接后端：

1. **检查网络连接**：
   ```bash
   docker-compose exec frontend ping backend
   ```

2. **检查API URL配置**：
   确保 `REACT_APP_API_URL` 环境变量设置正确。

3. **检查后端服务状态**：
   ```bash
   curl http://localhost:4000/api/options
   ```

## 注意事项

1. **端口配置**: 所有服务都配置为监听 `0.0.0.0`，确保可以从外部访问
2. **防火墙**: 确保服务器防火墙开放了3000和4000端口
3. **安全组**: 如果使用云服务器，需要在安全组中配置相应端口
4. **数据存储**: 数据存储在内存中，容器重启后数据会丢失
5. **启动顺序**: 使用启动脚本确保服务按正确顺序启动（后端 → 前端） 