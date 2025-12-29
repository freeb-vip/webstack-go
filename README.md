# webstack-go

一个基于 Go、Gin 和 GORM 的现代化网站导航系统。支持多模块开发、自动化部署、完整的 API 文档以及灵活的数据库配置。

## 📋 目录

- [项目特性](#项目特性)
- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [API 文档](#api-文档)
- [开发调试](#开发调试)
- [部署方法](#部署方法)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

## ✨ 项目特性

- **轻量级框架**：基于 Gin 和 GORM 构建，快速响应
- **依赖注入**：使用 Google Wire 进行依赖管理，代码耦合度低
- **完整的 API 文档**：自动生成 Swagger 文档，支持在线查看
- **热更新开发**：集成 Air 工具，修改代码自动编译运行
- **灵活的数据库支持**：支持 SQLite、MySQL、PostgreSQL
- **模块化设计**：清晰的分层架构（Handler → Service → Repository）
- **Kubernetes 部署**：包含 Helm Chart，支持 K8s 部署和升级
- **完善的日志系统**：集成 Zap 日志框架，支持日志分级和滚动
- **JWT 认证**：内置 JWT 令牌认证机制
- **单元测试**：支持 Mock 测试，确保代码质量

## 🖥️ 系统要求

### 本地开发

- Go 1.22+
- Docker & Docker Compose（推荐）
- Make（可选，但推荐）

### 生产部署

- Docker
- Kubernetes 1.20+（可选）
- Helm 3.0+（如果使用 K8s）

## 🚀 快速开始

### 方法一：使用 Docker Compose（推荐）

```bash
# 克隆项目
git clone <repo-url>
cd webstack-go

# 启动开发环境（自动热更新）
make dev

# 或直接使用 docker compose
docker compose -f docker-compose.dev.yml up
```

访问应用：
- API 服务：http://localhost:8000
- Swagger 文档：http://localhost:8000/swagger/index.html

### 方法二：本地构建运行

```bash
# 1. 初始化开发环境（首次需要）
make init

# 2. 生成依赖注入代码
go run github.com/google/wire/cmd/wire@latest ./cmd/server/wire

# 3. 生成 Swagger 文档
make swag

# 4. 运行服务
make run
```

### 方法三：生产级 Docker 部署（推荐）

```bash
# 1. 构建生产镜像
make docker-build

# 或指定版本
./scripts/build-docker.sh -t v3.1.0 -v 3.1.0

# 2. 启动容器
make docker-run

# 3. 查看日志
make docker-logs

# 4. 停止容器
make docker-stop
```

**更多 Docker 命令**：
```bash
make docker-restart    # 重启容器
make docker-shell      # 进入容器 shell
make docker-status     # 查看容器状态
make docker-remove     # 删除容器
make docker-clean      # 清理 Docker 资源
```

详见 [Docker 部署指南](docs/DOCKER_GUIDE.md)

## 📁 项目结构

```
webstack-go/
├── cmd/
│   └── server/                    # 应用入口点
│       ├── main.go                # 程序主文件
│       └── wire/                  # 依赖注入配置
│           ├── wire.go            # Wire 定义
│           └── wire_gen.go        # Wire 生成代码
├── internal/                      # 内部包（不对外暴露）
│   ├── dal/                       # 数据访问层
│   │   ├── model/                 # 数据模型（自动生成）
│   │   ├── query/                 # 查询语句（自动生成）
│   │   └── repository/            # 数据仓库实现
│   ├── handler/                   # HTTP 请求处理层
│   │   ├── category/              # 分类管理
│   │   ├── config/                # 系统配置
│   │   ├── dashboard/             # 仪表板
│   │   ├── index/                 # 首页
│   │   ├── site/                  # 网站管理
│   │   └── user/                  # 用户管理
│   ├── service/                   # 业务逻辑层
│   │   ├── category/              # 分类业务
│   │   ├── config/                # 配置业务
│   │   ├── dashboard/             # 仪表板业务
│   │   ├── index/                 # 首页业务
│   │   ├── site/                  # 网站业务
│   │   └── user/                  # 用户业务
│   ├── middleware/                # HTTP 中间件
│   │   ├── cors.go                # 跨域处理
│   │   ├── jwt.go                 # JWT 认证
│   │   └── log.go                 # 请求日志
│   └── server/                    # 服务器配置
├── pkg/                           # 公共包（可被其他项目引入）
│   ├── app/                       # 应用生命周期管理
│   ├── config/                    # 配置管理
│   ├── gormx/                     # GORM 扩展
│   ├── jwt/                       # JWT 实现
│   ├── log/                       # 日志包装
│   ├── server/                    # HTTP 服务器
│   ├── sid/                       # 雪花算法 ID 生成
│   ├── tools/                     # 工具函数
│   └── zapgorm2/                  # Zap+GORM 集成
├── api/                           # API 版本定义
│   └── v1/                        # API v1 定义
├── config/                        # 配置文件
│   ├── local.yml                  # 本地开发配置
│   ├── test.yml                   # 测试配置
│   └── prod.yml                   # 生产配置
├── web/                           # 前端资源和模板
│   ├── static/                    # 静态文件
│   ├── templates/                 # HTML 模板
│   └── upload/                    # 上传文件存储
├── docs/                          # API 文档（自动生成）
├── storage/                       # 数据存储目录
│   ├── logs/                      # 应用日志
│   └── webstack-go.db             # SQLite 数据库
├── chart/                         # Kubernetes Helm Chart
├── Dockerfile                     # 生产环境 Dockerfile
├── Dockerfile.dev                 # 开发环境 Dockerfile
├── docker-compose.dev.yml         # 开发 Docker Compose
├── Makefile                       # 快捷命令
├── go.mod & go.sum                # Go 依赖管理
└── DEVELOPMENT.md                 # 开发文档
```

### 核心目录说明

#### cmd/server/main.go
应用入口点，负责：
- 解析命令行参数（配置文件路径）
- 初始化配置、日志、数据库
- 通过 Wire 进行依赖注入
- 启动 HTTP 服务

#### internal/dal （Data Access Layer）
数据访问层：
- `model/`：GORM 数据模型定义
- `query/`：使用 GORM Gen 生成的查询接口
- `repository/`：仓储模式实现，封装数据操作

#### internal/service
业务逻辑层，包含各模块的业务处理：
- 调用 Repository 获取数据
- 实现业务规则和逻辑
- 数据格式转换和处理

#### internal/handler
HTTP 请求处理层：
- 解析请求参数
- 调用 Service 处理业务
- 返回 HTTP 响应

#### pkg/
公共包，包含：
- 配置管理（Viper）
- 日志（Zap + Lumberjack）
- JWT 认证
- 数据库连接（GORM）
- HTTP 服务（Gin）
- 通用工具和扩展

## 📖 API 文档

### 在线查看

启动服务后访问：http://localhost:8000/swagger/index.html

### 手动生成文档

```bash
make swag
```

文档会自动生成到 `docs/` 目录，包括：
- `swagger.json` - OpenAPI 3.0 格式
- `swagger.yaml` - YAML 格式

### API 主要端点

#### 用户管理
- `GET /api/v1/user/list` - 获取用户列表
- `POST /api/v1/user/create` - 创建用户
- `PUT /api/v1/user/update` - 更新用户
- `DELETE /api/v1/user/delete/:id` - 删除用户
- `POST /api/v1/user/login` - 用户登录

#### 网站管理
- `GET /api/v1/site/list` - 获取网站列表
- `POST /api/v1/site/create` - 创建网站
- `PUT /api/v1/site/update` - 更新网站
- `DELETE /api/v1/site/delete/:id` - 删除网站

#### 分类管理
- `GET /api/v1/category/list` - 获取分类列表
- `POST /api/v1/category/create` - 创建分类
- `PUT /api/v1/category/update` - 更新分类
- `DELETE /api/v1/category/delete/:id` - 删除分类

#### 其他接口
- `GET /api/v1/index/data` - 获取首页数据
- `GET /api/v1/dashboard/data` - 获取仪表板数据
- `GET /api/v1/config/get` - 获取系统配置

## 🔧 开发调试

### 热更新开发

项目集成了 [Air](https://github.com/air-verse/air) 实现热更新。

#### 使用 Docker Compose（推荐）

```bash
make dev
```

特性：
- 自动构建开发镜像
- 代码同步到容器
- 文件变化自动编译运行
- 无需重启容器

配置文件：`.air.toml`
- 监听文件：`.go`, `.tpl`, `.tmpl`, `.html`
- 排除目录：`bin`, `tmp`, `vendor`, `.git`, `storage`

#### 常用开发命令

```bash
# 初始化开发工具（仅需一次）
make init
# 安装：wire, swag, goimports-reviser, gofumpt

# 启动开发模式
make dev

# 停止开发容器
make dev-down

# 重新生成 Swagger 文档
make swag

# 格式化代码
make fmt

# 本地构建
make build

# 运行测试
go test ./...

# 运行特定测试
go test ./internal/handler -v
```

### 代码生成

项目使用多个代码生成工具：

#### Wire（依赖注入）
```bash
go run github.com/google/wire/cmd/wire@latest ./cmd/server/wire
```
自动生成 `wire_gen.go`，完成依赖注入配置。

#### Swag（API 文档）
```bash
make swag
```
解析代码注释，生成 Swagger 文档。注释格式参考：
```go
// @Summary 获取用户列表
// @Description 获取所有用户信息
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {object} api.Response
// @Router /api/v1/user/list [get]
func (h *Handler) List(c *gin.Context) {
    // ...
}
```

#### GORM Gen（数据库查询）
GORM Gen 已在 `internal/dal/query` 中生成，用于类型安全的数据库查询。

### 本地测试

```bash
# 运行所有测试
go test ./...

# 运行特定包的测试，显示详细信息
go test ./internal/service/user -v

# 运行测试并生成覆盖率报告
go test -cover ./...

# 查看 Mock 测试示例
cat internal/dal/repository/st_site.mockgen.go
```

### 调试技巧

1. **查看日志**：
   - 开发模式日志输出到控制台（`console` 格式）
   - 生产模式日志写入 `storage/logs/server.log`
   - 修改 `config/local.yml` 中的 `log_level` 调整日志级别

2. **检查数据库**：
   - 开发环境默认使用 SQLite（`storage/webstack-go.db`）
   - 可使用 SQLite 客户端（如 DBeaver）查看数据

3. **API 测试**：
   - 使用 Swagger UI 在线测试（http://localhost:8000/swagger/index.html）
   - 或使用 Postman、curl 等工具

4. **增加日志**：
   ```go
   // 在代码中添加日志
   h.Logger.Info("message", zap.String("key", "value"))
   h.Logger.Error("error", zap.Error(err))
   ```

## 📦 部署方法

### 方法一：Docker 单容器（推荐开发/小型生产）

#### 快速启动

```bash
# 构建镜像
make docker-build

# 运行容器
make docker-run

# 查看日志
make docker-logs

# 停止容器
make docker-stop
```

#### 使用脚本自定义构建

```bash
# 指定版本号
./scripts/build-docker.sh -t v3.1.0 -v 3.1.0

# 构建并推送到镜像仓
./scripts/build-docker.sh -r your-registry.com -i nav -t v3.1.0 -p
```

#### 构建镜像
```bash
# 使用生产配置构建
make docker

# 或手动构建
docker build -t hongmaster/nav:latest -f Dockerfile.prod .
```

#### 运行容器
```bash
docker run -d \
  --name nav \
  -p 8000:8000 \
  -v /path/to/storage:/app/storage \
  -v /path/to/config:/app/config \
  hongmaster/nav:latest
```

#### 参数说明
- `-p 8000:8000` 端口映射
- `-v /path/to/storage:/app/storage` 挂载数据目录（持久化）
- `-v /path/to/config:/app/config` 挂载配置目录

#### 环境变量配置

容器启动时可通过环境变量设置配置文件路径：

```bash
# 使用生产配置
docker run -d \
  -e APP_CONF=/app/config/prod.yml \
  -p 8000:8000 \
  hongmaster/nav:latest

# 使用自定义配置路径
docker run -d \
  -e APP_CONF=/custom/path/config.yml \
  -v /my/config:/custom/path \
  -p 8000:8000 \
  hongmaster/nav:latest
```

**注意**：如果未设置 `APP_CONF`，容器启动脚本会自动查找以下路径：
1. `/app/config/local.yml`（默认）
2. `/app/config/prod.yml`
3. `config/local.yml`
4. `config/prod.yml`

#### Docker Compose 启动

```bash
# 启动应用栈
make docker-compose-up

# 停止应用栈
make docker-compose-down

# 查看日志
make docker-compose-logs
```

详见 [Docker 部署指南](docs/DOCKER_GUIDE.md)

### 方法二：Kubernetes + Helm（推荐大型部署）

#### 前置要求
- Kubernetes 1.20+
- Helm 3.0+
- kubectl 已配置

#### 部署步骤

1. **准备镜像**
   ```bash
   docker build -t <registry>/nav:v1.0.0 -f Dockerfile.prod .
   docker push <registry>/nav:v1.0.0
   ```

2. **修改 Helm 值**
   编辑 `chart/nav/values.yaml`，配置：
   - 镜像地址和版本
   - 副本数、资源限制
   - 存储配置
   - 环境变量

3. **创建命名空间**
   ```bash
   kubectl create namespace webstack-go
   ```

4. **安装 Chart**
   ```bash
   cd chart/
   helm install webstack-go nav/ -n webstack-go -f nav/values-production.yaml
   ```

5. **验证部署**
   ```bash
   # 查看 Pod
   kubectl get pods -n webstack-go
   
   # 查看服务
   kubectl get svc -n webstack-go
   
   # 查看 Helm 版本
   helm list -n webstack-go
   ```

6. **访问应用**
   ```bash
   # 通过端口转发
   kubectl port-forward svc/webstack-go 8000:8000 -n webstack-go
   
   # 访问：http://localhost:8000
   ```

#### 升级部署
```bash
cd chart/
helm upgrade webstack-go nav/ -n webstack-go -f nav/values-production.yaml
```

#### 回滚部署
```bash
helm rollback webstack-go -n webstack-go
```

#### 卸载部署
```bash
helm uninstall webstack-go -n webstack-go
```

详见 [Helm Chart 文档](chart/nav/README.md)

### 方法三：直接编译运行（仅限开发测试）

```bash
# 1. 编译
go build -ldflags="-s -w" -o ./bin/server ./cmd/server

# 2. 运行（需要配置文件和数据库）
./bin/server -conf=config/prod.yml
```

## ⚙️ 配置说明

### 配置文件位置

- 开发环境：`config/local.yml`
- 测试环境：`config/test.yml`
- 生产环境：`config/prod.yml`

### 配置示例（local.yml）

```yaml
env: local                          # 环境标识

http:
  host: 0.0.0.0                     # 监听地址
  port: 8000                        # 监听端口

security:
  jwt:
    key: QQYnRFerJTSEcrfB89fw8prOaObmrch8  # JWT 密钥（需修改）

data:
  db:
    user:
      driver: sqlite                # 驱动：sqlite、mysql、postgres
      dsn: storage/webstack-go.db   # SQLite 数据源

log:
  log_level: debug                  # 日志级别：debug、info、warn、error
  encoding: console                 # 格式：console 或 json
  log_file_name: "./storage/logs/server.log"  # 日志文件路径
  max_backups: 30                   # 保留日志个数
  max_age: 7                        # 日志保留天数
  max_size: 1024                    # 日志文件大小（MB）
  compress: true                    # 是否压缩旧日志
```

### MySQL 配置示例

```yaml
data:
  db:
    user:
      driver: mysql
      dsn: "user:password@tcp(localhost:3306)/webstack_go?charset=utf8mb4&parseTime=True&loc=Local"
```

### PostgreSQL 配置示例

```yaml
data:
  db:
    user:
      driver: postgres
      dsn: "host=localhost user=postgres password=password dbname=webstack_go port=5432 sslmode=disable"
```

### 环境变量覆盖

在 Docker 中可通过环境变量覆盖配置：

```bash
docker run -e APP_CONF=config/prod.yml webstack-go:latest
```

## ❓ 常见问题

### Q1：开发时修改代码不自动更新
**A：** 确保使用 `make dev` 启动，并检查 `.air.toml` 中的文件监听配置。

### Q2：数据库连接失败
**A：** 检查 `config/*.yml` 中的数据库配置，确保：
- SQLite：文件路径存在且有写权限
- MySQL/PostgreSQL：主机、端口、用户、密码正确

### Q3：JWT 认证失败
**A：** 
- 检查 token 格式：`Authorization: Bearer <token>`
- 确保请求头包含该字段
- 确认配置中的 JWT 密钥一致

### Q4：如何修改数据库和服务器端口？
**A：** 修改 `config/local.yml` 或启动时指定 `-conf` 参数。

### Q5：如何在容器外访问 SQLite 数据库？
**A：** 挂载 `storage` 目录：
```bash
docker run -v $(pwd)/storage:/data/app/storage webstack-go:latest
```

### Q6：生产环境如何处理敏感信息（如 JWT 密钥）？
**A：** 
- 使用 K8s Secret：在 Helm Chart 中配置 Secret 而不是硬编码
- 或通过环境变量注入
- 不要将敏感配置提交到版本控制

### Q7：如何查看实时日志？
**A：** 
```bash
# Docker 容器日志
docker logs -f <container-id>

# Kubernetes Pod 日志
kubectl logs -f <pod-name> -n nav

# 本地日志文件
tail -f storage/logs/server.log
```

### Q8：如何扩展新的功能模块？
**A：** 
1. 在 `internal/dal/repository/` 创建数据仓库
2. 在 `internal/service/<module>/` 创建业务逻辑
3. 在 `internal/handler/<module>/` 创建 HTTP 处理器
4. 在 `cmd/server/wire/wire.go` 中注册依赖
5. 运行 `wire` 重新生成依赖注入代码

## �� 相关资源

- [Gin 文档](https://gin-gonic.com/)
- [GORM 文档](https://gorm.io/)
- [Google Wire 文档](https://github.com/google/wire)
- [Swagger/OpenAPI 规范](https://swagger.io/)
- [Kubernetes 文档](https://kubernetes.io/)
- [Helm 文档](https://helm.sh/)

## 📄 许可证

此项目采用 Apache 2.0 许可证，详见 [LICENSE](LICENSE) 文件。

## 👥 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！
