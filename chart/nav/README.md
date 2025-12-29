# webstack-go Helm Chart

该 Helm Chart 用于在 Kubernetes 集群中部署 webstack-go 应用。

## 介绍

webstack-go 是一个基于 Go、Gin 和 GORM 构建的现代化网站导航系统。

## 前置要求

- Kubernetes 1.20+
- Helm 3.0+
- 持久化卷支持（如需数据持久化）

## 安装 Chart

### 基础安装

```bash
# 创建命名空间
kubectl create namespace webstack-go

# 安装 Chart
helm install webstack-go ./chart/nav -n webstack-go
```

### 使用自定义配置

```bash
# 开发环境
helm install webstack-go ./chart/nav -n webstack-go -f chart/nav/values-dev.yaml

# 生产环境
helm install webstack-go ./chart/nav -n webstack-go -f chart/nav/values-production.yaml

# 使用自定义 values 文件
helm install webstack-go ./chart/nav -n webstack-go -f my-values.yaml
```

## 卸载 Chart

```bash
helm uninstall webstack-go -n webstack-go
```

## 配置

### 主要配置项

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `replicaCount` | Pod 副本数 | `1` |
| `image.repository` | 镜像仓库 | `webstack-go` |
| `image.tag` | 镜像标签 | `latest` |
| `image.pullPolicy` | 镜像拉取策略 | `IfNotPresent` |
| `service.type` | Service 类型 | `ClusterIP` |
| `service.port` | Service 端口 | `8000` |
| `ingress.enabled` | 启用 Ingress | `false` |
| `persistence.enabled` | 启用数据持久化 | `true` |
| `persistence.size` | 存储大小 | `10Gi` |
| `resources.limits.cpu` | CPU 限制 | `500m` |
| `resources.limits.memory` | 内存限制 | `512Mi` |
| `autoscaling.enabled` | 启用 HPA | `false` |
| `podDisruptionBudget.enabled` | 启用 PDB | `false` |

### 完整配置项

查看 [values.yaml](values.yaml) 获取所有可配置项的完整列表。

## 配置示例

### 1. 启用 Ingress

```yaml
ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: webstack.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
   - secretName: webstack-tls
     hosts:
       - webstack.example.com
```

### 2. 使用外部数据库

```yaml
config:
  data:
    data:
      db:
        user:
          driver: mysql
          dsn: "user:password@tcp(mysql-service:3306)/webstack_go?charset=utf8mb4&parseTime=True"
```

### 3. 启用自动扩缩容

```yaml
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80
```

### 4. 配置资源限制

```yaml
resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 200m
    memory: 256Mi
```

### 5. 配置持久化存储

```yaml
persistence:
  enabled: true
  storageClass: "standard"
  accessMode: ReadWriteOnce
  size: 20Gi
```

### 6. 使用现有 PVC

```yaml
persistence:
  enabled: true
  existingClaim: "my-existing-pvc"
```

## 升级

```bash
# 升级到新版本
helm upgrade webstack-go ./chart/nav -n webstack-go -f my-values.yaml

# 查看升级历史
helm history webstack-go -n webstack-go

# 回滚到上一个版本
helm rollback webstack-go -n webstack-go

# 回滚到特定版本
helm rollback webstack-go 2 -n webstack-go
```

## 测试部署

```bash
# 验证 Chart 配置
helm lint ./chart/nav

# 调试输出（不实际部署）
helm install webstack-go ./chart/nav -n webstack-go --dry-run --debug

# 生成 Kubernetes YAML
helm template webstack-go ./chart/nav -n webstack-go > output.yaml
```

## 监控和日志

### 查看 Pod 状态

```bash
kubectl get pods -n webstack-go -l "app.kubernetes.io/name=webstack-go"
```

### 查看日志

```bash
# 查看最新日志
kubectl logs -n webstack-go -l "app.kubernetes.io/name=webstack-go"

# 实时查看日志
kubectl logs -f -n webstack-go -l "app.kubernetes.io/name=webstack-go"

# 查看特定 Pod
kubectl logs -n webstack-go <pod-name>
```

### 进入 Pod

```bash
kubectl exec -it -n webstack-go <pod-name> -- /bin/sh
```

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 详情
kubectl describe pod -n webstack-go <pod-name>

# 查看事件
kubectl get events -n webstack-go --sort-by='.lastTimestamp'
```

### 存储问题

```bash
# 查看 PVC
kubectl get pvc -n webstack-go

# 查看 PV
kubectl get pv
```

### 网络问题

```bash
# 查看 Service
kubectl get svc -n webstack-go

# 查看 Ingress
kubectl get ingress -n webstack-go

# 测试内部连接
kubectl run -it --rm debug --image=busybox --restart=Never -n webstack-go -- wget -O- http://webstack-go:8000
```

## 安全建议

1. **生产环境务必修改 JWT 密钥**：
   ```yaml
   config:
     data:
       security:
         jwt:
           key: "your-secure-random-key"
   ```

2. **使用 Kubernetes Secret 管理敏感信息**：
   ```bash
   kubectl create secret generic webstack-jwt -n webstack-go --from-literal=key=your-secret-key
   ```

3. **配置 Pod Security Context**：
   ```yaml
   podSecurityContext:
     runAsNonRoot: true
     runAsUser: 1000
     fsGroup: 1000
   ```

4. **配置网络策略限制流量**

5. **定期更新镜像和依赖**

## 高可用部署

生产环境推荐配置：

```yaml
replicaCount: 3

affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchLabels:
            app.kubernetes.io/name: webstack-go
        topologyKey: kubernetes.io/hostname

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

podDisruptionBudget:
  enabled: true
  minAvailable: 2
```

## 性能优化

1. **合理设置资源请求和限制**
2. **启用 HPA 自动扩缩容**
3. **使用 SSD 存储类**
4. **配置合适的健康检查参数**
5. **使用缓存减少数据库压力**

## 参考链接

- [项目仓库](https://github.com/ch3nnn/webstack-go)
- [Helm 文档](https://helm.sh/docs/)
- [Kubernetes 文档](https://kubernetes.io/docs/)
