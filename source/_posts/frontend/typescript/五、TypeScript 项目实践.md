---
title: 五、TypeScript 项目实践
tags: TypeScript
categories:
  - TypeScript
comments: false
cover: /img/covers/tech-typescript.png
abbrlink: ts06
date: 2021-01-04 13:00:00
updated: 2021-01-04 13:00:00
top_img:
---

把前四篇用到项目中，重点处理三件事：拆分模块、检查外部数据、把类型检查接入构建。

## 拆分模块

`src/user.ts`：

```typescript
export interface User {
  id: number;
  name: string;
}

export function formatUser(user: User): string {
  return `${user.id}：${user.name}`;
}
```

`src/index.ts`：

```typescript
import { formatUser } from "./user";
import type { User } from "./user";

const user: User = { id: 1, name: "小明" };
console.log(formatUser(user));
```

普通导入用于运行时需要的值，`import type` 只导入类型，编译后会被移除。带有顶层导入或导出的文件具有独立模块作用域。

## 第三方库的类型从哪里来

按这个顺序查找：

1. 库自带 `.d.ts` 声明文件，通常直接使用即可。
2. 没有自带声明时，查找与库版本兼容的 `@types/包名`。
3. 两者都没有时，为实际使用的 API 补最小声明。

例如已有本地模块 `src/legacy-format.js`，确实导出了 `formatPrice`，可以在同目录创建 `legacy-format.d.ts`：

```typescript
export declare function formatPrice(amount: number): string;
```

声明文件描述接口，不提供实现。运行时仍需真实的 JavaScript 模块，构建时也要将其复制或打包到产物中。

## 请求结果先校验，再使用

给 JSON 写上 `as User` 不会检查字段。下面是一个独立的浏览器示例：先把响应接收为 `unknown`，再检查用户编号和名字。

```typescript
interface User {
  id: number;
  name: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseUser(value: unknown): User {
  if (!isRecord(value)) {
    throw new Error("用户数据必须是对象");
  }
  const { id, name } = value;
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0) {
    throw new Error("用户编号必须是正的安全整数");
  }
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("用户名不能为空");
  }
  return { id, name };
}

async function loadUser(url: string): Promise<User> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const raw: unknown = await response.json();
  return parseUser(raw);
}

async function showUser(): Promise<void> {
  try {
    const user = await loadUser("/api/users/1");
    console.log(user.name);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "加载失败");
  }
}
```

`Promise<User>` 表示成功时得到 `User`。网络失败、HTTP 错误、JSON 解析失败和校验失败，都会进入调用处的 `catch`。`fetch` 遇到 404、500 不会自动拒绝，所以需要检查 `response.ok`。

示例需要支持 `fetch` 的浏览器和真实接口，成功响应应直接返回用户 JSON。替换地址后调用 `showUser()`；暂时没有接口时，可以直接验证解析器：

```typescript
// 接在上面的代码后运行
console.log(parseUser({ id: 1, name: "小明" })); // 通过
// parseUser({ id: "1", name: "小明" }); // 抛错：编号类型不符
// parseUser(null); // 抛错：不是对象
```

解析器返回新对象，只保留需要的字段。数据结构复杂时可以引入校验库，但类型声明与运行时规则仍需保持一致。

## 把类型检查放进构建流程

第一篇由 `tsc` 输出 JavaScript；如果打包工具负责输出，可以让 TypeScript 只检查类型。在已有 `package.json` 的 `scripts` 中加入：

```json
{
  "typecheck": "tsc --noEmit"
}
```

本地和持续集成都执行 `npm run typecheck`。开发服务器能启动、打包成功，不代表类型检查一定通过。

遇到配置问题，先检查这三点：

- **环境声明**：浏览器通常使用 `lib: ["ES2020", "DOM"]`；Node.js 项目使用与编译器兼容的 `@types/node`。声明不会补装运行时 API。
- **路径别名**：`paths` 帮助编译器找文件，不会改写输出中的导入路径，打包工具或运行环境也需要支持。
- **实际配置**：使用 `npx tsc --showConfig` 查看最终配置，编辑器与命令行使用同一项目版本。

上一篇：[泛型与常用工具类型](/article/ts05.html) · [系列目录](/article/ts02.html)
