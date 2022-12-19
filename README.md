# study-TypeScript

推荐资源：
[一篇让你完全够用 TS 的指南](https://juejin.cn/post/7088304364078497800)、
[TypeScript 中文手册](https://typescript.bootcss.com/)、
[小满 zs | 学习 TypeScrip](https://xiaoman.blog.csdn.net/article/details/122167155)、
[小满 zs | 学习 TypeScrip（视频版）](https://www.bilibili.com/video/BV1wR4y1377K)、
[34 个知识点，助你快速入门 TS](https://juejin.cn/post/7042871114602643493)

## TOC

在学习 TS 后，你需要知道以下内容：

- 类型
  - 基础类型
  - 数组类型
  - 元组
  - 对象
  - 枚举
  - 类型断言
  - 类型推断
  - 联合类型
  - 交叉类型
  - 类型保护
    - 自定义类型保护
    - typeof 类型保护
    - instanceof 类型保护
- 函数
  - 函数定义
  - 可选参数和默认参数
  - 剩余参数
- 编译
  - 编译文件
  - tsconfig.json
- 打包
  - webpack
- 接口
  - 接口定义
  - 接口属性（可选/只读）
  - 接口继承
  - 函数类型接口描述
- 类
  - 定义类
  - 继承
  - public、private 和 protected 修饰符
  - getter 和 setter
  - readonly 修饰符
  - 静态成员
  - 抽象类
  - 类与接口
- 泛型
  - 用法
  - 函数泛型
  - 类泛型
  - 泛型约束与类型参数
- 命名空间
  - 定义与使用
  - 拆分文件
  - 别名
- 模块化
  - export 和 import
  - export = 和 import = require()

## 一、了解 TS

ts 的目标是成为 js 程序的静态类型检查工具，可以在编译时期（执行之前）以静态检查的方式保证程序中的类型都是正确的。ts 提供了 js 的所有特性并在上面加了一层 ts 类型系统。

例如：JS 不检查你在赋值时与类型是否匹配，而 TypeScript 提供了这样的功能。

为什么要使用它:相对于 JS 而言，TS 属于强类型语言，会使代码更加规范，从而解决了大型项目代码的复杂性，而且 TypeScript 可以检查代码中的意外行为，从而降低出现错误的机会。

注意的一点是浏览器不识别 TS 文件，所以在编译的时候，TS 文件会先编译为 JS 文件。

在开始之前，需要准备内容：全局安装 `npm install typescript -g`，后面 ts 文件的编译命令使用`tsc`，当然，也可以在线编译:[TypeScript Playground](https://www.typescriptlang.org/zh/play)

## 二、类型系统

这里将 TS 的数据类型简单的进行下归类：

基本类型：string、number、boolean、symbol、bigint、null、undefined
引用类型：array、 Tuple(元组)、 object(包含 Object 和{})、function
特殊类型：any、unknow、void、never、Enum(枚举)
其他类型：类型推理、字面量类型、交叉类型、联合类型

### 基本类型:

```ts
//字符串
let str: string = "Domesy";

// 数字
let num: number = 7;

//布尔
let bool: boolean = true;

//symbol
let sym: symbol = Symbol();

//bigint
let big: bigint = 10n;

//null
let nu: null = null;

//undefined
let un: undefined = undefined;
```

注意点:

- null 和 undefined 两个类型一旦赋值，就不能在赋值给任何其他类型
- symbol 是独一无二的， `sym === sym1` 结果为 false

### 引用类型

Array

```ts
// 声明方式 1
let arr1: number[] = [1, 2, 3];

// 声明方式 2
let arr2: Array<number> = [1, 2, 3];

// 联合类型声明（数组元素可以是联合类型中的任一类型）
let arr3: Array<number | boolean> = [1, true, 3];

// 多维数组
let arr4: number[][] = [
  [1, 2],
  [3, 4],
];
```

Tuple:

Tuple : 限制元素的类型并且限制数量的元素集合。
Tuple 的概念值只存在于 TS，在 JS 上是不存在的。
在 TS 中,是允许对 Tuple 扩容（ push 方法），但在访问上不允许。

```ts
// 声明了两个元素的 tuple，元素类型分别是 number 和 string
let t: [number, string] = [1, "2"]; // ok
let t1: [number, string] = [1, 3]; // error

t.push(7);
console.log(t); // [1, '2', 7]
let c = t[2]; // error
```

Object

Object 在定义时可以直接使用 object 类型并赋值，但不能更改属性，原因是并没有使对象的内部具体的属性做限制，所以需要使用 {} 来定义内部类型。

```ts
let obj: { a: number; b: number } = { a: 1, b: 2 };
obj.a = 3; // ok

let obj1: object = { a: 1, b: 2 };
obj1.a = 3; // error，类型 object 上不存在属性 a
```

所有的原始类型或非原始类型都可以对 Object 类型进行赋值,除了 null 和 undefined

```ts
let obj: Object;

obj = 1; // ok
obj = "a"; // ok
obj = true; // ok
obj = {}; // ok
obj = Symbol(); //ok
obj = 10n; //ok

obj = null; // error
obj = undefined; // error
```

function

定义函数的两种方式:一种为 function， 另一种为箭头函数/匿名函数。
我们可以添加返回值和形参的类型，但我们可以省略返回值类型，因为 TypeScript 能够根据返回语句自动推断出返回值类型。（下面的演示为完整形式）

```ts
function setName2(name: string): string {
  console.log("hello", name);
}
setName2("Domesy"); // err 返回值为空，要求返回string类型的返回值

function setName3(name: string): string {
  console.log("hello", name);
  return 1;
}
setName3("Domesy"); // error 返回值类型不匹配
```

⭐ 注意：TS 中定义函数类型的语法与箭头函数相似，容易产生歧义，如下

```ts
let myAdd: (x: number, y: number) => number;
myAdd = function (x: number, y: number): number {
  return x + y;
};

// 看看这个
const myAdd3 = (name: string) => console.log("hello", name);

// 上面的很容易理解，下面的呢？
let myAdd2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

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

#### 对象类型

要用关键字 interface（接口），我的理解是使用 interface 来定义一种约束，让数据的结构满足约束的格式。

```ts
interface Person {
  name: string; // 属性
  age: number; // 属性
  say(lanuage: string): void; //方法
}

const pp: Person = {
  name: "tom",
  age: 18,
  say(lanuage: string) {},
};
```

接口的继承和合并

```ts
// 重名 interface 会默认合并
interface A {
  name: string;
}
interface A {
  age: number;
}
var x: A = { name: "xx", age: 20 };

// 接口之间可以存在继承关系

interface B extends A {
  address: string;
}

let obj: B = {
  age: 18,
  name: "string",
  address: "xxxxx花牛街",
};
```

可选属性可以使用 `typeName?: type` 的形式定义
任意属性使用 `[propName: type]: type` 的形式定义
readonly 前缀则限制属性只读，不允许被赋值，如 `readonly id: number`

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

泛型为类型提供变量。可以理解为动态类型。

- 数组泛型

  一个常见的例子是数组。没有泛型的数组可以包含任何内容。带有泛型的数组可以描述数组包含的值。

  ```ts
  type StringArray = Array<string>;
  type NumberArray = Array<number>;
  type ObjectWithNameArray = Array<{ name: string }>;

  // 数组泛型
  let stringArr2: StringArray = ["a", "b"];
  let objectWithNameArray: ObjectWithNameArray = [{ name: "jerry" }];
  ```

- 函数泛型

  如有一个函数功能相同，但是类型不同，我们可以这样实现：

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

  使用函数泛型优化

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

  多个参数的情况:

  ```ts
  function sub<T, U>(a: T, b: U): Array<T | U> {
    //...
  }

  sub<number, string>(1, "a");
  ```

- 泛型约束

  ```ts
  interface Len {
    length: number;
  }

  function getLen<T extends Len>(a: T) {
    return a.length;
  }

  getLen("abc"); // 3
  getLen(1); // err ,因为 number 没有 length 属性
  ```

- 接口泛型

  声明自己使用泛型的类型：

  ```ts
  interface MyInter<T> {
    (arg: T): T;
  }

  function fn<T>(arg: T): T {
    return arg;
  }

  let result: MyInter<number> = fn;

  result(123);
  ```

- 对象字面量泛型,

  ```ts
  interface Backpack<Type> {
    name: string;
    add: (obj: Type) => void;
    get: () => Type;
  }

  // declare 可以告诉 TypeScript 有一个常量，叫做`backpack`，并且不用担心它是从哪里来的
  // declare const backpack: Backpack<string>;
  const backpack: Backpack<string> = {
    name: "backpack",
    add(obj: string) {
      console.log(obj);
    },
    get() {
      return this.name;
    },
  };

  // 对象是一个字符串，因为我们在上面声明了它作为 Backpack 的变量部分。
  const object = backpack.get();

  console.log(object); // backpack
  ```

  下面这个示例没有看懂 ⭐,来自:[小满 zs 泛型](https://xiaoman.blog.csdn.net/article/details/122490830)

  ```ts
  let foo: {
    <T>(arg: T): T;
  };

  foo = function <T>(arg: T): T {
    return arg;
  };

  foo(123);
  ```

- 泛型类

  声明方法跟函数泛型类似。在实例化时，确定类型。

  ```ts
  class Sub<T> {
    attr: T[] = [];
    add(a: T): T[] {
      return [a];
    }
  }

  let s = new Sub<number>();
  s.attr = [1, 2, 3];
  s.add(123);
  ```

- 使用 keyof 约束对象

  定义了 T 类型并 K 类型，使用 extends 关键字继承 object 类型的子类型，
  然后使用 keyof 操作符获取 T 类型的所有键，它的返回类型是联合类型，
  最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型

  ```ts
  function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  let o = { a: 1, b: 2, c: 3 };

  prop(o, "a");
  prop(o, "d"); //err
  ```

### 1.4 结构化的类型系统（structural type system）

TypeScript 的一个核心原则是类型检查基于对象的属性和行为（type checking focuses on the shape that values have）。这有时被叫做“鸭子类型”或“结构类型”（structural typing）

如下：在结构化的类型系统当中，如果两个对象具有相同的结构，则认为它们是相同类型的。

```ts
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
logPoint(point); // "12, 26" 这里会正常打印？？？
```

上面的原因是因为在类型检查中，Ts 将 point 的结构与 Point 的结构进行比较。它们的结构相同，所以代码通过了。不过需要注意的是这种机制只需要匹配对象字段的子集。

```ts
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // 打印 "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // 打印 "33, 3"

const color = { hex: "#187ABF" };
logPoint(color); //err {hex:string} 缺少属性:x, y
```

类和对象也是可以的,如果对象或类具有所有必需的属性，则 TypeScript 将表示是它们匹配的，而不关注其实现细节。

```ts
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // 打印 "13, 56"
```

### 1.5 其它内容

上面的内容仅仅只是部分，如果需要了解更多，推荐前往[TypeScript 中文手册](https://typescript.bootcss.com/)学习，下面是你需要掌握的内容。

TypeScript tree
├─ 基本类型
│ ├─ Gone.in.Sixty.Seconds.2000.BluRay.1080p.DTS.HD.MA.5.1.x264-beAst.chs.srt
│ ├─ Gone.in.Sixty.Seconds.2000.BluRay.1080p.DTS.HD.MA.5.1.x264-beAst.chs.srt\_
│ ├─ Gone.in.Sixty.Seconds.2000.BluRay.1080p.DTS.HD.MA.5.1.x264-beAst.mkv
│ ├─ Gone.in.Sixty.Seconds.2000.BluRay.1080p.DTS.HD.MA.5.1.x264-beAst.mkv.jpg
│ ├─ Underworld.Rise.of.the.Lycans.2009.BluRay.1080p.2Audio.TrueHD.5.1.x265.10bit-BeiTai.mkv
│ └─ 来源.txt
├─ 编译
│ ├─ Van.Helsing.2004.UHD.BluRay.REMUX.2160p.HEVC.DTS-HD.MA7.1-HDS.mkv
│ └─ 来源.txt
└─ 魔幻-美国-2005-金刚-King Kong
├─ King.Kong.2005.UHD.BluRay.REMUX.2160p.HEVC.DTS-X.7.1-HDS.mkv
└─ 来源.txt
