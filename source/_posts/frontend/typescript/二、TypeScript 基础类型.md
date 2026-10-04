---
title: 二、TypeScript 基础类型
tags: TypeScript
categories:
  - TypeScript
comments: false
cover: /img/covers/tech-typescript.png
abbrlink: ts03
date: 2021-01-01 14:00:00
updated: 2021-01-01 14:00:00
top_img:
---

类型回答两个问题：这个值可以是什么，能对它做什么。先掌握常用类型，再理解如何处理不确定的值。

## 常用类型与推断

```typescript
const enabled: boolean = true;
const count: number = 10;
const message: string = "hello";
const scores: number[] = [80, 90];
const point: [number, number] = [10, 20]; // 元组：按位置描述类型
const user: { id: number; name: string } = { id: 1, name: "小明" };
```

能从初始值推断时，可以省略标注：

```typescript
let count = 10; // number
const fixed = 10; // 字面量类型 10
let state: "loading" | "success" | "error" = "loading";

count = 20;
state = "success";
// state = "done"; // 报错：不在允许的值中
```

`number[]` 与 `Array<number>` 等价。业务对象优先写具体字段；`object` 只表示非原始值，`{}` 则可以接受任何非 `null`、非 `undefined` 的值，并不表示“空对象”。

## 空值与联合类型

`string | null` 表示值可以是字符串或 `null`。开启 `strict` 后，使用前需要处理空值。

```typescript
function displayName(name: string | null | undefined): string {
  return name ?? "匿名用户";
}

function formatId(id: string | number): string {
  if (typeof id === "number") {
    return id.toFixed(0);
  }
  return id.toUpperCase(); // 这里已确定是 string
}
```

根据条件缩小可能的类型，叫作**类型收窄**。除了 `typeof`，还可以用 `in` 检查属性、用 `instanceof` 检查实例。

`??` 只在值为 `null` 或 `undefined` 时使用备用值；`||` 还会把 `0`、空字符串当成假值，要按业务需要选择。

## any、unknown、void 与 never

| 类型 | 含义 | 常见用途 |
| --- | --- | --- |
| `any` | 跳过很多类型检查 | 迁移旧代码时临时使用 |
| `unknown` | 尚未确认类型的值，使用前要检查 | 外部输入、JSON 数据 |
| `void` | 调用者不使用函数返回值 | 日志函数、回调 |
| `never` | 不可能出现的值 | 总是抛错的函数、穷尽检查 |

```typescript
function print(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

function fail(message: string): never {
  throw new Error(message);
}
```

优先用 `unknown` 接收不确定的数据，检查后再使用；改成 `any` 只会让编译器停止提醒。

## 用联合类型表达业务状态

与其同时维护多个可选字段，不如明确规定每种状态有哪些数据：

```typescript
type LoadState =
  | { status: "loading" }
  | { status: "success"; names: string[] }
  | { status: "error"; message: string };

function render(state: LoadState): string {
  switch (state.status) {
    case "loading":
      return "加载中";
    case "success":
      return state.names.join("、");
    case "error":
      return state.message;
    default: {
      const unexpected: never = state;
      throw new Error(`未处理的状态：${unexpected}`);
    }
  }
}
```

判断 `status` 后，编译器就知道可以读取哪些字段。这叫**可辨识联合**。以后增加状态却漏写分支，`never` 那一行就会报错。

## 类型断言不会检查数据

```typescript
const raw: unknown = 123;
const text = raw as string;
// text.toUpperCase(); // 编译通过，运行时却会报错
```

`as` 只是告诉编译器采用指定类型，不会转换或验证值。非空断言 `value!` 也不会让空值消失；能通过条件判断处理时，优先写判断。

`as const` 则常用于保留字面量类型：

```typescript
const options = ["small", "large"] as const;
// 类型为 readonly ["small", "large"]
```

这里的只读约束只存在于类型层面，不会在运行时冻结数组。

## 了解即可：symbol 与 bigint

```typescript
const first: symbol = Symbol("id");
const second: symbol = Symbol("id");
console.log(first === second); // false

const big: bigint = 9007199254740991n;
console.log(big + 1n); // 9007199254740992n
```

`symbol` 用于唯一标识；`bigint` 用于大整数，不能直接与 `number` 混合运算。`1n` 要求 `target` 至少为 `ES2020`。标准库声明配置项是 `lib`，例如 `["ES2020", "DOM"]`；声明不会给运行环境补装 API。

上一篇：[介绍与安装](/article/ts02.html) · 下一篇：[接口与函数](/article/ts04.html)
