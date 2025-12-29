# Helm 本地存储部署快速指南

## 概述

已优化 Helm Chart 以支持本地存储部署，主要特点：
- ✅ **单副本设计**：符合本地存储特性（本地存储不支持多副本）
- ✅ **自动化**：自动创建 PV、PVC、StorageClass
- ✅ **节点绑定**：Pod 自动绑定到指定节点
- ✅ **数据持久化**：存储数据在节点本地路径

## 文件结构

新增和修改的文件：

```
chart/nav/
├── values-production.yaml          # ✏️ 优化：单副本、本地存储配置
├── templates/
│   ├── StorageClass.yaml           # ✨ 新增：本地存储类
│   ├── pv.yaml                     # ✨ 新增：PersistentVolume
│   ├── pvc.yaml                    # ✨ 新增：PersistentVolumeClaim
│   └── StatefulSet.yaml            # ✏️ 优化：支持本地 PVC
└── LOCAL_STORAGE_GUIDE.md          # ✨ 新增：详细使用指南
```

## 快速部署（3 步）

### 第 1 步：准备本地存储

在 Kubernetes 节点上执行：

```bash
# 1. 创建存储目录
sudo mkdir -p /data/webstack-go-storage
sudo chown 1000:1000 /data/webstack-go-storage
sudo chmod 755 /data/webstack-go-storage

# 2. 验证
ls -ld /data/webstack-go-storage
```

### 第 2 步：修改配置

编辑 `chart/nav/values-production.yaml`：

```yaml
# 第 7 行左右 - 单副本设置（已配置）
replicaCount: 1

# 第 97-108 行 - 本地存储配置
persistence:
  enabled: true
  local: true
  nodeName: "your-node-name"              # ⚠️ 改为实际节点名（如：worker-1）
  hostPath: "/data/webstack-go-storage"  # ⚠️ 改为实际路径
  storageClass: "local-storage"
  size: 20Gi                              # 可按需修改
```

**获取节点名：**
```bash
kubectl get nodes -o wide
```

### 第 3 步：部署

```bash
# 创建命名空间
kubectl create namespace webstack-go

# 部署 Chart
cd chart/
helm install webstack-go nav/ \
  -n webstack-go \
  -f nav/values-production.yaml

# 等待部署完成
kubectl wait --for=condition=ready pod \
  -l app.kubernetes.io/name=webstack-go \
  -n webstack-go \
  --timeout=300s
```

## 验证部署

```bash
# 1. 检查 Pod
kubectl get pods -n webstack-go

# 2. 检查存储
kubectl get pv,pvc -n webstack-go

# 3. 查看 Pod 详情
kubectl describe pod -n webstack-go -l app.kubernetes.io/name=webstack-go

# 4. 查看日志
kubectl logs -n webstack-go -l app.kubernetes.io/name=webstack-go
```

## 关键配置说明

| 配置项 | 说明 | 修改建议 |
|--------|------|--------|
| `replicaCount` | Pod 副本数 | 保持为 1（本地存储限制） |
| `persistence.local` | 使用本地存储 | 保持为 true |
| `persistence.nodeName` | 绑定的节点 | **必须修改**为实际节点名 |
| `persistence.hostPath` | 本地存储路径 | **必须修改**为实际路径 |
| `persistence.size` | 存储大小 | 按需修改（20Gi） |
| `affinity.nodeAffinity` | 节点亲和性 | 保持与 nodeName 一致 |

## 常用命令

```bash
# 查看 Helm 部署状态
helm status webstack-go -n webstack-go

# 查看所有 Helm release
helm list -n webstack-go

# 升级部署
helm upgrade webstack-go nav/ -n webstack-go -f nav/values-production.yaml

# 回滚到上一个版本
helm rollback webstack-go -n webstack-go

# 卸载部署（数据保留）
helm uninstall webstack-go -n webstack-go

# 完全清理（删除 PVC，数据保留在节点）
kubectl delete pvc -n webstack-go --all
kubectl delete pv webstack-go-pv
```

## 数据管理

### 查看数据存储位置

```bash
# 在节点上查看
ls -la /data/webstack-go-storage/
du -sh /data/webstack-go-storage/

# 从集群查看
kubectl exec -it -n webstack-go \
  $(kubectl get pod -n webstack-go -l app.kubernetes.io/name=webstack-go -o jsonpath='{.items[0].metadata.name}') \
  -- ls -la /app/storage/
```

### 备份数据

```bash
# 在节点上备份
sudo tar -czf /backup/nav-$(date +%Y%m%d-%H%M%S).tar.gz \
  /data/webstack-go-storage/

# 验证备份
tar -tzf /backup/nav-*.tar.gz | head -20
```

### 恢复数据

```bash
# 停止 Pod
kubectl scale statefulset -n webstack-go webstack-go --replicas=0

# 在节点上恢复
sudo tar -xzf /backup/nav-20231229.tar.gz -C /

# 启动 Pod
kubectl scale statefulset -n webstack-go webstack-go --replicas=1
```

## 故障排查

### Pod 无法启动

```bash
# 检查 PVC 状态
kubectl describe pvc webstack-go-pvc -n webstack-go

# 检查 PV 状态
kubectl describe pv webstack-go-pv

# 查看 Pod 事件
kubectl describe pod -n webstack-go \
  $(kubectl get pod -n webstack-go -l app.kubernetes.io/name=webstack-go -o jsonpath='{.items[0].metadata.name}')
```

### 存储路径不存在

```bash
# 在节点上检查
ssh user@node-name
sudo ls -la /data/webstack-go-storage

# 创建缺失的目录
sudo mkdir -p /data/webstack-go-storage
sudo chown 1000:1000 /data/webstack-go-storage
```

### 权限问题

```bash
# Pod 运行用户是 uid 1000，确保节点目录权限正确
sudo chown 1000:1000 /data/webstack-go-storage
sudo chmod 755 /data/webstack-go-storage

# 检查 Pod 中的权限
kubectl exec -it -n webstack-go \
  $(kubectl get pod -n webstack-go -l app.kubernetes.io/name=webstack-go -o jsonpath='{.items[0].metadata.name}') \
  -- id
```

## 高级配置

详见 [LOCAL_STORAGE_GUIDE.md](./LOCAL_STORAGE_GUIDE.md)，包含：
- 多节点部署
- 自定义 PVC 名称
- 节点标签和选择器
- 监控和告警
- 生产环境最佳实践

## 注意事项

⚠️ **重要提示**

1. **单副本限制**：本地存储物理上绑定到节点，无法支持多副本
2. **节点故障**：节点故障时，需要手动迁移数据和 Pod
3. **存储扩展**：本地存储无法自动扩展，需要提前规划容量
4. **生产部署**：生产环境建议使用 NFS、EBS 等共享存储

## 回到其他部署方式

如果需要改回其他部署方式：

```bash
# 回到基础配置（自动 emptyDir）
helm upgrade webstack-go nav/ -n webstack-go -f nav/values.yaml

# 回到开发配置
helm upgrade webstack-go nav/ -n webstack-go -f nav/values-dev.yaml
```

## 更多信息

- Kubernetes 本地存储文档：https://kubernetes.io/docs/concepts/storage/volumes/#local
- 完整配置指南：见 `LOCAL_STORAGE_GUIDE.md`
- Helm 官方文档：https://helm.sh/docs/
