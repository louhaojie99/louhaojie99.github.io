---
title: Docker 常用命令
date: 2026-10-04 00:00:00
updated: 2026-10-04 00:00:00
tags:
  - Docker
  - Docker Compose
categories:
  - 【开发基础】
  - Docker
comments: false
abbrlink: docker-common-commands
description: 面向日常开发的 Docker 命令速查，涵盖镜像、容器、日志排查、端口、数据卷、网络、Compose 与资源清理。
toc: true
cover: /img/covers/tech-docker.png
top_img: /img/covers/tech-docker.png
---

Docker 日常操作主要围绕几个对象：下载或构建**镜像**，用镜像启动**容器**，通过**数据卷**保存数据，用**网络**连接服务。多个服务一起运行时，再用 Docker Compose 管理。

本文按开发场景整理常用命令。示例默认使用 Bash 或 Zsh、Linux 容器，以及现代的 `docker compose` 命令。各节按需使用，不必从头到尾逐条执行；示例中的容器名、镜像名和路径可以替换成自己的值。

<!-- more -->

## 一、环境检查与帮助

```bash
docker --version             # 查看客户端版本
docker version               # 查看客户端和服务端版本
docker info                  # 查看 Docker Engine 信息
docker compose version       # 查看 Compose 版本
docker context ls            # 查看可用连接环境和当前环境
docker run --help            # 查看具体命令的参数
```

`docker --version` 正常不代表 Docker Engine 已经启动。若提示无法连接 daemon，先启动 Docker Desktop；使用 systemd 的 Linux 主机可以通过 `sudo systemctl status docker` 检查服务。

Docker 命令操作的是当前连接的 Engine，它可能位于远程主机。切换环境使用 `docker context use 环境名`，删除资源前应确认目标环境。

## 二、镜像管理

镜像是创建容器的模板，通常写成 `仓库名:标签`，例如 `nginx:stable-alpine`。

```bash
docker search nginx                  # 在 Docker Hub 搜索镜像
docker pull nginx:stable-alpine       # 下载镜像
docker image ls                      # 查看本地镜像，简写 docker images
docker image inspect nginx:stable-alpine  # 查看镜像详细信息
docker image history nginx:stable-alpine  # 查看镜像层历史
docker image rm nginx:stable-alpine   # 删除本地镜像，简写 docker rmi
```

省略标签时默认使用 `latest`，但它只是标签名，不保证代表最新版本。本文用便于演示的标签；需要可复现的部署时，应记录经过验证的镜像 digest，并使用 `镜像名@sha256:摘要` 固定内容。

### 构建镜像

在包含 `Dockerfile` 的项目目录执行：

```bash
docker build -t my-app:1.0 .
docker build -f Dockerfile.prod -t my-app:1.0 .
docker build --pull --no-cache -t my-app:1.0 .
```

- `-t`：为镜像指定名称和标签。
- `-f`：指定 Dockerfile 路径。
- 最后的 `.`：构建上下文，即构建过程可以读取的文件范围。
- `--pull`：尝试拉取更新的基础镜像。
- `--no-cache`：不复用构建层缓存，不等同于更新基础镜像。

通过 `.dockerignore` 排除 `.git`、`node_modules`、本地日志和 `.env` 等不应进入构建上下文的文件。

### 打标签与推送

将下面的 `your-user` 替换成自己的 Docker Hub 用户名，并确保本地已有 `my-app:1.0`：

```bash
docker login
docker tag my-app:1.0 your-user/my-app:1.0
docker push your-user/my-app:1.0
docker logout
```

`tag` 为同一个镜像增加引用，不会复制一份镜像内容。推送到私有仓库时，镜像名要包含仓库地址，例如 `registry.example.com/team/my-app:1.0`。

### 离线保存与加载

```bash
docker image save -o my-app-1.0.tar my-app:1.0
docker image load -i my-app-1.0.tar
```

镜像迁移使用 `save/load`。`docker export` 导出的是容器文件系统，不包含挂载卷内容，也不保留完整镜像元数据，不能替代镜像或数据库备份。

## 三、启动与管理容器

### 启动一个 Nginx 服务

```bash
docker run -d \
  --name web \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  nginx:stable-alpine

curl http://127.0.0.1:8080
```

这里创建了名为 `web` 的容器，把本机 `8080` 端口映射到容器的 `80` 端口。

| 参数 | 含义 |
| --- | --- |
| `-d` | 后台运行 |
| `--name web` | 指定容器名称，同一 Engine 中不能重名 |
| `-p 127.0.0.1:8080:80` | 仅通过宿主机回环地址发布端口，适合本地开发 |
| `-e APP_ENV=development` | 向容器注入环境变量 |
| `--env-file .env` | 从文件读取环境变量 |
| `-w /app` | 设置容器内的工作目录 |
| `--restart unless-stopped` | 自动重启；手动停止后保持停止状态 |
| `--memory 512m` | 设置内存上限 |
| `--cpus 1.5` | 限制可使用的 CPU 时间，约相当于 1.5 个核心 |
| `--rm` | 退出后自动删除容器，适合临时任务 |
| `-it` | 保持标准输入并分配终端，适合交互操作 |

`-p 8080:80` 默认向宿主机所有网络接口发布端口；需要外部访问时再使用，并配合防火墙规则。Dockerfile 中的 `EXPOSE` 只是端口声明，不会自动发布端口。

`--env-file` 指向的文件需要提前创建。环境变量可能通过容器检查信息被读取，不应把生产密钥直接写入镜像或提交到代码仓库。

### 查看、停止与删除

以下命令展示不同操作，按需要选择：

```bash
docker ps                       # 仅查看运行中的容器
docker ps -a                    # 包括已退出的容器
docker ps --filter name=web      # 按名称过滤
docker stop web                 # 请求正常停止，超时后强制终止
docker start web                # 启动已有容器
docker restart web              # 重启已有容器
docker rm web                   # 删除已停止的容器
docker rm -f web                # 强制终止并删除容器，谨慎使用
```

`docker run` 创建新容器，`docker start` 启动已有容器。容器停止后仍然存在，名称也仍被占用。

更新镜像后，仅执行 `restart` 不会让已有容器使用新镜像，需要按原配置重新创建。端口映射、挂载和环境变量等配置通常也需要通过重建容器修改。

### 临时交互容器

```bash
docker run --rm -it alpine:3 sh
```

输入 `exit` 退出，容器随即删除。容器主进程结束后容器就会退出，`-d` 本身不会让已经结束的程序继续运行。`--rm` 不能与 `--restart` 同时使用。

## 四、日志与排查

```bash
docker logs --tail 100 web          # 最近 100 行日志
docker logs -f --tail 100 web       # 持续跟踪日志
docker logs --since 10m -t web      # 最近 10 分钟，附带时间戳
docker inspect web                 # 查看完整配置和运行状态
docker port web                    # 查看端口映射
docker stats --no-stream           # 查看资源使用快照
docker top web                     # 查看容器内进程
```

`docker logs` 主要查看容器标准输出和标准错误中的日志，是否可读还取决于日志驱动配置。应用只写入文件时，需要另行读取文件或配置日志采集。跟踪日志时按 `Ctrl+C` 只会退出查看，不会停止容器。

### 进入运行中的容器

```bash
docker exec -it web sh              # 打开一个新的 Shell
docker exec web nginx -t            # 检查 Nginx 配置
docker exec web nginx -s reload     # 重新加载 Nginx 配置
```

`exec` 要求容器处于运行状态。精简镜像不一定有 `bash`，可以尝试 `sh`；distroless 等镜像可能完全没有 Shell。`attach` 连接的是主进程输入输出，日常排查通常使用 `exec`。

### 复制文件

```bash
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
docker cp ./index.html web:/usr/share/nginx/html/index.html
```

第二条命令要求本地已有 `index.html`。直接复制到容器可写层的修改会随容器删除而丢失；长期配置应通过镜像或挂载管理。

### 提取状态信息

```bash
docker inspect --format '{{.State.Status}}' web
docker inspect --format '{{.State.ExitCode}}' web
docker inspect --format '{{.State.OOMKilled}}' web
```

退出码 `137` 表示进程被 `SIGKILL` 终止，可能是内存不足，也可能是手动强制结束；需要结合 `OOMKilled`、应用日志和宿主机日志判断。

## 五、数据卷与目录挂载

容器可写层在停止、启动后仍保留，但删除容器会丢失。需要跨容器保留的数据，应放到命名卷或宿主机目录中。

### 命名卷：由 Docker 管理

```bash
docker volume create redis-data
docker volume ls
docker volume inspect redis-data

docker run -d \
  --name cache \
  --mount type=volume,source=redis-data,target=/data \
  redis:7-alpine redis-server --appendonly yes
```

此例开启 Redis AOF 持久化，并将数据写入 `redis-data`。删除 `cache` 容器不会自动删除这个命名卷，重新挂载可继续使用；卷仍需要按业务要求备份。

### 绑定挂载：使用宿主机目录

先准备页面，再挂载到另一个 Nginx 容器：

```bash
mkdir -p html
printf '%s\n' '<h1>Hello Docker</h1>' > html/index.html

docker run -d \
  --name web-static \
  -p 127.0.0.1:8081:80 \
  --mount type=bind,source="$(pwd)/html",target=/usr/share/nginx/html,readonly \
  nginx:stable-alpine
```

访问 `http://127.0.0.1:8081` 可以看到本地页面。上面的 `printf` 会覆盖同名文件，适合在新建的演示目录执行。

`readonly` 表示容器只能读取挂载内容。绑定挂载会遮住镜像中目标目录的原有内容；使用 `--mount type=bind` 时，源目录应提前存在。远程 Engine 使用的是远程宿主机路径，不是客户端电脑上的路径。

## 六、容器网络

自定义 bridge 网络中的容器可以通过容器名相互访问：

```bash
docker network create app-net
docker network ls
docker network connect app-net cache
docker network inspect app-net

docker run --rm --network app-net \
  redis:7-alpine redis-cli -h cache ping
```

这里复用上一节创建的 `cache`，正常情况下返回 `PONG`。通信走容器端口 `6379`，不需要先用 `-p` 发布到宿主机。

```bash
docker network disconnect app-net cache
docker network rm app-net
```

容器中的 `localhost` 指向容器自己。访问同一网络中的其他服务应使用容器名或 Compose 服务名；访问宿主机时，Docker Desktop 通常可以使用 `host.docker.internal`，Linux Engine 则可能需要额外配置主机映射。

## 七、Docker Compose 管理多个服务

Compose 用一个 YAML 文件描述服务、网络和数据卷。新项目使用 `docker compose`；`docker-compose` 是旧版独立命令的常见写法。

在单独的演示目录创建 `compose.yaml`，其中 Web 和 Redis 为两个独立的演示服务：

```yaml
services:
  web:
    image: nginx:stable-alpine
    ports:
      - "127.0.0.1:8082:80"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  redis-data:
```

在该目录中按需执行：

```bash
docker compose config              # 检查并显示解析后的配置
docker compose up -d               # 创建并后台启动服务
docker compose ps -a               # 查看服务容器状态
docker compose logs -f --tail 100   # 查看全部服务日志
docker compose logs -f web         # 查看指定服务日志
docker compose exec web sh         # 进入 web 服务容器
docker compose exec redis redis-cli ping
docker compose stop               # 停止服务，保留容器
docker compose start              # 启动已创建的服务容器
docker compose restart web        # 重启 web 服务
docker compose down               # 删除服务容器和项目网络，默认保留命名卷
```

Compose 默认创建项目网络，服务之间通过 `web`、`redis` 等服务名通信。命名卷通常带有项目名前缀，与前面手动创建的 `redis-data` 并不是同一个卷。

### 更新服务

```bash
docker compose pull
docker compose up -d
```

`pull` 下载镜像，`up -d` 根据镜像或配置变化重新创建需要更新的容器。`restart` 不会应用 `compose.yaml` 中修改的环境变量等配置。

如果服务配置了 `build:`，则使用：

```bash
docker compose up -d --build
```

`depends_on` 的普通写法仅控制启动顺序，不保证依赖服务已经可用。需要等待数据库就绪时，应配置 `healthcheck`、`condition: service_healthy`，并让应用具备连接重试能力。

## 八、磁盘占用与资源清理

先查看占用，再选择清理范围：

```bash
docker system df
docker system df -v
```

下面的命令是不同清理选项，不是需要依次执行的脚本：

| 命令 | 清理范围 |
| --- | --- |
| `docker container prune` | 所有已停止的容器，容器可写层数据随之删除 |
| `docker image prune` | 悬空镜像，即无标签且不被容器引用的镜像 |
| `docker image prune -a` | 所有未被任何容器引用的镜像 |
| `docker builder prune` | 构建缓存，后续构建可能变慢 |
| `docker network prune` | 未被容器使用的自定义网络 |
| `docker system prune` | 停止的容器、未使用的网络、悬空镜像和未使用的构建缓存，默认不删除卷 |

停止的容器也会引用镜像和卷，所以先删除容器会改变后续清理的范围。清理前阅读命令提示，日常操作不必加 `-f` 跳过确认。

### 删除数据卷

**以下操作会删除持久化数据，执行前确认备份与目标。** “未使用”只代表没有容器引用，不代表数据没有价值。

```bash
docker volume rm redis-data       # 删除指定卷，要求没有容器引用
docker volume prune               # 清理未使用的匿名卷（现代 Docker Engine）
docker volume prune -a            # 包括未使用的命名卷，需较新版本支持
docker compose down -v            # 删除项目容器及声明的命名卷、附带的匿名卷
```

Compose 声明为 `external` 的卷不会被 `down -v` 删除。不同版本的卷清理参数可能不同，先用 `docker volume prune --help` 确认。

## 九、常见问题速查

| 现象 | 优先检查 |
| --- | --- |
| 无法连接 Docker daemon | Docker Desktop 或 Engine 是否启动，当前 context 是否正确 |
| 容器名已被占用 | `docker ps -a`；启动已有容器、删除旧容器或换名称 |
| 容器启动后立即退出 | `docker logs`、退出码；确认主进程持续在前台运行 |
| 浏览器无法访问服务 | `docker ps`、`docker port`；检查端口映射和应用监听地址 |
| 容器之间无法连接 | 是否在同一网络，是否使用服务名和容器端口 |
| 修改配置没有生效 | 是否需要重载应用或重新创建容器，挂载路径是否正确 |
| 磁盘空间不足 | `docker system df -v`，区分镜像、缓存、容器可写层与卷 |
| 提示没有匹配的镜像架构 | 确认镜像是否支持当前平台，如 `linux/arm64` 或 `linux/amd64` |

容器内的 Web 应用通常应监听 `0.0.0.0`。如果只监听容器内的 `127.0.0.1`，即使发布了端口，宿主机也可能无法通过映射访问。

## 参考资料

- [Docker CLI 命令参考](https://docs.docker.com/reference/cli/docker/)
- [docker run 参数说明](https://docs.docker.com/reference/cli/docker/container/run/)
- [Docker 数据存储](https://docs.docker.com/engine/storage/)
- [Docker 网络](https://docs.docker.com/engine/network/)
- [Docker Compose 命令参考](https://docs.docker.com/reference/cli/docker/compose/)
