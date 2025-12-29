.PHONY: init
init:
	go install github.com/google/wire/cmd/wire@latest
	go install github.com/swaggo/swag/cmd/swag@latest
	go install github.com/incu6us/goimports-reviser/v3@latest
	go install mvdan.cc/gofumpt@latest

.PHONY: build
build:
	go build -ldflags="-s -w" -o ./bin/server ./cmd/server

.PHONY: swag
swag:
	swag init  -g cmd/server/main.go -o ./docs --parseDependency

.PHONY: fmt
fmt:
	goimports-reviser -rm-unused -set-alias -format ./...
	find . -name '*.go' -not -name "*.pb.go" -not -name "*.gen.go" | xargs gofumpt -w -extra

.PHONY: run
run:
	go mod tidy
	go build -ldflags="-s -w" -o ./bin/server ./cmd/server
	./bin/server -conf=config/prod.yml

# ============================================================================
# 开发相关命令
# ============================================================================
.PHONY: dev
dev:
	docker compose -f docker-compose.dev.yml up

.PHONY: dev-down
dev-down:
	docker compose -f docker-compose.dev.yml down

# ============================================================================
# 生产 Docker 相关命令
# ============================================================================

.PHONY: docker
docker: docker-build
	@echo "Docker 镜像构建完成"

.PHONY: docker-build
docker-build:
	@echo "构建生产级 Docker 镜像..."
	bash scripts/build-docker.sh -t v3.1.0 -v 3.1.0

.PHONY: docker-build-prod
docker-build-prod:
	@echo "构建并推送到仓库..."
	bash scripts/build-docker.sh -t v3.1.0 -v 3.1.0 -p

.PHONY: docker-run
docker-run:
	@echo "启动 Docker 容器..."
	bash scripts/run-docker.sh start

.PHONY: docker-stop
docker-stop:
	@echo "停止 Docker 容器..."
	bash scripts/run-docker.sh stop

.PHONY: docker-restart
docker-restart:
	@echo "重启 Docker 容器..."
	bash scripts/run-docker.sh restart

.PHONY: docker-logs
docker-logs:
	bash scripts/run-docker.sh logs

.PHONY: docker-shell
docker-shell:
	bash scripts/run-docker.sh shell

.PHONY: docker-remove
docker-remove:
	@echo "删除 Docker 容器..."
	bash scripts/run-docker.sh remove

.PHONY: docker-status
docker-status:
	bash scripts/run-docker.sh status

.PHONY: docker-compose-up
docker-compose-up:
	@echo "使用 docker-compose 启动应用..."
	docker compose up -d

.PHONY: docker-compose-down
docker-compose-down:
	@echo "使用 docker-compose 停止应用..."
	docker compose down

.PHONY: docker-compose-logs
docker-compose-logs:
	docker compose logs -f

.PHONY: docker-clean
docker-clean:
	@echo "清理 Docker 相关资源..."
	docker container prune -f
	docker image prune -f
	docker volume prune -f

# ============================================================================
# 帮助信息
# ============================================================================
.PHONY: help
help:
	@echo "webstack-go Makefile 命令列表"
	@echo ""
	@echo "开发命令:"
	@echo "  make init          初始化开发环境"
	@echo "  make build         编译项目"
	@echo "  make run           运行项目"
	@echo "  make fmt           格式化代码"
	@echo "  make swag          生成 Swagger 文档"
	@echo ""
	@echo "开发 Docker 命令:"
	@echo "  make dev           启动开发 Docker 容器"
	@echo "  make dev-down      停止开发 Docker 容器"
	@echo ""
	@echo "生产 Docker 命令:"
	@echo "  make docker-build         构建生产镜像"
	@echo "  make docker-build-prod    构建并推送镜像到仓库"
	@echo "  make docker-run           启动容器"
	@echo "  make docker-stop          停止容器"
	@echo "  make docker-restart       重启容器"
	@echo "  make docker-logs          查看容器日志"
	@echo "  make docker-shell         进入容器 shell"
	@echo "  make docker-status        查看容器状态"
	@echo "  make docker-remove        删除容器"
	@echo "  make docker-clean         清理 Docker 资源"
	@echo ""
	@echo "Docker Compose 命令:"
	@echo "  make docker-compose-up    启动应用栈"
	@echo "  make docker-compose-down  停止应用栈"
	@echo "  make docker-compose-logs  查看应用栈日志"
	@echo ""
	@echo "其他命令:"
	@echo "  make help         显示此帮助信息"
