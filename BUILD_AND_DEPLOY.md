# 构建和部署说明

## 本地构建镜像

### 1. 构建所有镜像
```bash
# 构建前端、后端和MongoDB镜像
docker-compose build

# 或者分别构建
docker-compose build frontend
docker-compose build backend
```

### 2. 保存镜像到文件
```bash
# 保存所有镜像
docker save todayeatwhat_frontend:latest todayeatwhat_backend:latest mongo:latest -o todayeatwhat_images.tar

# 或者分别保存
docker save todayeatwhat_frontend:latest -o frontend.tar
docker save todayeatwhat_backend:latest -o backend.tar
docker save mongo:latest -o mongodb.tar
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
    image: todayeatwhat_frontend:latest
    ports:
      - "0.0.0.0:3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://SERVER_IP:4000

  backend:
    image: todayeatwhat_backend:latest
    ports:
      - "0.0.0.0:4000:4000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/todayeatwhat
      - PORT=4000

  mongodb:
    image: mongo:latest
    ports:
      - "0.0.0.0:27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**注意**: 将 `SERVER_IP` 替换为你的服务器实际IP地址。

### 4. 启动服务
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

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新镜像后重新部署
docker-compose up -d --force-recreate
```

## 注意事项

1. **端口配置**: 所有服务都配置为监听 `0.0.0.0`，确保可以从外部访问
2. **防火墙**: 确保服务器防火墙开放了3000、4000、27017端口
3. **安全组**: 如果使用云服务器，需要在安全组中配置相应端口
4. **数据持久化**: MongoDB数据存储在Docker卷中，重启容器数据不会丢失 