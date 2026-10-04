---
title: 三、TypeScript 接口与类型别名
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

上一篇介绍了字符串、数组、联合类型等基础类型。实际开发时，我们经常需要描述一整份用户资料或一组函数参数。把这些结构提取成有名字的类型，可以减少重复，也方便阅读和维护。

这一篇从用户资料开始，介绍接口 `interface`、类型别名 `type`，以及它们各自适合的场景。示例使用 2021 年初已支持的语法，建议开启 `strict`，观察编辑器给出的类型提示。

## 用 interface 描述对象

接口用于描述对象应该具有什么结构。先定义接口，再把它用作变量或参数的类型。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "小明",
  email: "xiaoming@example.com",
};

function greet(user: User): string {
  return `你好，${user.name}`;
}

console.log(greet(user)); // 你好，小明
```

漏写必填属性，或者给 `id` 赋一个字符串，都会触发类型错误。接口本身不会生成 JavaScript 对象，也不会在运行时检查服务器返回的数据；它的作用是让编译器检查代码中的类型关系。

## 可选属性与只读属性

用户不一定填写昵称，但用户编号通常不应该在业务逻辑中随意修改。这两种要求可以分别用 `?` 和 `readonly` 表达。

```typescript
interface User {
  readonly id: number;
  name: string;
  nickname?: string;
}

const user: User = { id: 1, name: "小明" };

function getDisplayName(user: User): string {
  return user.nickname ?? user.name;
}

user.name = "小林"; // 普通属性可以修改
// user.id = 2; // 编译错误：id 是只读属性

console.log(getDisplayName(user)); // 小林
```

开启 `strictNullChecks` 后，读取 `nickname` 得到的是 `string | undefined`，使用前需要处理未填写的情况。这里的 `??` 只在值为 `null` 或 `undefined` 时采用备用值，因此空字符串会被保留。

`readonly` 限制的是通过这个类型直接赋值的操作，既不会调用 `Object.freeze`，也不会自动让嵌套对象的所有属性只读。

## TypeScript 按结构判断兼容性

一个对象不必显式声明“实现了某个接口”，只要具有接口要求的成员，就可以在相应位置使用。

```typescript
interface Named {
  name: string;
}

function printName(value: Named): void {
  console.log(value.name);
}

const user = { name: "小明", age: 20 };
printName(user); // 可以：user 具备 name 属性

// printName({ name: "小明", age: 20 });
// 上面直接传入对象字面量时，会触发额外属性检查
```

额外属性检查有助于发现拼错的字段，但并不意味着接口会在运行时删除多余字段。也不要为了绕过错误就随手加类型断言；先检查参数结构是否符合实际需求。

## 用 type 为类型命名

类型别名也能描述对象，还能为联合类型、元组、函数等类型起名字。

```typescript
type UserId = number;
type UserStatus = "active" | "disabled";
type Point = [number, number];

type User = {
  id: UserId;
  name: string;
  status: UserStatus;
};

type Formatter = (user: User) => string;

const formatUser: Formatter = (user) => `${user.name}（${user.status}）`;
const point: Point = [10, 20];

console.log(formatUser({ id: 1, name: "小明", status: "active" }));
console.log(point);
```

`type UserId = number` 只是给 `number` 起了一个别名，并不会创建一种与普通数字互不兼容的新类型。

类型别名常用于表达有限的业务状态。相较于直接写 `string`，`"active" | "disabled"` 能让编辑器列出可选值，也能发现拼写错误。

## 复用对象结构

### 接口继承：extends

多个对象共享一部分属性时，可以用接口继承提取公共结构。

```typescript
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "管理员",
  permissions: ["user:read", "user:write"],
};
```

`Admin` 同时要求 `User` 的属性和自己的属性。继承时不能把已有的 `id: number` 改成不兼容的 `id: string`。

### 交叉类型：&

交叉类型要求一个值同时满足两边的类型，适合组合已有结构。

```typescript
type User = {
  id: number;
  name: string;
};

type WithTimestamps = {
  createdAt: string;
  updatedAt: string;
};

type UserRecord = User & WithTimestamps;

const record: UserRecord = {
  id: 1,
  name: "小明",
  createdAt: "2021-01-02",
  updatedAt: "2021-01-02",
};
```

`&` 不是后面的属性覆盖前面的属性。如果把 `{ id: number }` 与 `{ id: string }` 相交，`id` 必须同时满足两种类型，结果会成为无法正常赋值的 `never`。组合类型时应先处理字段冲突。

## interface 与 type 怎么选

| 需求 | interface | type |
| --- | --- | --- |
| 描述对象结构、函数签名 | 支持 | 支持 |
| 扩展已有对象类型 | 使用 `extends` | 使用交叉类型 `&` |
| 为联合类型、元组或基础类型起别名 | 不能直接表达这种别名 | 支持 |
| 同一作用域内同名声明合并 | 支持，成员需要兼容 | 不支持重复声明 |

接口可以通过多次声明补充成员，这在扩展第三方库类型时很常见。

```typescript
interface Settings {
  theme: "light" | "dark";
}

interface Settings {
  language: string;
}

const settings: Settings = {
  theme: "light",
  language: "zh-CN",
};
```

普通业务对象使用任意一种都可以，优先保持项目风格一致。需要联合类型时用 `type`；希望对象结构可以通过声明合并扩展时用 `interface`。不需要为了选择其中一个而反复重写代码。

## 完整示例：更新用户资料

用户展示数据和更新参数通常不完全相同。展示数据包含只读编号，而更新操作只允许传入昵称和邮箱。

```typescript
type UserStatus = "active" | "disabled";

interface User {
  readonly id: number;
  name: string;
  email: string;
  status: UserStatus;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
}

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
  status: "active",
};

const updatedUser = updateUser(user, { name: "小林" });

console.log(updatedUser.name); // 小林
console.log(user.name); // 小明，原对象没有被修改
// updateUser(user, { id: 2 }); // 编译错误：更新参数不包含 id
```

这里显式读取允许更新的字段，并在值为 `undefined` 时保留原值。TypeScript 的对象类型并不是运行时字段白名单，直接展开外部传入的对象可能把多余属性一起带进结果。

接口仍然不能替代运行时校验。从网络、表单等边界接收数据时，需要根据业务规则检查数据是否合法。

这个例子里的更新参数重复写了 `User` 的部分字段。下一篇会用 `Pick` 和 `Partial` 从已有类型中生成它，并进一步介绍泛型如何帮助我们复用这类类型关系。

## 延伸阅读

- 上一篇：[二、TypeScript 基础类型](/article/ts03.html)
- 下一篇：[四、TypeScript 泛型与常用工具类型](/article/ts05.html)
- [TypeScript 官方手册：对象类型](https://www.typescriptlang.org/docs/handbook/2/objects.html)
