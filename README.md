# study-TypeScript

以下内容主要参考：[为 JavaScript 程序员准备的 TypeScript](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html)

以下内容也可以作为补充:
[小满 zs | 学习 TypeScrip](https://xiaoman.blog.csdn.net/article/details/122167155)
[小满 zs | 学习 TypeScrip 视频版](https://www.bilibili.com/video/BV1wR4y1377K)

了解 TS: TypeScript 提供了 JavaScript 的所有功能，并在这些功能之上添加了一层： TypeScript 的类型系统。如：JS 不检查你在赋值时与类型是否匹配。TypeScript 提供了这样的功能。

为什么要使用它: TypeScript 可以检查代码中的意外行为，从而降低出现错误的机会。

准备内容，需要全局安装 `npm install typescript -g`

## 1. 类型系统

### 1.1 类型推断

通过感知 JavaScript 的工作原理，TypeScript 可以构建一个接受 JavaScript 代码但具有类型的类型系统。这个类型系统使得我们不需要添加额外的字符来显式地指定类型。如在 TS 中我们完全可以这样声明：

```ts
let helloWorld = "Hello World";
```

TypeScript 也会知道 helloWorld 是 string 类型，但这样我们是不推荐的。

### 1.2 类型定义

JavaScript 中的各种设计模式使得类型难以自动推断（如使用动态编程的模式）。为了使类型推断涵盖这些情况， TypeScript 支持扩展 JavaScript 语言，它可以让 TypeScript 知道如何去推断类型。

如，要创建具有推断类型的对象，该类型包括 name: string 和 id: number，你可以使用 interface 关键字声明显式地描述此对象的内部数据的类型（也叫“结构”、“接口类型”）：

```ts
interface User {
  name: string;
  id: number;
}
```

然后你可以声明一个符合此接口（interface）的 JavaScript 对象，在变量声明后使用像 : TypeName 这样的语法：

```ts
const user: User = {
  name: "Hayes",
  id: 0,
};
```

如果提供的对象与提供的接口不匹配，TypeScript 将警告。

由于 JavaScript 支持面向对象，常常将接口声明与类一起使用：

```ts
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

您可以使用接口对参数进行注释，并将值传递给函数或者限制函数返回值类型系统：

```ts
interface User {
  name: string;
  id: number;
}

function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}
```

JavaScript 中已经有一些基本类型可用：boolean、string、number、 null、 undefined 以及 ES6 的 Symbol 和 ES10 的 BigInt，它们都可以在接口中使用。TypeScript 将此列表扩展为更多的内容（type），还有更多如 any （允许任何类型）、unknown （确保使用此类型的人声明类型是什么）、 never （这种类型不可能发生）和 void （返回 undefined 或没有返回值的函数）。

构建类型有两种语法： 接口和类型。 你应该更喜欢 interface。当需要特定功能时使用 type 。

#### 数组类型

在 TS 中,数组的元素类型系统必须保持一致

```ts
let arr: number[] = [123]; // //数字类型的数组
var arr2: any[] = [1, "2", true]; //任意类型的数组

let arr1: number[] = [1, 2, 3, "1"]; // err:不能将类型“string”赋值给类型“number”
arr.unshift("1"); // err: 类型“string”的参数不能赋值给类型“number”的参数

// 多维数组
let data: number[][] = [
  [1, 2],
  [3, 4],
];
```

数组泛型

```ts
// Array<类型>
let arr: Array<number> = [1, 2, 3, 4, 5];
```

用接口表示数组，一般用来描述类数组

```ts
interface NumberArray {
  [index: number]: number;
}

let fibonacci: NumberArray = [1, 1, 2, 3, 5]; // 索引类型是数字时，值类型也必须是数字。
```

P.S. 函数参数 arguments 是类数组，使用 ts 内置对象 IArguments 定义

```ts
function Arr(...args: any): void {
  let arr: IArguments = arguments;
  // ...
}
Arr(111, 222, 333);

//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

P.S. 元组（Tuple）是固定数量的不同类型的元素的组合，元组中的元素类型可以是不同的，而且数量固定。

```ts
let arr: [number, string] = [1, "string"];

let arr2: readonly [number, boolean, string, undefined] = [
  1,
  true,
  "sring",
  undefined,
];
```

#### 补充：关于 void 空值类型

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数。
void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数。

```js
function voidFn(): void {
  console.log("test void");
}
```

void 还有一种用法是定义 undefined 和 null 类型

```js
let u: void = undefined;
let n: void = null;
```

void 和 undefined 、null 最大的区别：
undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string 类型的变量。

```js
let test: null = null;
let num2: string = "1";

num2 = test; //这样是没问题的

//或者下面这样
let test: undefined = undefined;
let num2: string = "1";

num2 = test;
```

但是 void 类型不可以分给其他类型

```js
let test: void = undefined;
let num2: string = "1";

num2 = test; // err: void 类型不可以分给其他类型
```

P.S. 如果在 tsconfig.json 开启了严格模式，那么 null 就不能 赋予 void 类型。

```js
{
    "compilerOptions":{"strict": true}
}
```

#### 补充：类型判断

了解变量的类型， 使用 typeof：

| 类型      | 推断语句                         |
| --------- | -------------------------------- |
| string    | typeof s === "string"            |
| number    | typeof n === "number"            |
| boolean   | typeof b === "boolean"           |
| undefined | typeof undefined === "undefined" |
| function  | typeof f === "function"          |
| array     | Array.isArray(a)                 |

如，你可以使函数根据传递的是字符串还是数组返回不同的值：

```ts
function wrapInArray(obj: string | string[]) {
  return typeof obj === "string" ? [obj] : obj;
}
```

### 1.3 组合类型

使用 TypeScript，可以通过组合简单类型来创建复杂类型。有两种流行的方法可以做到这一点：联合和泛型。

#### 联合

使用联合，可以声明类型可以是许多类型中的一种。例如，可以将 boolean 类型描述为 true 或 false ：

```ts
type MyBool = true | false; // MyBool 被归类为 boolean。这是结构化类型系统的一个属性。
```

联合类型的一个流行用法是描述 string 或者 number 的字面量的合法值。

```ts
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

let W: WindowStates = "open"; // 这样是合法的
let P: PositiveOddNumbersUnderTen = 199; // err 不能将类型 199 “赋值给类型PositiveOddNumbersUnderTen”
```

联合也提供了一种处理不同类型的方法。如，有一个函数处理 array 或者 string：

```ts
function getLength(obj: string | string[]) {
  return obj.length;
}
```

#### 泛型

泛型为类型提供变量。可以理解为动态类型。一个常见的例子是数组。没有泛型的数组可以包含任何内容。带有泛型的数组可以描述数组包含的值。

```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

// 数组泛型
let stringArr2: StringArray = ["a", "b"];
let objectWithNameArray: ObjectWithNameArray = [{ name: "jerry" }];
```

函数泛型。如有一个函数功能相同，但是类型不同。

```ts
function num(a: number, b: number): Array<number> {
  return [a, b];
}
num(1, 2);
function str(a: string, b: string): Array<string> {
  return [a, b];
}
str("独孤", "求败");
```

泛型优化

```ts
function change<T>(a: T, b: T): Array<T> {
  return [a, b];
}

let stringChange = function (a: string, b: string) {
  return change<string>(a, b);
};
let numberChange = function (a: number, b: number) {
  return change<number>(a, b);
};
console.log(stringChange("a", "b"));
console.log(numberChange(1, 7));
```
