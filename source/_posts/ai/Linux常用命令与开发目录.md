---
title: Linux 常用命令、目录、环境变量与 SSH 私钥
date: 2026-01-02 00:00:00
updated: 2026-01-02 00:00:00
tags:
  - Linux
  - Shell
  - SSH
categories:
  - 【开发基础】
  - Linux
comments: false
abbrlink: 82781b43
description: Linux 常用命令、目录、环境变量与 SSH 私钥。
---

本文是一份面向开发工作的 Linux 速查手册，不追求收录所有命令，只保留高频、实用、值得记住的部分。示例默认使用 Bash；不同发行版、macOS 和 BusyBox 的个别参数可能不同，拿不准时先看帮助：

```bash
man command
command --help
type command          # 判断是命令、别名、函数还是 Shell 内建命令
command -v node       # 查看实际执行的程序路径
```

## 一、目录与文件

### 目录操作

| 命令 | 作用 |
| --- | --- |
| `pwd` | 显示当前目录 |
| `ls -lah` | 查看文件、权限、大小和隐藏文件 |
| `cd /path` | 进入指定目录 |
| `cd ~` | 返回当前用户家目录 |
| `cd -` | 返回上一次所在目录 |
| `mkdir -p logs/app` | 创建多级目录 |

路径中，`~` 表示家目录，`.` 表示当前目录，`..` 表示上一级目录，`/` 表示文件系统根目录。

### 文件操作

```bash
touch app.log                       # 创建空文件或更新时间
cp config.example.yml config.yml    # 复制文件
cp -r public public-backup          # 复制目录
mv old.txt new.txt                  # 移动或重命名
rm app.log                          # 删除文件
rm -r old-directory                 # 删除目录
ln -s /opt/myapp/current myapp      # 创建软链接
```

`rm` 默认没有回收站。使用 `rm -rf` 前先用 `pwd` 和 `ls` 确认当前位置和目标。

### 查看文件

```bash
cat package.json              # 查看短文件
less app.log                  # 分页查看，/ 搜索，q 退出
head -n 20 app.log            # 前 20 行
tail -n 50 app.log            # 最后 50 行
tail -f app.log               # 持续查看日志
wc -l app.log                 # 统计行数
stat app.log                  # 查看大小、权限和修改时间
```

### 搜索文件和内容

```bash
find . -name "*.ts"                  # 按名称找文件
find . -type f -size +100M           # 查找大于 100 MB 的文件
find logs -type f -mtime -7          # 查找 7 天内修改的文件
grep -Rni "TODO" src                # 递归搜索文本
grep -v "DEBUG" app.log             # 排除匹配行
rg "TODO|FIXME" src                 # 在代码仓库中快速搜索
```

`rg`（ripgrep）速度快且默认遵守 `.gitignore`，开发中通常比 `grep -R` 更顺手。

## 二、管道与重定向

```bash
command > output.log          # 覆盖写入
command >> output.log         # 追加写入
command 2> error.log          # 错误输出写入文件
command > all.log 2>&1        # 普通输出和错误写入同一文件
command1 | command2           # 把前一条命令的输出交给后一条
command1 && command2          # 前一条成功才继续
command1 || command2          # 前一条失败才继续
echo $?                       # 查看上一条命令退出码，0 通常表示成功
```

常见组合：

```bash
ps aux | grep '[n]ginx'
sort access.log | uniq -c | sort -nr
du -ah . | sort -h | tail -n 20
```

## 三、权限与用户

`ls -l` 中的 `r`、`w`、`x` 分别代表读取、写入、执行，权限依次属于文件所有者、所属组和其他用户。

```bash
chmod u+x deploy.sh          # 增加执行权限
chmod 644 config.yml         # rw-r--r--，常用于普通文件
chmod 755 deploy.sh          # rwxr-xr-x，常用于脚本和目录
chmod 600 secret.env         # rw-------，仅所有者可读写
chown alice:dev app.log      # 修改所有者和所属组
whoami                       # 当前用户名
id                           # 当前用户、UID 和所属组
sudo command                 # 使用管理员权限执行命令
```

不要用 `chmod -R 777` 粗暴解决权限问题。通常应该检查运行用户、文件所有者和真正需要的权限。

## 四、进程、端口与系统资源

### 进程

```bash
ps aux                       # 查看进程快照
top                          # 动态查看进程和资源
pgrep -af node               # 按名称查找进程
kill 12345                   # 请求进程正常退出
kill -KILL 12345             # 强制结束，最后手段
jobs                         # 查看当前 Shell 的后台任务
command &                    # 后台执行
nohup command > app.log 2>&1 &
```

正式服务更适合交给 systemd、Docker 或专门的进程管理工具，不建议长期依赖 `nohup`。

### 网络与端口

```bash
ip addr                        # 查看 IP 地址
ip route                       # 查看路由
ss -lntp                       # 查看监听中的 TCP 端口和进程
lsof -i :3000                  # 查看占用 3000 端口的进程
ping -c 4 example.com          # 测试连通性
curl -I https://example.com    # 查看 HTTP 响应头
curl -v https://example.com    # 查看请求、TLS 和响应细节
dig example.com                # 查询 DNS
```

### 磁盘与内存

```bash
df -h                         # 文件系统剩余空间
du -sh .                      # 当前目录大小
du -h --max-depth=1 /var      # /var 下一级目录大小
free -h                       # 内存和 Swap
uptime                        # 运行时间和系统负载
```

### systemd 服务与日志

```bash
systemctl status nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
journalctl -u nginx -n 100
journalctl -u nginx -f
journalctl --since "30 min ago"
```

不是所有 Linux 系统都使用 systemd，遇到命令不存在时需查看发行版使用的服务管理工具。

## 五、压缩与解压

```bash
tar -czf project.tar.gz project/     # 打包并压缩
tar -tzf project.tar.gz              # 查看压缩包内容
tar -xzf project.tar.gz              # 解压
tar -xzf project.tar.gz -C /tmp      # 解压到指定目录
zip -r project.zip project/
unzip project.zip
```

## 六、开发中常见目录

Linux 的所有文件都位于 `/` 这棵目录树中。

| 目录 | 开发中常见用途 |
| --- | --- |
| `/home/<user>` | 普通用户家目录，常用于存放代码和个人配置 |
| `/root` | root 用户的家目录，不等同于 `/` |
| `/etc` | 系统和服务配置，如 Nginx、SSH、`hosts` |
| `/usr/bin` | 系统安装的大多数命令 |
| `/usr/local/bin` | 手动安装的工具和自建脚本 |
| `/opt` | 独立部署的第三方程序 |
| `/var/log` | 系统和服务日志 |
| `/var/lib` | 数据库、包管理器等应用状态数据 |
| `/tmp` | 临时文件，可能被系统自动清理 |
| `/run` | PID、Socket 等本次启动期间的运行数据 |
| `/proc` | 内核和进程信息，如 `/proc/<PID>` |
| `/dev` | 磁盘、终端等设备文件 |
| `/mnt`、`/media` | 磁盘和可移动介质挂载点 |

家目录中常见的开发配置：

```text
~/.ssh/              SSH 密钥和配置
~/.config/           用户级应用配置
~/.cache/            用户级缓存
~/.local/bin/        用户安装的命令
~/.gitconfig         Git 用户配置
~/.bashrc            Bash 交互式配置
~/.zshrc             Zsh 交互式配置
```

项目通常放在 `~/projects/my-app`，不要把代码长期放在 `/root`、`/tmp` 或系统目录中。

## 七、环境变量

```bash
APP_ENV=development           # 当前 Shell 变量
export APP_ENV=development    # 导出后，子进程也能读取
echo "$APP_ENV"
printenv APP_ENV
env                           # 查看全部环境变量
unset APP_ENV
APP_ENV=test npm test         # 只对这一条命令生效
```

推荐使用 `${变量名}` 明确边界：

```bash
echo "${PROJECT_DIR}/dist"
echo "${APP_PORT:-3000}"      # 变量为空时使用默认值 3000
```

### PATH

输入命令时，Shell 会按 `PATH` 从左到右查找可执行文件：

```bash
echo "$PATH"
command -v node
export PATH="$HOME/.local/bin:$PATH"
```

直接执行 `export` 只对当前终端有效。需要持久化时，写入当前 Shell 的配置文件，然后新开终端或重新加载：

```bash
# Bash：~/.bashrc
# Zsh：~/.zshrc
source ~/.bashrc
```

systemd、CI、IDE 和 SSH 非交互会话不一定读取这些文件，因此“终端里存在的变量”不代表服务也能读取。

### `.env`

```dotenv
APP_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/app
```

`.env` 是普通文本，不会自动加密。应将它加入 `.gitignore`，仓库只提交 `.env.example`；生产密钥应通过部署平台或 Secret 管理系统注入。

## 八、SSH 与私钥

SSH 密钥成对出现：私钥保存在自己的设备上，公钥放到需要验证身份的服务器或 Git 平台。**没有 `.pub` 后缀的通常是私钥，不能分享、上传或提交到 Git。**

### 生成密钥

```bash
ssh-keygen -t ed25519 -C "alice@example.com"

# 为公司账号使用单独文件
ssh-keygen -t ed25519 -C "work-laptop" -f ~/.ssh/id_ed25519_work
```

建议为私钥设置口令。常见文件及权限：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/authorized_keys
```

### 添加公钥并连接

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server.example.com
ssh user@server.example.com
ssh -p 2222 user@server.example.com
ssh -i ~/.ssh/id_ed25519_work user@server.example.com
ssh -v user@server.example.com       # 调试连接
```

首次连接时应通过可信渠道核对服务器指纹。主机密钥发生变化时，也要先确认服务器是否重装或更换密钥。

### 管理多台服务器

编辑 `~/.ssh/config`：

```sshconfig
Host dev-api
  HostName 192.0.2.10
  User deploy
  Port 2222
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes
```

以后直接执行：

```bash
ssh dev-api
```

`IdentitiesOnly yes` 可以避免客户端尝试 agent 中的其他密钥。

### ssh-agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_work
ssh-add -l                     # 查看已加载密钥
ssh-add -D                     # 移除全部密钥
```

### 传输文件

```bash
scp app.tar.gz user@server:/tmp/
scp user@server:/var/log/app.log ./
rsync -avz --progress dist/ user@server:/srv/app/
```

## 九、常见排障思路

### 服务无法访问

```bash
pgrep -af app-name                    # 进程是否存在
ss -lntp                              # 端口是否监听
curl -v http://127.0.0.1:3000         # 本机是否可以访问
journalctl -u app-name -n 100         # 服务日志
```

以上均正常时，再检查防火墙、云安全组、容器端口映射、DNS 和反向代理。

### 命令不存在

```bash
command -v node
echo "$PATH"
```

确认程序是否安装、安装目录是否位于 `PATH`，以及当前会话是否重新加载了 Shell 配置。

### 端口被占用

```bash
lsof -i :3000
ps -fp <PID>
kill <PID>
```

### SSH 提示 `Permission denied (publickey)`

```bash
ssh -v dev-api
ssh-add -l
ls -ld ~/.ssh
ls -l ~/.ssh
```

检查远端用户名、实际使用的私钥、公钥是否已加入对应用户的 `authorized_keys`，以及 `.ssh` 和私钥权限。

## 参考资料

- [Filesystem Hierarchy Standard 3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [OpenSSH：ssh-keygen(1)](https://man.openbsd.org/ssh-keygen)
- [OpenSSH：ssh_config(5)](https://man.openbsd.org/ssh_config.5)

