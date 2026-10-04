---
title: 三、TypeScript 接口与函数
tags: TypeScript
categories:
  - TypeScript
comments: false
cover: /img/covers/tech-typescript.png
abbrlink: ts04
date: 2021-01-02 13:00:00
updated: 2021-01-02 13:00:00
top_img:
---

对象类型反复出现时，可以用 `interface` 或 `type` 为它命名。函数类型则约定输入和输出，让这些对象在代码中安全地传递。

## 用 interface 描述对象

```typescript
interface User {
  readonly id: number;
  name: string;
  nickname?: string;
}

const user: User = { id: 1, name: "小明" };
user.name = "小林";
// user.id = 2; // 报错：只读属性

function displayName(user: User): string {
  return user.nickname ?? user.name;
}
```

`?` 表示属性可以省略，读取时需要考虑 `undefined`。`readonly` 限制通过该类型修改属性，不会冻结对象，也不会让嵌套属性自动只读。

TypeScript 按结构判断兼容性：对象具备所需字段，就可以使用。但直接传入对象字面量时，会额外检查多余字段，帮助发现拼写错误。

## interface 与 type 怎么选

`type` 也能描述对象，还能为联合类型、元组等起别名：

```typescript
type Status = "active" | "disabled";
type Point = [number, number];
type User = { id: number; name: string };
```

两者都适合描述普通对象，保持项目风格一致即可。需要联合类型时用 `type`；需要同名声明合并时用 `interface`，例如扩充第三方库的接口。

扩展对象结构的写法：

```typescript
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

type UserRecord = User & { createdAt: string };
```

`&` 要求同时满足两边的类型，不是后面的字段覆盖前面的字段。比如 `{ id: number } & { id: string }` 的 `id` 会变成 `never`。

## 参数与返回值

```typescript
function greet(name: string, title?: string): string {
  return `你好，${title ?? ""}${name}`;
}

function createPage(page = 1, pageSize = 20) {
  return { page, pageSize };
}

function sum(...values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

console.log(greet("小明"));
console.log(createPage(undefined, 10)); // { page: 1, pageSize: 10 }
console.log(sum(1, 2, 3)); // 6
```

- 可选参数用 `?`，通常放在必填参数之后。
- 默认值在省略参数或传入 `undefined` 时生效，`null` 不会触发默认值。
- 剩余参数用数组类型，返回值能清楚推断时可以省略标注。

## 函数类型与回调

```typescript
type Formatter = (value: number) => string;
const formatPrice: Formatter = (value) => `¥${value.toFixed(2)}`;

function visit(
  names: string[],
  callback: (name: string, index: number) => void
): void {
  names.forEach(callback);
}

visit(["小明", "小林"], (name) => console.log(name));
```

回调可以忽略不需要的参数，所以不必为了允许省略 `index` 而把它写成可选。`index?: number` 表示调用回调时可能不传索引，与这里的实际行为不同。

返回类型 `void` 表示调用者忽略结果，因此 `(name) => names.push(name)` 也可以用作返回 `void` 的回调，尽管 `push` 实际返回数字。

## 什么时候需要重载

输入不同、返回类型也随之变化时，可以用重载：

```typescript
function label(value: string): string;
function label(value: string[]): string[];
function label(value: string | string[]): string | string[] {
  return typeof value === "string"
    ? `用户：${value}`
    : value.map((name) => `用户：${name}`);
}

const one = label("小明"); // string
const many = label(["小明", "小林"]); // string[]
```

前两行是公开签名，带函数体的是实现签名，不能单独作为重载调用。如果输入不同但返回类型相同，直接使用联合参数通常更简单。

上一篇：[基础类型](/article/ts03.html) · 下一篇：[泛型与常用工具类型](/article/ts05.html)
