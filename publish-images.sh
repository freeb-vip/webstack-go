#!/bin/bash

# ==============================================================================
# WebStack-Go 镜像打包上传脚本
# 支持 Harbor, Docker Hub 等兼容 Docker Registry 协议的仓库
# ==============================================================================

# 加载本地配置 (如果存在)
if [ -f .env.publish ]; then
    # 使用更稳健的方式加载环境变量，支持特殊字符
    set -a
    source .env.publish
    set +a
fi

# --- 配置部分 (也可以通过环境变量设置) ---
REGISTRY=${REGISTRY:-"cr.freeb.vip"} # 仓库地址 (Docker Hub 留空或设为 docker.io)
REPOSITORY_PROJECT=${REPOSITORY_PROJECT:-"webstack"} # 项目名称/命名空间
USERNAME=${USERNAME:-"admin"}
PASSWORD=${PASSWORD:-"Harbor12345"}
INSECURE=${INSECURE:-"false"}

# 获取输入的 Tag，如果没有输入则使用环境变量中的 TAG，再没有则默认为 latest
INPUT_TAG=$1
TAG=${INPUT_TAG:-${TAG:-"latest"}}

# 镜像名称
IMAGE_NAME="webstack-go"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 版本信息
VERSION=${TAG}
BUILD_TIME=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# 配置 Insecure 模式参数 (主要针对 podman 或某些支持该参数的 docker 版本)
INSECURE_FLAGS=""
if [ "$INSECURE" == "true" ]; then
    echo -e "${YELLOW}检测到开启了 INSECURE 模式，将尝试跳过证书验证...${NC}"
    # 注意：标准 Docker CLI 不支持在 login/push 时直接传 --tls-verify=false
    # 如果是 podman，该参数有效。如果是标准 docker，建议配置 /etc/docker/daemon.json 的 insecure-registries
    INSECURE_FLAGS="--tls-verify=false"
    
    # 检查是否是真正的 docker 而不是 podman
    if docker --version 2>/dev/null | grep -q "Docker version" && ! docker --version 2>/dev/null | grep -q "podman"; then
        echo -e "${YELLOW}提示: 您似乎在使用标准 Docker。如果脚本执行失败，请在 /etc/docker/daemon.json 中配置: ${NC}"
        echo -e "${YELLOW}  { \"insecure-registries\": [\"$REGISTRY\"] }${NC}"
        # 标准 docker 不支持 --tls-verify=false，清空它以防报错
        INSECURE_FLAGS=""
    fi
fi

echo -e "${YELLOW}开始打包上传流程... (Tag: ${TAG})${NC}"

# 1. 登录仓库
echo -e "${YELLOW}正在登录仓库: ${REGISTRY}...${NC}"
if [ "$REGISTRY" == "docker.io" ] || [ -z "$REGISTRY" ]; then
    echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
    FULL_REGISTRY="docker.io/$USERNAME"
else
    echo "$PASSWORD" | docker login $INSECURE_FLAGS "$REGISTRY" -u "$USERNAME" --password-stdin
    FULL_REGISTRY="$REGISTRY/$REPOSITORY_PROJECT"
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}登录失败，请检查配置！${NC}"
    exit 1
fi

# 函数：构建并推送镜像
build_and_push() {
    local image_name=$1
    local context_path=$2
    local dockerfile="Dockerfile.prod"
    local full_image_path="$FULL_REGISTRY/$image_name"
    local target_tag="$full_image_path:$TAG"
    local latest_tag="$full_image_path:latest"

    if [ ! -f "$dockerfile" ]; then
        echo -e "${YELLOW}未找到 $dockerfile，尝试使用默认 Dockerfile${NC}"
        dockerfile="Dockerfile"
    fi

    echo -e "${YELLOW}正在构建 ${image_name}:${TAG} 使用 ${dockerfile}...${NC}"
    
    docker build \
        --build-arg VERSION="$VERSION" \
        --build-arg BUILD_TIME="$BUILD_TIME" \
        --build-arg GIT_COMMIT="$GIT_COMMIT" \
        -f "$dockerfile" \
        -t "$target_tag" "$context_path"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}构建成功，正在推送 ${target_tag}...${NC}"
        docker push $INSECURE_FLAGS "$target_tag"
        
        # 如果当前 tag 不是 latest，则同时推送 latest
        if [ "$TAG" != "latest" ]; then
            echo -e "${YELLOW}正在推送 latest 标签...${NC}"
            docker tag "$target_tag" "$latest_tag"
            docker push $INSECURE_FLAGS "$latest_tag"
        fi
    else
        echo -e "${RED}${image_name} 构建失败！${NC}"
        exit 1
    fi
}

# 2. 构建并推送 WebStack-Go
build_and_push "$IMAGE_NAME" "."

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}镜像已成功上传到: ${FULL_REGISTRY}${NC}"
echo -e "${GREEN}Tag: ${TAG}${NC}"
if [ "$TAG" != "latest" ]; then
    echo -e "${GREEN}同时更新了 latest 标签${NC}"
fi
echo -e "${GREEN}========================================${NC}"
