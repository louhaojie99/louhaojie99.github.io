---
title: typescript 开发整理
tags: typescript
categories: typescript
comments: false
cover: >-
  https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/fdbe621f6b31fb31333381d541533fe2e8a61025b4acebb1f10c9f948a9ffce78a532557a1a789d30807b98f07b23952?pictype=scale&from=30113&version=3.3.3.3&uin=851681631&fname=10_ts.jpg&size=750
abbrlink: 9b52ebc9
date: 2022-02-15 12:00:00
top_img:
---

## ts 类型定义

**1.1 布尔类型(boolean)**

```typescript
const flag: boolean = true;
```

**1.2 Number 类型**

```typescript
const num: number = 1;
```

**1.3 String 类型**

```typescript
const str: number = 'hello';
```

**1.4 undefined 类型**

`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`


```typescript
let u: undefined = undefined;
u = null;
```

**1.5 null 类型**

`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`

```typescript
const n: null = null;
n = undefined;
```

**1.6 Symbol 类型**
我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库 需要在 tsconfig.json 的 `libs` 字段加上 `ES2015` Symbol 的值是唯一不变的

```typescript
const sym1 = Symbol("hello");
const sym2 = Symbol("hello");
console.log(sym1 === sym2);				// false
console.log(Symbol("hello") === Symbol("hello"));	// false
```

**1.7 数组类型(array)**

```typescript
const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3]; 
```

**1.8 元组类型(tuple)**

在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知「数量」和「类型」的数组 其实可以理解为他是一种特殊的数组

```typescript
let tuple: [string, number] = ["hello", 1];
```

**1.9 对象类型(object)**

「object」 类型用于表示非原始类型

```typescript
let obj: object;
obj = 1; // error
obj = "hello"; // error
obj = true; // error
obj = null; // error
obj = undefined; // error
obj = {}; // ok
```

「大 Object」 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 `null` 和 `undefined` 不可以)

```typescript
let obj: Object;
obj = 1; // ok
obj = "a"; // ok
obj = true; // ok
obj = null; // error
obj = undefined; // error
obj = {}; // ok
```

「{}」 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合

```typescript
let simpleCase: {};
simpleCase = 1; // ok
simpleCase = "a"; // ok
simpleCase = true; // ok
simpleCase = null; // error
simpleCase = undefined; // error
simpleCase = {}; // ok
```

**2.0 任意类型(any)**

任何类型都可以被归为 `any` 类型 这让 `any` 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型) TypeScript 允许我们对 `any` 类型的值执行任何操作 而无需事先执行任何形式的检查

一般使用场景：第三方库没有提供类型文件时可以使用 `any`类型转换遇到困难或者数据结构太复杂难以定义 不过不要太依赖 `any` 否则就失去了 ts 的意义了

```typescript
const an: any;
an = document.getElementById("root");
an = 1; // ok
an = "a"; // ok
an = true; // ok
an = null; // ok
an = undefined; // ok
an = {}; // ok
...
```

**2.1 unknown类型**

`unknown` 和 `any` 的主要区别是 `unknown` 类型会更加严格 在对 `unknown` 类型的值执行大多数操作之前 我们必须进行某种形式的检查 而在对 `any` 类型的值执行操作之前 我们不必进行任何检查 所有类型都可以被归为 `unknown` 但`unknown`类型只能被赋值给 `any` 类型和 `unknown` 类型本身 而 `any` 啥都能分配和被分配

```typescript
let value: unknown;
value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK

let value1: unknown = value; // OK
let value2: any = value; // OK

let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
```

**2.2 void类型**

`void` 表示没有任何类型 当一个函数没有返回值时 TS 会认为它的返回值是 `void` 类型。

```typescript
function hello(name: string): void {}

// 在js中想让一个函数返回 undefined, 代码中输入 void 0
const func = (name: string) {
    void 0;
}
console.log(func);	// undefined
```

**2.3 never 类型**

`never` 一般表示用户无法达到的类型 例如`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

```typescript
function neverReach(): never {
  throw new Error("an error");
}
```

> ❝
> 思考:never 和 void 的区别 void 可以被赋值为 null 和 undefined 的类型。never 则是一个不包含值的类型。拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

> ❞

**2.4 BigInt 大数类型**

使用 `BigInt` 可以安全地存储和操作大整数 我们在使用 `BigInt` 的时候 必须添加 `ESNext` 的编译辅助库 需要在 tsconfig.json 的 `libs` 字段加上`ESNext`要使用`1n`需要 `"target": "ESNext number"` 和 `BigInt` 类型不一样 不兼容

```typescript
const max1 = Number.MAX_SAFE_INTEGER; // 2**53-1
console.log(max1 + 1 === max1 + 2); // true

const max2 = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max2 + 1n === max2 + 2n); // false

let foo: number;
let bar: bigint;
foo = bar; //error
bar = foo; //error
```

## ts 类型推论

指编程语言中能够自动推导出值的类型的能力 它是一些强静态类型语言中出现的特性 定义时未赋值就会推论成 `any` 类型 如果定义的时候就赋值就能利用到类型推论

```typescript
let flag; // 推断为any
let count = 123; //推断为number类型
let hello = "hello"; //推断为string类型
```

## ts 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种 未赋值时联合类型上只能访问两个类型共有的属性和方法

```typescript
let name: string | number;
console.log(name.toString());
name = 1;
console.log(name.toFixed(2));
name = "hello";
console.log(name.length);
```

## ts 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译（这一招很关键 有时候可以帮助你解决很多编译报错）

类型断言有两种形式：

```typescript
 // 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

> **❝**

> 以上两种方式虽然没有任何区别，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。

> ❞

「非空断言」在上下文中当类型检查器无法断定类型时 一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 `null` 和非 `undefined` 类型

```typescript
let flag: null | undefined | string;
flag!.toString(); // ok
flag.toString(); // erro
```

## ts 字面量类型

在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：

```typescript
let flag1: "hello" = "hello";
let flag2: 1 = 1;
let flag3: true = true;
```

## ts 类型别名

类型别名用来给一个类型起个新名字

```typescript
// 普通情况
function hello(value: <string | number>) {}

// 别名的使用
type flag = string | number;
function hello(value: flag) {}
```

## ts 交叉类型

交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

```typescript
type Flag1 = { x: number };
type Flag2 = Flag1 & { y: string };

let flag3: Flag2 = {
  x: 1,
  y: "hello"
};
```

## ts 类型保护

类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型 其主要思想是尝试检测属性、方法或原型，以确定如何处理值

「typeof 类型保护」

```typescript
function double(input: string | number | boolean) {
  if (typeof input === "string") {
    return input + input;
  } else {
    if (typeof input === "number") {
      return input * 2;
    } else {
      return !input;
    }
  }
}
```

「in 关键字」

```typescript
interface Bird {
  fly: number;
}

interface Dog {
  leg: number;
}

function getNumber(value: Bird | Dog) {
  if ("fly" in value) {
    return value.fly;
  }
  return value.leg;
}
```

「instanceof 类型保护」

```typescript
class Animal {
  name!: string;
}
class Bird extends Animal {
  fly!: number;
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.fly);
  } else {
    console.log(animal.name);
  }
}
```

「自定义类型保护」

通过 `type is xxx`这样的类型谓词来进行类型保护

例如下面的例子 `value is object`就会认为如果函数返回 true 那么定义的 value 就是 object 类型

```typescript
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function fn(x: string | object) {
  if (isObject(x)) {
    // ....
  } else {
    // .....
  }
}
```

