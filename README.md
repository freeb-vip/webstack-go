# nav

## api文档
- 可使用在线文档http://localhost:8080/swagger/index.html
- 可使用工具导入doc/openapi.yaml文件查看

## 关键词
- k8s
- podman

## 历史版本
*当前版本*：3.1.0 具体查看**version**文件
- 3.1.0
- 3.0.0

### 1.构建应用缓存镜像
开发阶段编译调试，适用于本地**无匹配的mvn版本**构建的场景
```
podman build -t cr.freeb.vip/freeb/maven-cache-nav:latest -f Dockerfile.cache .
```

#### 1.1 容器内构建调试
```
podman run -it --rm -v $(pwd)/:/app -w /app cr.freeb.vip/freeb/maven-cache-nav:latest bash

```

### 2.构建应用镜像
```
podman build -t cr.freeb.vip/freeb/nav:dev -f Dockerfile .

#推送到镜像仓
podman push cr.freeb.vip/freeb/nav:dev
```

#### 2.1 流水线构建

**Jenkinsfile**

### 3.Helm 部署
[Helm](https://helm.sh/zh/)是k8s模板化部署高效工具，具体查看官网教程

部署命名空间:nav
```
cd chart/
helm install nav nav/ -n nav
```

### 4.Helm 升级

部署命名空间:a-nav

```
cd chart/
helm upgrade nav nav/ -n nav
```

### 5.Helm 卸载

部署命名空间:a-nav

```
cd chart/
helm uninstall nav nav/ -n a-nav
```

### 6.Helm 调试

部署命名空间:a-nav

```
cd chart/

## 导出k8s可部署的yaml
helm template nav nav/ -n nav > test.yaml

## 直接k8s部署
kubectl apply -f test.yaml

## debug模式输出，适用于模板有问题时调试使用
helm template nav nav/ -n a-nav--debug > test.yaml
```

