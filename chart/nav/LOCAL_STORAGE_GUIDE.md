# webstack-go Helm Chart - 本地存储配置指南

## 本地存储部署说明

当使用 `values-production.yaml` 进行部署时，应用使用本地持久存储。本地存储有以下限制和优势：

### 特点

✅ **优势**
- 性能高：直接使用节点本地存储，I/O 性能最佳
- 成本低：无需额外存储服务
- 简单：配置简单，易于管理

❌ **限制**
- **单副本只**：本地存储不支持跨节点共享，必须使用单副本
- **节点绑定**：Pod 被绑定到特定节点，节点故障时需要手动迁移
- **扩展困难**：水平扩展受限

### 部署前准备

#### 1. 准备本地存储目录

在要运行应用的节点上创建本地存储目录：

```bash
# 在目标节点上执行
sudo mkdir -p /data/webstack-go-storage
sudo chown 1000:1000 /data/webstack-go-storage  # appuser uid:gid
sudo chmod 755 /data/webstack-go-storage
```

#### 2. 标记节点（可选）

为了更好地管理，可以给存储节点添加标签：

```bash
kubectl label nodes <node-name> storage=local-primary
```

#### 3. 修改 values-production.yaml

编辑 `values-production.yaml` 中的持久存储配置：

```yaml
persistence:
  enabled: true
  local: true
  nodeName: "your-node-name"              # 修改为实际节点名称
  hostPath: "/data/webstack-go-storage"  # 修改为实际路径
  storageClass: "local-storage"
  size: 20Gi                              # 根据需求修改大小
```

### 部署步骤

#### 方式一：使用 values-production.yaml（推荐）

```bash
# 1. 创建命名空间
kubectl create namespace webstack-go

# 2. 部署 Helm Chart
cd chart/
helm install webstack-go nav/ \
  -n webstack-go \
  -f nav/values-production.yaml

# 3. 验证部署
kubectl get pods -n webstack-go
kubectl get pv
kubectl get pvc -n webstack-go
```

#### 方式二：使用已有的 PVC

如果已经创建了 PVC，可以直接使用：

```yaml
persistence:
  enabled: true
  existingClaim: "my-existing-pvc"  # 使用已有 PVC
```

### 验证部署

```bash
# 查看 PV 状态
kubectl get pv

# 查看 PVC 状态
kubectl get pvc -n webstack-go

# 查看 Pod 日志
kubectl logs -n webstack-go -l app.kubernetes.io/name=webstack-go

# 测试数据持久化
kubectl get pvc -n webstack-go webstack-go-pvc
```

### 数据管理

#### 备份数据

```bash
# 在节点上备份本地存储数据
sudo tar -czf /backup/webstack-go-$(date +%Y%m%d).tar.gz \
  /data/webstack-go-storage/
```

#### 恢复数据

```bash
# 在节点上恢复数据
sudo tar -xzf /backup/webstack-go-20231229.tar.gz -C /
```

#### 清理数据

```bash
# 删除 Helm release（不会删除 PV 上的数据）
helm uninstall webstack-go -n webstack-go

# 手动删除节点上的数据（需谨慎）
sudo rm -rf /data/webstack-go-storage/*
```

### 扩展到其他节点

如果需要在其他节点部署相同应用（不是扩展副本，而是全新部署），请：

1. 在新节点上准备相同的本地存储目录
2. 创建新的 values 文件，指向新节点
3. 使用新的 values 文件部署

```bash
# 部署到 node-2
helm install webstack-go-node2 nav/ \
  -n webstack-go \
  -f values-production-node2.yaml
```

### 升级和回滚

```bash
# 升级 Helm release
helm upgrade webstack-go nav/ \
  -n webstack-go \
  -f nav/values-production.yaml

# 查看发布历史
helm history webstack-go -n webstack-go

# 回滚到上一个版本
helm rollback webstack-go 1 -n webstack-go
```

### 故障排查

#### Pod 无法启动

```bash
# 检查 PVC 绑定状态
kubectl describe pvc webstack-go-pvc -n webstack-go

# 检查 PV 状态
kubectl describe pv webstack-go-pv

# 检查节点状态
kubectl describe node <node-name>
```

#### 存储满

```bash
# 检查本地存储使用情况
df -h /data/webstack-go-storage

# 扩展存储大小（需要修改 hostPath 目录的物理存储）
# 1. 增加节点存储容量
# 2. 修改 PVC size（但不会自动扩展）
```

### 生产环境建议

对于生产环境，建议考虑以下方案：

1. **多副本部署**：使用云存储（NFS, EBS, GCE PD）替换本地存储
2. **高可用**：部署多个节点，使用共享存储
3. **备份**：定期备份本地存储数据
4. **监控**：监控存储空间使用情况

### 相关文件

- `values-production.yaml` - 生产环境配置
- `templates/pv.yaml` - PersistentVolume 定义
- `templates/pvc.yaml` - PersistentVolumeClaim 定义
- `templates/storageclass.yaml` - StorageClass 定义
- `templates/StatefulSet.yaml` - Pod 部署定义

### 更多帮助

```bash
# 查看 Helm Chart 的所有可用选项
helm show values nav/

# 获取 Chart 信息
helm show chart nav/

# 执行 Chart 检查
helm lint nav/
```
