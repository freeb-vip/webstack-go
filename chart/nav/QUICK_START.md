# Helm 部署快速指南

## 前置要求

- Kubernetes 1.20+ 集群
- Helm 3.0+ 
- kubectl 已配置

## 快速部署（3 步）

### 1. 创建命名空间

```bash
kubectl create namespace nav
```

### 2. 部署应用

```bash
cd chart/
helm install nav nav/ -n nav -f nav/values-production.yaml
```

### 3. 验证部署

```bash
# 查看 Pod 状态
kubectl get pods -n nav

# 查看服务
kubectl get svc -n nav

# 查看 PVC（存储）
kubectl get pvc -n nav

# 查看部署详情
helm status nav -n nav
```

## 访问应用

### 方式一：端口转发（测试）

```bash
kubectl port-forward svc/nav 8000:8000 -n nav

# 访问 http://localhost:8000
```

### 方式二：配置 Ingress（生产）

编辑 `values-production.yaml`，启用和配置 Ingress：

```yaml
ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: nav.example.com
      paths:
        - path: /
          pathType: Prefix
```

然后升级部署：

```bash
helm upgrade nav nav/ -n nav -f nav/values-production.yaml
```

## 常用操作

### 查看部署配置

```bash
# 显示实际使用的配置
helm get values nav -n nav

# 显示生成的 manifest
helm get manifest nav -n nav
```

### 升级应用

```bash
# 升级到新版本
helm upgrade nav nav/ -n nav -f nav/values-production.yaml

# 升级并等待就绪
helm upgrade nav nav/ -n nav -f nav/values-production.yaml --wait
```

### 回滚应用

```bash
# 查看发布历史
helm history nav -n nav

# 回滚到上一个版本
helm rollback nav -n nav

# 回滚到指定版本
helm rollback nav 2 -n nav
```

### 删除应用

```bash
# 卸载 Helm release（数据保留）
helm uninstall nav -n nav

# 删除持久化数据（如果需要）
kubectl delete pvc -n nav --all

# 删除命名空间
kubectl delete namespace nav
```

## 配置说明

### values-production.yaml

生产环境推荐配置：
- **副本数**：1（单副本）
- **存储**：使用默认 StorageClass，10Gi
- **资源限制**：CPU 1000m，内存 1Gi
- **健康检查**：启用三种探针（startup, readiness, liveness）

修改前需要检查和调整的项：

```yaml
image:
  repository: hongmaster/nav  # 镜像仓库
  tag: "latest"               # 镜像标签

ingress:
  enabled: true
  hosts:
    - host: nav.example.com   # 修改为实际域名
```

### values-dev.yaml

开发环境推荐配置：
- **副本数**：1
- **存储**：禁用（使用 emptyDir）
- **Ingress**：禁用
- **资源限制**：较低（500m CPU，512Mi 内存）

### values.yaml

基础配置（所有环境的默认值）：
- 适用于未指定特定配置文件时的默认行为

## 存储说明

### 默认 StorageClass

Helm Chart 使用 Kubernetes 集群的默认 StorageClass。确保集群有可用的存储：

```bash
# 查看可用的 StorageClass
kubectl get storageclass

# 查看默认的 StorageClass
kubectl get storageclass -o wide | grep default
```

### 持久化数据

容器中的数据存储位置：
- `/app/storage` - 应用数据目录（挂载持久卷）
- `/app/config` - 配置目录（从 ConfigMap 挂载）

若要保持数据持久化，确保：
1. `persistence.enabled: true`
2. 提供足够的存储容量
3. 使用具有稳定回收策略的 StorageClass

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 事件
kubectl describe pod <pod-name> -n nav

# 查看容器日志
kubectl logs <pod-name> -n nav

# 进入容器 shell
kubectl exec -it <pod-name> -n nav -- sh
```

### 存储相关问题

```bash
# 检查 PVC 状态
kubectl describe pvc -n nav

# 检查 PV 状态
kubectl get pv

# 检查 StorageClass
kubectl describe storageclass <storage-class-name>
```

### Helm 安装失败

```bash
# 验证 Chart 配置
helm lint nav/

# 模拟安装（不实际部署）
helm install nav nav/ -n nav -f nav/values-production.yaml --dry-run

# 查看 release 状态
helm status nav -n nav

# 获取安装详情
helm get notes nav -n nav
```

## 环境变量配置

通过 values 文件的 `env` 字段设置环境变量：

```yaml
env:
  APP_CONF: "config/local.yml"
  # 添加其他环境变量
  LOG_LEVEL: "debug"
```

## 监控和日志

### 查看应用日志

```bash
# 实时日志
kubectl logs -f <pod-name> -n nav

# 查看上一个容器的日志（容器重启）
kubectl logs <pod-name> -n nav --previous

# 查看所有 Pod 的日志
kubectl logs -l app.kubernetes.io/name=webstack-go -n nav --all-containers=true
```

### 监控资源使用

```bash
# 查看 Pod 资源占用
kubectl top pod -n nav

# 查看节点资源占用
kubectl top node
```

## 相关文件

- `chart/nav/values.yaml` - 基础配置
- `chart/nav/values-production.yaml` - 生产配置
- `chart/nav/values-dev.yaml` - 开发配置
- `chart/nav/Chart.yaml` - Chart 元信息
- `chart/nav/templates/` - Kubernetes manifest 模板

## 更多信息

- [Helm 官方文档](https://helm.sh/docs/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [本项目 Helm Chart 说明](./chart/nav/README.md)
