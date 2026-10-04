---
title: 四、TypeScript 泛型与常用工具类型
tags: TypeScript
categories:
  - TypeScript
comments: false
cover: /img/covers/tech-typescript.png
abbrlink: ts05
date: 2021-01-03 13:00:00
updated: 2021-01-03 13:00:00
top_img:
---

泛型用于复用类型之间的关系，工具类型用于从已有类型生成新类型。它们能减少重复，也能保留具体的类型信息。

## 泛型：让输入与输出保持关联

```typescript
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const name = first(["小明", "小林"]); // string | undefined
const score = first([90, 80]); // number | undefined
```

`T` 是类型参数，通常由调用参数推断。如果改成 `any[]`，返回值也会失去类型信息。这里保留 `undefined`，因为数组可能为空。

泛型也常用于复用响应结构：

```typescript
interface Page<T> {
  list: T[];
  total: number;
}

interface User {
  id: number;
  name: string;
}

const page: Page<User> = {
  list: [{ id: 1, name: "小明" }],
  total: 1,
};
```

## 泛型约束：extends 与 keyof

读取对象字段时，希望键必须存在，返回值也对应这个键：

```typescript
function getProperty<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

const user = { id: 1, name: "小明" };
const name = getProperty(user, "name"); // string
// getProperty(user, "email"); // 报错：不存在这个键
```

`keyof T` 取得键的类型，`K extends keyof T` 限制可选的键，`T[K]` 取得对应属性的类型。泛型的价值就在于保留这些关系，而不只是让参数接受更多类型。

## 常用工具类型

| 工具类型 | 用途 |
| --- | --- |
| `Partial<T>` | 属性变为可选 |
| `Required<T>` | 属性变为必填 |
| `Readonly<T>` | 属性变为只读 |
| `Pick<T, K>` / `Omit<T, K>` | 选取 / 排除对象属性 |
| `Record<K, V>` | 描述键到值的映射 |
| `Exclude<T, U>` / `Extract<T, U>` | 排除 / 保留联合类型成员 |
| `NonNullable<T>` | 排除 `null` 与 `undefined` |
| `Parameters<T>` / `ReturnType<T>` | 提取函数参数 / 返回值类型 |

工具类型只改变静态类型，不会修改实际数据。`Partial`、`Readonly` 默认只处理第一层；`Omit` 也不会从真实对象中删除字段。

### 从用户类型生成更新参数

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserSummary = Pick<User, "id" | "name">;
type CreateUserInput = Omit<User, "id">;
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;

function updateUser(user: User, input: UpdateUserInput): User {
  return {
    ...user,
    name: input.name !== undefined ? input.name : user.name,
    email: input.email !== undefined ? input.email : user.email,
  };
}
```

更新参数先用 `Pick` 选出允许修改的字段，再用 `Partial` 变成可选。实现中显式读取这些字段，避免把额外属性一起展开进结果。

### 用 Record 检查状态文案

```typescript
type Status = "loading" | "success" | "error";

const statusText: Record<Status, string> = {
  loading: "加载中",
  success: "成功",
  error: "失败",
};
```

有限的键可以检查遗漏。如果用 `Record<string, User>` 描述动态字典，实际查询仍可能不存在；可以将值类型写成 `User | undefined`，或开启 `noUncheckedIndexedAccess`。

### 从函数复用类型

```typescript
function createUser(name: string, age: number) {
  return { name, age };
}

type Args = Parameters<typeof createUser>; // [string, number]
type User = ReturnType<typeof createUser>; // { name: string; age: number }
```

这里的 `typeof` 用于取得函数的类型。异步函数的 `ReturnType` 仍然是 `Promise<...>`，不会自动取出内部结果。

日常开发先熟悉这些内置工具；条件类型、`infer` 和复杂递归类型，等确有需求时再深入。

上一篇：[接口与函数](/article/ts04.html) · 下一篇：[项目实践](/article/ts06.html)
