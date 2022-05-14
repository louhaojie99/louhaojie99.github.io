---
title: 【基础积累】包管理工具（pnpm）
tags: pnpm
categories:
  - 【基础积累】
  - pnpm
comments: false
cover: "https://doc.houdunren.com/assets/img/image-20220402214722541.a35c4246.png"
abbrlink: d4c1ef6f
date: 2022-01-03 00:00:00
top_img:
---

## 简介

[pnpm (opens new window)](https://pnpm.io/zh/installation)含义为 performant npm 意指『高性能的 npm』，与 npm 一样的都是软件包管理工具。pnpm 比其他包管理器快 2 倍

## 国内源

设置国内源可以软件下载速度，使用 nrm 命令可以快速设置国内源。

## nrm

nrm 命令可以方便的设置镜像，首先安装命令。如果安装不成功，可以先按上面步骤将 npm 手动设置为淘宝源。

```bash
npm install -g nrm
```

## 常用命令

**镜像列表**

```text
nrm ls
```

结果如下

```text
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
```

**设置淘宝源**

```text
nrm use taobao
```

**查看当前源**

```text
pnpm config get registry
```

## 常用命令

下面介绍 pnpm 常用命令的使用。

## 安装软件

全局安装

```text
pnpm add -g <Module Name>
```

为当前项目安装软件包

```text
pnpm add <Module Name>
```

根据 package.json 安装软件

```text
pnpm install
# 或
pnpm i
```

**生产环境**

- 在 package.json 文件 dependencies 属性下增加记录
- pnpm install 时会自动安装该软件包
- 使用 pnpm install --production 或者 NODE_ENV 变量值为 production 时，安装该软件包

```text
pnpm add <Module Name>
```

**开发环境**

- 在 package.json 文件 devDependencies 属性下增加记录
- pnpm install 时会自动安装该软件包
- 使用 pnpm install --production 或者 NODE_ENV 变量值为 production 时，不会安装该软件包

```text
pnpm add -D <Module Name>
```

## 查看软件

列出项目的依赖

```text
pnpm ls
# 或
pnpm list
```

查看本地已安装的包信息

```text
pnpm ls tailwindcss
或
pnpm ls | grep tailwindcss
```

查看包信息

```text
pnpm info tailwindcss
或
pnpm view tailwindcss
```

列出项目的依赖，并限制显示的依赖深度

```text
pnpm list --depth=2
```

## 更新软件

更新 pnpm 自身

```text
pnpm add -g pnpm
```

更新所有软件包

```text
pnpm update
# 或
pnpm up
```

更新指定软件包

```text
pnpm update <Module Name>
```

## 卸载软件

删除全局软件

```text
pnpm uninstall -g <Module Name>
# 或
pnpm rm -g <Module Name>
# 或
pnpm un  -g <Module Name>
```

删除项目中软件包

```text
pnpm un <Module Name>
```
