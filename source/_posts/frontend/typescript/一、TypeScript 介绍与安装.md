---
title: 一、TypeScript 介绍与安装
tags: TypeScript
categories:
  - TypeScript
comments: false
cover: /img/covers/tech-typescript.png
abbrlink: ts02
date: 2021-01-01 13:00:00
updated: 2021-01-01 13:00:00
top_img:
---

TypeScript 是加上类型检查的 JavaScript，能在运行前发现传错参数、访问不存在的属性等问题。类型检查不会替代运行时的数据校验。

```typescript
function greet(name: string): string {
  return `你好，${name}`;
}

greet("小明");
// greet(123); // 报错：参数需要 string
```

这个系列用五篇介绍日常开发需要的知识。示例以 TypeScript 4.1 为基线，开启 `strict`；各代码块独立练习，多文件示例会标明路径。

## 安装

准备好 Node.js 和 npm，在终端执行：

```bash
mkdir ts-demo
cd ts-demo
npm init -y
npm install --save-dev typescript@4.1.3
npx tsc --init
```

固定版本是为了复现本文环境，新项目应使用工具链支持的版本。编译器安装在项目内，`npx tsc` 调用该版本，无需全局安装。

## 配置

把生成的 **`tsconfig.json`** 改成：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "noEmitOnError": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

| 配置 | 作用 |
| --- | --- |
| `target` | 输出 JavaScript 的语法目标 |
| `module` | 模块输出格式；这里用 CommonJS |
| `strict` | 开启严格类型检查 |
| `noEmitOnError` | 有错误时不生成本轮产物 |
| `rootDir` / `outDir` | 源文件目录 / 输出目录 |
| `include` | 查找参与编译的入口文件 |

这套配置用于 Node.js 的 CommonJS 练习项目，`package.json` 不设置 `"type": "module"`。框架项目优先使用框架提供的配置。

## 编译与运行

创建 `src/index.ts`：

```typescript
const message: string = "hello TypeScript";
console.log(message);
export {};
```

`export {}` 让练习文件拥有独立作用域，避免多个文件中的同名变量冲突。其他独立练习文件也可以在末尾加上这一行。

```bash
npx tsc
node dist/index.js
```

第一条命令检查类型并生成 JavaScript，第二条执行程序，输出 `hello TypeScript`。

常用命令：

```bash
npx tsc --noEmit  # 只检查类型
npx tsc --watch   # 修改后自动重新编译，不会自动运行程序
```

**项目编译不要传源文件名。** `tsc src/index.ts` 会绕过 `tsconfig.json`；使用 `tsc` 或 `tsc -p tsconfig.json` 才会按项目配置编译。

## 系列目录

1. [介绍与安装](/article/ts02.html)
2. [基础类型](/article/ts03.html)
3. [接口与函数](/article/ts04.html)
4. [泛型与常用工具类型](/article/ts05.html)
5. [项目实践](/article/ts06.html)
