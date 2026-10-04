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

接口和类型别名可以为对象结构命名。当多个函数或接口只有局部类型不同时，泛型能把这部分差异提取出来，让同一份定义适用于不同的数据。

这一篇先介绍泛型，再整理常用的内置工具类型，最后用用户列表和更新参数串起一个业务示例。示例以 2021 年初已有的 TypeScript 能力为范围，并建议开启 `strict`。

## 泛型：保留输入与输出的类型关系

假设有一个函数，把传入的值原样返回。使用 `any` 虽然能接收所有值，但返回结果也会成为 `any`，无法保留调用时的类型信息。

```typescript
function identity<T>(value: T): T {
  return value;
}

const count = identity(123); // 推断为数字字面量类型 123
const message = identity<string>("hello"); // 显式指定 string

console.log(count.toFixed(2)); // 123.00
console.log(message.toUpperCase()); // HELLO
// count.toUpperCase(); // 编译错误：数字没有这个方法
```

`T` 是类型参数的名字，可以换成更有含义的名称。调用时编译器通常能从参数推断它，不必每次手动填写 `<string>` 或 `<number>`。

泛型的价值在于表达类型之间的关系，例如“返回值与输入值类型相同”。如果一个类型参数只出现一次，也没有约束其他类型，就需要考虑是否真的有必要使用泛型。

## 泛型接口：复用返回数据结构

用户接口和商品接口的业务数据不同，但外层响应结构可能一致。

```typescript
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  code: 0,
  message: "ok",
  data: { id: 1, name: "小明" },
};

console.log(response.data.name);
```

`ApiResponse<User>` 把 `data` 指定为 `User`，而 `ApiResponse<User[]>` 则表示用户数组。这里的接口约定每个响应都有 `data`；如果错误响应结构不同，需要按实际协议另外建模。

## 泛型约束：extends 与 keyof

泛型函数需要对所有满足约束的类型都成立。没有约束的 `T` 可能是数字或布尔值，不能直接假设它有 `length`。

```typescript
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3
// getLength(123); // 编译错误：number 没有 length 属性
```

这里的 `extends` 表示类型参数必须满足指定结构。这个函数仅需要 `length`，直接使用 `{ length: number }` 作为参数类型也足够；泛型约束在需要关联多个类型参数时更有价值。

例如，安全读取对象属性时，可以约束第二个参数必须是第一个参数的键。

```typescript
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = { id: 1, name: "小明" };
const id = getProperty(user, "id"); // number
const name = getProperty(user, "name"); // string

console.log(id.toFixed(0), name.toUpperCase());
// getProperty(user, "email"); // 编译错误：user 没有 email 属性
```

- `keyof T` 取得 `T` 的键类型；这个例子中是 `"id" | "name"`。
- `K extends keyof T` 要求键属于对象已有的键。
- `T[K]` 取得这个键对应的属性类型。

这三个部分一起保留了“选哪个字段，就得到哪个字段的类型”的关系。

## 常用工具类型速查

工具类型是 TypeScript 提供的类型变换，不需要安装额外的运行时工具包。它们不会复制对象、删除属性或修改原始数据。

| 工具类型 | 用途 | 常见场景 |
| --- | --- | --- |
| `Partial<T>` | 将属性变为可选 | 局部更新参数 |
| `Required<T>` | 将属性变为必填 | 描述补全默认值后的配置 |
| `Readonly<T>` | 将属性变为只读 | 限制直接修改对象属性 |
| `Pick<T, K>` | 选取指定属性 | 列表摘要、表单字段 |
| `Omit<T, K>` | 排除指定属性 | 不含编号的创建参数 |
| `Record<K, V>` | 构造键和值的映射类型 | 状态文案、配置映射 |
| `Exclude<T, U>` | 从联合类型中排除可赋给 `U` 的成员 | 排除某些状态 |
| `Extract<T, U>` | 从联合类型中保留可赋给 `U` 的成员 | 选取某些状态 |
| `NonNullable<T>` | 排除 `null` 和 `undefined` | 表达已确认存在的值 |
| `Parameters<T>` | 取得函数参数类型组成的元组 | 复用调用参数 |
| `ReturnType<T>` | 取得函数返回值类型 | 复用函数结果结构 |

## 对象属性的变换

### Partial、Required 与 Readonly

```typescript
interface Options {
  theme?: "light" | "dark";
  pageSize?: number;
}

const defaults: Required<Options> = {
  theme: "light",
  pageSize: 20,
};

const patch: Partial<typeof defaults> = { pageSize: 50 };
const snapshot: Readonly<Required<Options>> = defaults;

console.log(patch.pageSize, snapshot.theme);
// snapshot.pageSize = 100; // 编译错误：属性只读
```

`Required` 不会帮我们填默认值，只是要求声明的值满足必填结构。`Readonly` 也不会冻结对象：上例中 `defaults` 仍然能修改，`snapshot` 指向的还是同一个对象。

这三个工具默认只处理第一层属性。`Partial<User>` 不会递归地把嵌套地址里的字段变成可选，`Readonly<User>` 也不会自动让地址里的字段全部只读。

### Pick 与 Omit

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserSummary = Pick<User, "id" | "name">;
type CreateUserInput = Omit<User, "id">;
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;

const summary: UserSummary = { id: 1, name: "小明" };
const createInput: CreateUserInput = {
  name: "小明",
  email: "xiaoming@example.com",
};
const updateInput: UpdateUserInput = { name: "小林" };
```

`Pick` 适合列出允许使用的字段，`Omit` 适合排除少数字段。如果新增用户属性不应该自动进入更新参数，优先使用 `Pick` 显式选择字段。

还要注意，`Omit` 只改变静态类型。把一个带有敏感字段的对象赋给 `Omit` 类型的变量，不会从对象里删除敏感数据；发送响应时仍应实际构造需要的对象。

### Record

```typescript
type Status = "pending" | "success" | "failed";

const statusText: Record<Status, string> = {
  pending: "处理中",
  success: "成功",
  failed: "失败",
};

console.log(statusText.pending);
```

当键是有限的联合类型时，`Record` 可以检查映射是否遗漏某个状态。不要把 `Record<string, User>` 理解为任意字符串键都一定有数据；读取动态字典时，可以用 `User | undefined` 表达值可能不存在的情况。

## 联合类型的筛选

```typescript
type Status = "pending" | "success" | "failed";

type FinishedStatus = Exclude<Status, "pending">; // "success" | "failed"
type SuccessStatus = Extract<Status, "success" | "cancelled">; // "success"
type Name = NonNullable<string | null | undefined>; // string

const finished: FinishedStatus = "failed";
const success: SuccessStatus = "success";
const name: Name = "小明";
```

`Exclude` 和 `Extract` 筛选的是联合类型的成员。删除对象字段应该用 `Omit`，不要混淆这两类操作。

`NonNullable` 也不会自动检查一个变量。真实值可能为空时，需要先用条件判断完成运行时检查和类型收窄，再使用它。

## 从函数提取类型

```typescript
function createUser(name: string, age: number) {
  return { name, age, active: true };
}

type CreateUserArgs = Parameters<typeof createUser>; // [string, number]
type CreatedUser = ReturnType<typeof createUser>;

const args: CreateUserArgs = ["小明", 20];
const user: CreatedUser = createUser(...args);

console.log(user.active); // true
```

这里的 `typeof createUser` 出现在类型位置，表示取得函数的类型。对于重载函数，这两个工具通常根据最后一个签名提取；对于异步函数，`ReturnType` 得到的仍然是 `Promise<...>`，不会自动取得 Promise 内部的值类型。

## 理解工具类型的实现

先看两个常用工具的简化定义。这里使用 `My` 前缀，避免与内置类型重名。

```typescript
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
}

const patch: MyPartial<User> = { name: "小林" };
const summary: MyPick<User, "id"> = { id: 1 };
```

`[P in keyof T]` 表示依次映射类型的每一个键，`T[P]` 读取对应属性类型，`?` 则把这个属性标记为可选。`MyPick` 使用相同思路，但只处理传入的键集合 `K`。

联合类型的筛选则可以用条件类型实现：

```typescript
type MyExclude<T, U> = T extends U ? never : T;

type FinishedStatus = MyExclude<"pending" | "success" | "failed", "pending">;
const status: FinishedStatus = "success";
```

当条件左侧是直接使用的类型参数 `T` 时，传入联合类型会逐个成员进行判断。`"pending"` 被转换成 `never`，另外两个成员保留下来；`never` 不会为最终的联合类型增加可选值。

理解这一层即可开始使用工具类型，复杂的递归类型可以等遇到实际需求后再研究。

## 完整示例：分页用户与更新参数

```typescript
interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

type UserSummary = Pick<User, "id" | "name">;
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;

const response: ApiResponse<PageResult<UserSummary>> = {
  code: 0,
  message: "ok",
  data: {
    list: [{ id: 1, name: "小明" }],
    total: 1,
    page: 1,
    pageSize: 20,
  },
};

function updateUser(user: User, input: UpdateUserInput): User {
  return {
    ...user,
    name: input.name !== undefined ? input.name : user.name,
    email: input.email !== undefined ? input.email : user.email,
  };
}

const user: User = {
  id: 1,
  name: "小明",
  email: "xiaoming@example.com",
};

console.log(response.data.list);
console.log(updateUser(user, { name: "小林" }));
// updateUser(user, { id: 2 }); // 编译错误：更新参数没有 id
```

`ApiResponse` 描述响应外层，`PageResult` 描述分页结构，`UserSummary` 描述列表项，`UpdateUserInput` 描述允许更新的字段。它们各自表达一层业务含义，可以组合使用。

实际请求返回的 JSON 仍然需要在运行时校验。给数据添加类型标注或使用 `as`，都不会把不合法的数据变成合法数据。

## 延伸阅读

- 上一篇：[三、TypeScript 接口与类型别名](/article/ts04.html)
- [TypeScript 官方手册：泛型](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript 官方手册：工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)
