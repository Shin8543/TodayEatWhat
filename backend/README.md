# TodayEatWhat Backend (Java Spring Boot)

这是一个使用Java Spring Boot框架构建的后端服务，为"今天吃什么"应用提供API支持。

## 技术栈

- Java 8
- Spring Boot 2.7.18
- Spring Data MongoDB
- Maven

## 项目结构

```
src/main/java/com/todayeatwhat/backend/
├── TodayEatWhatApplication.java    # Spring Boot主应用类
├── controller/
│   └── FoodOptionController.java   # REST API控制器
├── model/
│   └── FoodOption.java             # 数据模型
├── repository/
│   └── FoodOptionRepository.java   # 数据访问层
└── service/
    └── FoodOptionService.java      # 业务逻辑层
```

## API接口

### 获取所有食物选项
- **GET** `/api/options`
- 返回所有食物选项的名称列表

### 添加新食物选项
- **POST** `/api/options`
- 请求体: `{"name": "食物名称"}`
- 返回创建的食物选项对象

### 删除食物选项
- **DELETE** `/api/options/{name}`
- 删除指定名称的食物选项

## 环境变量

- `PORT`: 服务器端口 (默认: 4000)
- `MONGODB_URI`: MongoDB连接URI (默认: mongodb://localhost:27017/todayeatwhat)

## 运行方式

### 本地开发

1. 确保已安装Java 8和Maven
2. 确保MongoDB服务正在运行
3. 运行以下命令：

```bash
mvn spring-boot:run
```

### 使用Docker

```bash
docker build -t todayeatwhat-backend .
docker run -p 4000:4000 todayeatwhat-backend
```

### 使用Docker Compose

在项目根目录运行：

```bash
docker-compose up
```

## 构建

```bash
mvn clean package
```

构建后的JAR文件位于 `target/backend-1.0.0.jar` 

## 开发环境要求

### 后端开发
- Java 8
- Maven 3.6+
- MongoDB 