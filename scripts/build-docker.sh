#!/bin/bash
# webstack-go Docker 构建脚本
# 用于构建生产级别的 Docker 镜像

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 默认配置
REGISTRY="${REGISTRY:-docker.io}"
IMAGE_NAME="${IMAGE_NAME:-webstack-go}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
DOCKERFILE="${DOCKERFILE:-Dockerfile.prod}"
BUILD_CONTEXT="${BUILD_CONTEXT:-.}"

# 版本信息
VERSION="${VERSION:-unknown}"
BUILD_TIME=$(date -u '+%Y-%m-%d_%H:%M:%S')
GIT_COMMIT="${GIT_COMMIT:-$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')}"

# 函数：打印信息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# 函数：显示使用说明
usage() {
    cat << EOF
用法: $(basename "$0") [选项]

选项:
  -r, --registry REGISTRY       Docker 仓库地址 (默认: docker.io)
  -i, --image IMAGE             镜像名称 (默认: webstack-go)
  -t, --tag TAG                 镜像标签 (默认: latest)
  -v, --version VERSION         应用版本 (默认: unknown)
  -p, --push                    构建后推送镜像
  --load                        将镜像加载到本地 Docker (用于 buildx)
  -h, --help                    显示帮助信息

示例:
  # 基础构建
  $(basename "$0") -t v3.1.0

  # 构建并推送到仓库
  $(basename "$0") -r your-registry.com -i webstack-go -t v3.1.0 -p

  # 构建特定版本
  $(basename "$0") -v 3.1.0 -t v3.1.0
EOF
    exit 0
}

# 函数：验证 Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装或不在 PATH 中"
        exit 1
    fi
    print_success "Docker 环境检查通过"
}

# 函数：验证 Dockerfile
check_dockerfile() {
    if [ ! -f "$DOCKERFILE" ]; then
        print_error "Dockerfile 不存在: $DOCKERFILE"
        exit 1
    fi
    print_success "Dockerfile 检查通过"
}

# 函数：构建镜像
build_image() {
    local full_image_name="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    
    print_info "开始构建镜像"
    print_info "完整镜像名称: $full_image_name"
    print_info "版本信息:"
    print_info "  版本: $VERSION"
    print_info "  构建时间: $BUILD_TIME"
    print_info "  Git 提交: $GIT_COMMIT"
    
    # 构建参数
    local build_args=(
        "--build-arg" "VERSION=$VERSION"
        "--build-arg" "BUILD_TIME=$BUILD_TIME"
        "--build-arg" "GIT_COMMIT=$GIT_COMMIT"
    )
    
    # 添加标签
    local tags=(
        "-t" "$full_image_name"
    )
    
    # 如果标签不是 latest，也创建 latest 标签用于本地测试
    if [ "$IMAGE_TAG" != "latest" ]; then
        tags+=("-t" "${REGISTRY}/${IMAGE_NAME}:latest")
    fi
    
    # 执行构建
    if docker build \
        "${build_args[@]}" \
        "${tags[@]}" \
        -f "$DOCKERFILE" \
        "$BUILD_CONTEXT"; then
        print_success "镜像构建成功"
        return 0
    else
        print_error "镜像构建失败"
        return 1
    fi
}

# 函数：推送镜像
push_image() {
    local full_image_name="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    
    print_info "推送镜像到仓库: $REGISTRY"
    
    if docker push "$full_image_name"; then
        print_success "镜像推送成功: $full_image_name"
        if [ "$IMAGE_TAG" != "latest" ]; then
            docker push "${REGISTRY}/${IMAGE_NAME}:latest"
        fi
        return 0
    else
        print_error "镜像推送失败"
        return 1
    fi
}

# 函数：显示镜像信息
show_image_info() {
    print_info "镜像信息:"
    docker images --filter=reference="${REGISTRY}/${IMAGE_NAME}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    
    print_info "镜像大小:"
    docker images "${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}" --format "{{.Size}}"
    
    print_info "镜像历史:"
    docker history "${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}" --no-trunc --format "table {{.CreatedBy}}\t{{.Size}}"
}

# 函数：验证镜像
verify_image() {
    local full_image_name="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    
    print_info "验证镜像..."
    
    # 检查镜像是否存在
    if docker image inspect "$full_image_name" > /dev/null 2>&1; then
        print_success "镜像存在"
        show_image_info
        return 0
    else
        print_error "镜像不存在"
        return 1
    fi
}

# 主程序
main() {
    local should_push=false
    local should_load=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -r|--registry)
                REGISTRY="$2"
                shift 2
                ;;
            -i|--image)
                IMAGE_NAME="$2"
                shift 2
                ;;
            -t|--tag)
                IMAGE_TAG="$2"
                shift 2
                ;;
            -v|--version)
                VERSION="$2"
                shift 2
                ;;
            -p|--push)
                should_push=true
                shift
                ;;
            --load)
                should_load=true
                shift
                ;;
            -h|--help)
                usage
                ;;
            *)
                print_error "未知选项: $1"
                usage
                ;;
        esac
    done
    
    print_info "========== webstack-go Docker 构建脚本 =========="
    
    # 执行检查
    check_docker
    check_dockerfile
    
    # 构建镜像
    if build_image; then
        print_success "镜像构建阶段完成"
        
        # 验证镜像
        if verify_image; then
            # 推送镜像（如果指定了 -p）
            if [ "$should_push" = true ]; then
                if push_image; then
                    print_success "镜像推送阶段完成"
                else
                    print_error "镜像推送失败"
                    exit 1
                fi
            fi
            
            # 显示成功信息
            print_success "========== 构建完成 =========="
            print_info "镜像名称: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
            print_info "运行命令:"
            print_info "  docker run -d -p 8000:8000 --name webstack-go ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
            
            if [ "$should_push" = true ]; then
                print_info "已推送到仓库，可在其他机器上使用:"
                print_info "  docker pull ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
            fi
        else
            exit 1
        fi
    else
        exit 1
    fi
}

# 运行主程序
main "$@"
