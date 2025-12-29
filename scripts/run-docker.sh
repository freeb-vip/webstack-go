#!/bin/bash
# webstack-go Docker 运行脚本
# 用于快速启动和管理容器

set -e

# 配置
CONTAINER_NAME="${CONTAINER_NAME:-webstack-go}"
IMAGE_NAME="${IMAGE_NAME:-webstack-go:latest}"
PORT="${PORT:-8000}"
STORAGE_DIR="${STORAGE_DIR:-./storage}"
CONFIG_DIR="${CONFIG_DIR:-./config}"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 函数
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }

# 创建本地目录
ensure_dirs() {
    mkdir -p "$STORAGE_DIR/logs"
    mkdir -p "$CONFIG_DIR"
    print_success "目录创建完成"
}

# 启动容器
start_container() {
    print_info "启动容器: $CONTAINER_NAME"
    
    docker run -d \
        --name "$CONTAINER_NAME" \
        -p "${PORT}:8000" \
        -v "$(pwd)/$STORAGE_DIR:/app/storage" \
        -v "$(pwd)/$CONFIG_DIR:/app/config" \
        -e APP_ENV=production \
        --restart unless-stopped \
        --health-cmd='curl -f http://localhost:8000/ || exit 1' \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        "$IMAGE_NAME" \
        -conf=/app/config/local.yml
    
    print_success "容器启动成功"
    print_info "容器名称: $CONTAINER_NAME"
    print_info "访问地址: http://localhost:${PORT}"
}

# 停止容器
stop_container() {
    print_info "停止容器: $CONTAINER_NAME"
    if docker stop "$CONTAINER_NAME"; then
        print_success "容器已停止"
    fi
}

# 删除容器
remove_container() {
    print_info "删除容器: $CONTAINER_NAME"
    if docker rm -f "$CONTAINER_NAME"; then
        print_success "容器已删除"
    fi
}

# 查看日志
view_logs() {
    docker logs -f "$CONTAINER_NAME"
}

# 进入容器
exec_shell() {
    docker exec -it "$CONTAINER_NAME" /bin/sh
}

# 显示帮助
usage() {
    cat << EOF
用法: $(basename "$0") <命令>

命令:
  start       启动容器
  stop        停止容器
  restart     重启容器
  remove      删除容器
  logs        查看日志
  shell       进入容器 shell
  status      显示容器状态
  help        显示帮助信息

环境变量:
  CONTAINER_NAME    容器名称 (默认: webstack-go)
  IMAGE_NAME        镜像名称 (默认: webstack-go:latest)
  PORT              端口映射 (默认: 8000)
  STORAGE_DIR       存储目录 (默认: ./storage)
  CONFIG_DIR        配置目录 (默认: ./config)

示例:
  # 启动容器
  $(basename "$0") start

  # 查看日志
  $(basename "$0") logs

  # 使用自定义端口
  PORT=9000 $(basename "$0") start
EOF
}

# 主程序
main() {
    case "${1:-help}" in
        start)
            ensure_dirs
            start_container
            ;;
        stop)
            stop_container
            ;;
        restart)
            stop_container
            sleep 2
            start_container
            ;;
        remove)
            remove_container
            ;;
        logs)
            view_logs
            ;;
        shell)
            exec_shell
            ;;
        status)
            docker ps --filter "name=$CONTAINER_NAME"
            ;;
        help|--help|-h)
            usage
            ;;
        *)
            print_error "未知命令: $1"
            usage
            exit 1
            ;;
    esac
}

main "$@"
