# 开发调试文档

本文档介绍如何使用 Docker Compose 进行本地开发和热更新调试。

## 1. 环境准备

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/) (可选，但推荐)

## 2. 快速开始

### 启动开发模式

在项目根目录下运行以下命令：

```bash
make dev
```

或者直接使用 docker compose：

```bash
docker compose -f docker-compose.dev.yml up
```

该命令会：
1. 构建开发镜像（基于 `Dockerfile.dev`）。
2. 安装 `air` 热更新工具。
3. 挂载当前目录到容器内，实现代码同步。
4. 启动 `air` 监听文件变化并自动重新编译运行。

### 访问服务

- API 服务: [http://localhost:8000](http://localhost:8000)
- Swagger 文档: [http://localhost:8000/swagger/index.html](http://localhost:8000/swagger/index.html)

## 3. 热更新说明

项目集成了 [Air](https://github.com/air-verse/air) 实现热更新。

- **监听范围**: 默认监听 `.go`, `.tpl`, `.tmpl`, `.html` 文件。
- **排除目录**: `bin`, `tmp`, `vendor`, `.git`, `storage` 等。
- **配置文件**: 详见项目根目录下的 `.air.toml`。

当你修改代码并保存时，容器内的 `air` 会自动触发重新编译并重启服务。

## 4. 常用开发命令

| 命令 | 说明 |
| --- | --- |
| `make dev` | 启动开发模式（热更新） |
| `make dev-down` | 停止开发模式容器 |
| `make swag` | 重新生成 Swagger 文档 |
| `make fmt` | 格式化代码 |
| `make init` | 安装本地开发依赖（wire, swag 等） |

## 5. 常见问题

### 5.1 依赖更新
如果你修改了 `go.mod` 或 `go.sum`，建议重新构建镜像：
```bash
docker compose -f docker-compose.dev.yml build
```

### 5.2 网络问题 (GOPROXY)
如果在 `go mod download` 或安装工具时遇到 `unexpected EOF` 或超时，可以尝试在 `Dockerfile.dev` 中更换 `GOPROXY`。目前默认配置了多个备选源：
`GOPROXY=https://goproxy.cn,https://goproxy.io,direct`

### 5.3 数据库
开发模式默认使用 SQLite 数据库，文件存储在 `storage/webstack-go.db`。该目录已挂载到宿主机，数据会持久化。

### 5.3 配置文件
开发模式默认使用 `config/local.yml`。你可以通过修改 `docker-compose.dev.yml` 中的 `APP_CONF` 环境变量来切换配置。
