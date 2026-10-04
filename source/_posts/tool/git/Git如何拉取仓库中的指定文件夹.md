---
title: Git 如何拉取仓库中的指定文件夹
date: 2026-10-04 00:00:00
updated: 2026-10-04 00:00:00
tags:
  - git
categories:
  - git
comments: false
cover: /img/covers/tech-git.png
top_img: /img/covers/tech-git.png
abbrlink: git-sparse-checkout
description: 使用 sparse-checkout 配合部分克隆，只检出 Git 仓库中需要的文件夹，并了解后续更新、多目录选择与常见误区。
toc: true
---

遇到一个很大的 Git 仓库，只想看其中的文档，或者只需要 monorepo 中的某个子项目，有没有办法不用把所有文件都拉下来？

可以使用 **稀疏检出（sparse-checkout）**，让工作区只保留需要的目录；再配合 **部分克隆（partial clone）**，减少首次下载的文件内容。两者组合，适合“只取一个文件夹，但还要继续通过 Git 更新”的场景。

<!-- more -->

## 先分清：检出范围和下载范围

Git 管理的是仓库与提交，不能把子目录当成一个独立仓库直接克隆。下面这几个选项解决的是不同问题：

| 命令或选项 | 作用 | 需要注意 |
| --- | --- | --- |
| `git sparse-checkout` | 控制工作区显示哪些目录和文件 | 单独使用不会减少已经下载的仓库对象 |
| `git clone --filter=blob:none` | 暂不下载文件内容对象，等需要时再获取 | 需要服务端支持过滤，仍会下载提交、目录树等对象 |
| `git clone --depth=1` | 只获取浅层提交历史 | 不负责筛选目录，会限制历史查询等操作 |
| `git clone --no-checkout` | 克隆完成后暂不展开工作区文件 | 留出先配置稀疏检出、再检出文件的机会 |

因此，“工作区只有部分目录”不等于“网络只传输了这些目录的数据”，`.git` 目录也仍然存在。

## 从零开始：只拉取指定文件夹

假设仓库地址是 `https://github.com/example/project.git`，目标分支是 `main`，只需要 `docs/guide` 目录。下面的地址、分支和路径都需要替换成实际值。

建议使用 Git 2.25 或更新版本；本文命令采用较新版本的用法，实际使用推荐安装当前稳定版。先检查版本：

```bash
git --version
```

执行以下命令：

```bash
# 1. 克隆目标分支，暂不检出文件，并延迟下载文件内容
git clone --filter=blob:none --no-checkout --single-branch --branch main https://github.com/example/project.git project

# 2. 进入本地仓库
cd project

# 3. 使用 cone 模式，选择需要的目录
git sparse-checkout set --cone docs/guide

# 4. 检出当前分支的文件
git checkout main
```

`--single-branch` 将初始克隆和默认后续抓取范围限定到选定分支；这里没有使用 `--depth`，会保留该分支可达的提交历史，但历史文件内容可能需要联网按需获取。

`git sparse-checkout set` 会配置稀疏检出，并在适用时更新工作区；最后的 `git checkout main` 明确完成目标分支的检出。检查当前选择的目录：

```bash
git sparse-checkout list
```

输出：

```text
docs/guide
```

这里的 `docs/guide` 是**相对于仓库根目录的路径**，不是 GitHub 网页地址，也不需要加上本地仓库名 `project/`。

### 为什么根目录还有 README？

`--cone` 按目录选择内容，除了目标目录及其全部子目录，还会保留仓库根目录、目标目录各级父目录中的直接文件。例如选择 `docs/guide` 后，工作区可能是：

```text
project/
├── .git/
├── README.md           # 根目录的文件会保留
├── package.json        # 根目录的文件会保留
└── docs/
    ├── README.md       # 父目录中的直接文件会保留
    └── guide/          # 目标目录中的全部内容
```

这属于 cone 模式的正常行为。`docs/api`、`src` 等未选择的其他目录不会因此完整展开。

### 只需要最新版本，不需要完整历史

可以在克隆命令中额外添加 `--depth=1`，然后继续执行上面的进入仓库、选择目录和检出步骤：

```bash
git clone --depth=1 --filter=blob:none --no-checkout --single-branch --branch main https://github.com/example/project.git project
```

这适合临时阅读代码、获取文档等场景。浅克隆会影响 `git log`、`git blame` 和需要较早历史的操作；后续需要补全当前浅克隆的历史时，可以执行：

```bash
git fetch --unshallow
```

补全历史不会自动恢复所有远程分支的跟踪配置，也不会一次性下载部分克隆中所有历史文件的内容。

## 已经克隆的仓库怎么处理？

如果仓库已经完整克隆，可以直接缩小工作区范围。在仓库根目录执行：

```bash
# 先检查本地修改，提交或妥善保存后再调整目录范围
git status

git sparse-checkout set --cone docs/guide
```

这样可以减少工作区中展开的文件，但**不会清除 `.git` 中已经下载的对象**，也不会追溯节省首次克隆的流量。已有修改或未跟踪文件可能影响目录收起，遇到提示时应先处理这些文件。

## 选择多个目录与调整范围

一次选择多个目录：

```bash
git sparse-checkout set --cone docs/guide packages/shared
```

在现有范围上追加目录：

```bash
git sparse-checkout add apps/web
```

重新设置范围，只保留文档目录：

```bash
git sparse-checkout set --cone docs/guide
```

`set` 会替换已有选择，`add` 会追加选择。路径含空格时需要加引号，例如 `git sparse-checkout add "docs/user guide"`。

## 后续如何更新代码？

对于前面克隆并跟踪远程 `main` 的示例，在本地修改已处理的情况下执行：

```bash
git pull --ff-only
```

Git 会抓取当前分支配置的上游更新，并按照已有的稀疏规则更新工作区。`--ff-only` 只允许快进更新；如果本地与远程历史已经分叉，命令会停止，需要根据项目约定处理合并或变基。

需要注意：这依然是在更新分支，**不是只合并某个文件夹的提交**。稀疏检出影响工作区范围，不会把仓库历史裁剪成一个子目录的历史。

选择的目录中可以正常修改、提交和推送，但子项目运行时可能依赖其他目录。比如 `apps/web` 依赖 `packages/shared`，就需要将依赖目录一起加入。

## 恢复完整工作区

需要查看所有目录时，先处理本地修改，然后执行：

```bash
git sparse-checkout disable
```

这会恢复当前提交的完整工作区。如果之前使用了 `--filter=blob:none`，Git 会按需下载缺少的文件内容，因此可能产生较大的网络传输。

此操作不会补全浅克隆的历史，也不会自动抓取所有其他分支。

## 常见问题

### 能直接克隆 GitHub 上的文件夹链接吗？

不能把 `https://github.com/example/project/tree/main/docs/guide` 当作仓库 URL 交给 `git clone`。应使用仓库地址克隆，再通过 `sparse-checkout` 选择目录。

### `git pull origin main docs/guide` 能只更新目录吗？

不能。`git pull` 的这些参数用于指定远程和引用，不是目录筛选条件。应先配置稀疏检出，再正常更新分支。

### 为什么配置了过滤，下载量还是很大？

如果出现 `filtering not recognized by server, ignoring`，说明服务端没有支持当前过滤请求，克隆可能退回下载完整对象。稀疏检出仍能限制工作区范围，但无法保证节省下载量。

即便服务端支持过滤，提交历史、目录树、cone 模式保留的文件和目标目录本身也会占用空间。Git LFS 与子模块还有各自的获取机制，不能仅凭这组命令判断总下载量。

### 能只选择一个文件吗？

cone 模式面向目录，不适合精确筛选单个文件。精确文件匹配需要使用 `--no-cone` 模式及相应的匹配规则，规则维护和性能特点都不同。只需要文件夹时，优先使用本文的 cone 模式。

## 参考资料

- [Git sparse-checkout 官方文档](https://git-scm.com/docs/git-sparse-checkout)
- [Git clone 官方文档](https://git-scm.com/docs/git-clone)
- [Git 部分克隆说明](https://git-scm.com/docs/partial-clone)
