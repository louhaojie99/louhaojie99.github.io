---
title: 【基础积累】typescript 介绍与安装
tags: typescript
categories:
  - 【基础积累】
  - typescript
comments: false
cover: https://img0.baidu.com/it/u=4167016203,3166254551&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=311
abbrlink: 84fa722f
date: 2022-01-01 00:00:00
top_img:
---

## typescript 简介

> TypeScript 是由微软公司在 2012 年正式发布，现在也有 8 年的不断更新和维护了，TypeScript 的成长速度是非常快的，现在已经变成了前端必会的一门技能。TypeScript 其实就是 JavaScript 的超集，也就是说 TypeScript 是建立在 JavaScript 之上的，最后都会转变成 JavaScript。真的好用，比如说它的扩展语法、面向对象、静态类型。如果一个前端项目我可以做主，我会在强烈的要求所有人都使用 TypeScript 的语法进行编程。

## ts 安装与编译

- 第一步 新建一个空文件夹用来学习 ts

- 第二步 全局安装 ts 和 ts-node

```bash
npm i typescript -g 	// 全局安装ts
npm i -g ts-node 		// 全局安装ts-node
```

- 第三步 生成 tsconfig.js 配置文件

```bash
tsc --init
```

我们就先按照自动生成的 tsconfig 配置项去使用 里面的配置咱们可以先不去管它 后续熟练了再去配置

- 第四步 在项目下新建一个`index.ts`直接写入

```typescript
const a: string = "hello";
console.log(a);
```

- 第五步 编译 ts 为 js 在控制台（终端）输入命令

```bash
tsc index.ts
```

神奇的事情发生了 项目下出现了一个同名的 index.js 文件 至此我们已经可以把 ts 文件编译成 js 文件了

不过到这里聪明的小伙伴就会发现了 我们全局安装的 「ts-node」 有什么作用呢 其实这个包是帮助我们在不需要编译成 js 的前提下就可以直接执行 ts 代码 比如 我们在控制台输入

```bash
ts-node index.ts
```

可以看到我们打印的`hello`已经输出了

那可能 还有的小伙伴会发现 我们每次改动都要手动去执行编译 这样很麻烦 其实我们可以加一个参数来实现每次文件变动 ts 帮我们「自动编译成 js」 的效果

```bash
tsc --watch index.ts
```

好了 环境安装完毕了 接下来出发去学习 ts 核心吧
