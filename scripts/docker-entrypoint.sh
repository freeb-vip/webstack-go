#!/bin/sh
# Docker 容器启动脚本
# 处理配置文件路径和环境变量

set -e

# 获取应用配置文件路径
CONF_PATH="${APP_CONF:-/app/config/local.yml}"

# 如果配置文件不存在，尝试使用备选路径
if [ ! -f "$CONF_PATH" ]; then
    echo "⚠️  Warning: Config file not found at $CONF_PATH"
    
    # 尝试其他可能的路径
    if [ -f "/app/config/prod.yml" ]; then
        echo "📝 Using production config: /app/config/prod.yml"
        CONF_PATH="/app/config/prod.yml"
    elif [ -f "config/local.yml" ]; then
        echo "📝 Using local config: config/local.yml"
        CONF_PATH="config/local.yml"
    elif [ -f "config/prod.yml" ]; then
        echo "📝 Using production config: config/prod.yml"
        CONF_PATH="config/prod.yml"
    else
        echo "❌ Error: No configuration file found!"
        echo "📋 Available configs:"
        find . -name "*.yml" -o -name "*.yaml" 2>/dev/null || echo "   (none found)"
        exit 1
    fi
fi

echo "🚀 Starting webstack-go server..."
echo "📂 Config: $CONF_PATH"
echo "🔧 Other environment variables:"
echo "   - APP_ENV: ${APP_ENV:-not set}"
echo "   - TZ: ${TZ:-not set}"

# 启动应用
exec /app/server -conf="$CONF_PATH"
