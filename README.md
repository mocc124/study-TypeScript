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

**Array**

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

**Object**

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

**function**

定义函数的两种方式:一种为 function， 另一种为箭头函数/匿名函数（这种方式很容易与箭头函数的写法混淆）。
函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。
如果函数没有返回任何值，你也必须指定返回值类型为 void 而不能留空。

```ts
// 使用关键字的形式
let myAdd = function (x: number, y: number): number {
  return x + y;
};

// 匿名函数形式
let myAdd3: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// 声明并赋值拆分，可能更容易理解
let myAdd: (x: number, y: number) => number;
myAdd = function (x: number, y: number): number {
  return x + y;
};
```

**类型推导**

赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型，这叫做“按上下文归类”，是类型推论的一种。

```ts
// The parameters `x` and `y` have the type number
let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};

// or
let myAdd = function (x: number, y: number) {
  return x + y;
};
```

**函数参数类型**

- 可选参数： 在 TypeScript 里我们可以在参数名旁使用 ?实现可选参数的功能，且
- 可选参数必须在必须参数后面。

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob");
let result3 = buildName("Bob", "Adams");
let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
```

- 默认参数：用 = 可以为参数提供一个默认值，当用户没有传参或传递的值是 undefined 时会被赋值。
- 默认参数调用时可以被省略。
- 带默认值的参数不需要放在必须参数的后面。 如果默认参数出现在必须参数前，不传参的情况必须明确传入 undefined 值来获得默认值。

```ts
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
buildName("Bob", "Adams");
buildName("Bob"); // 默认参数可以被省略调用

function buildName3(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName3("Bob"); // error, too few parameters
let result2 = buildName3("Bob", "Adams", "Sr."); // error, too many parameters
let result3 = buildName3("Bob", "Adams"); // okay and returns "Bob Adams"
let result4 = buildName3(undefined, "Adams"); // okay and returns "Will Adams"
```

- 剩余参数：仍可以使用扩展运算符 ...
- 剩余参数会被当做个数不限的可选参数，编译器会创建参数数组，名字是你在省略号后给定的名字，函数体内可以此数组。

```ts
const allCount = (...numbers: number[]) =>
  console.log(`数字总和为：${numbers.reduce((val, item) => (val += item), 0)}`);
allCount(1, 2, 3); //"数字总和为：6"
```

**函数重载**

js 本身是个动态语言，js 里函数根据传入不同的参数而返回不同类型的数据是很常见的。

函数重载指使用相同名称和不同参数数量或类型创建多个方法的一种能力，表现为给同一个函数提供多个函数类型定义。（重载函数规定了形参与返回值的模式，执行函数负责逻辑业务的执行）

一个简单的例子：

```ts
interface Person {
  name: string;
  age: number;
}

function setInfo(name: string): boolean; //重载函数1
function setInfo(name: string, age: number): Person; //重载函数2
function setInfo(name: string, age?: number): any {
  // 执行函数
  // 执行函数会按照参数类型规则匹配重载函数
  if (age === undefined) return Math.random() * 10 >= 5;
  let person: Person = {
    name,
    age,
  };
  return person;
}
```

### this

由于 ts 是 js 的超集，ts 程序员也需要弄清 this 工作机制并且当有 bug 的时候能够找出错误所在。幸运的是，ts 能通知你错误地使用了 this 的地方。

如果想要理解 this 的工作原理请前往:[Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/),Yehuda 的这篇文章详细的阐述了 this 的内部工作原理。

**this 和箭头函数**

JavaScript 里，this 的值在函数被调用的时候才会指定。 因此我们需要弄清楚函数调用的上下文是什么。 但这不是一件简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。下面看一个例子：

```js
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52); //选牌
      let pickedSuit = Math.floor(pickedCard / 13); //选花色

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

因为 createCardPicker 返回的函数里的 this 被设置成了 window 而不是 deck 对象。 因为我们只是独立的调用了 cardPicker()，顶级的非方法式调用会将 this 视为 window。（注意：在严格模式下， this 为 undefined 而不是 window）。

为了解决这个问题，我们可以在函数被返回时就绑好正确的 this。 这样的话，无论之后怎么使用它，都会引用绑定的‘deck’对象。 我们可以提供一个显式的 this 参数来修改 this，或者使用 ES6 箭头函数，因为箭头函数能保存函数创建时的 this 值，而不是调用时的值。

```ts
function f(this: void) {}
// or
function f() {
  return () => {};
}
```

更好事情是，如果发生了以上情况，TypeScript 会发出警告，如果你给编译器设置了--noImplicitThis 标记。它会说明 this.suits[pickedSuit]里的 this 的类型为 any。这是因为 this 来自对象字面量里的函数表达式。让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：

```ts
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card; // createCardPicker方法返回一个函数
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: 该函数现在显式指定其被调用方的类型必须为 Dack
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

**this 参数在回调函数里**

当你将一个函数传递到某个函数里稍后会被调用时可能会出错。因为当回调被调用的时候，它们会被当成一个普通函数调用，this 将为 undefined。

⭕ 这里[官方文档演示](https://www.tslang.cn/docs/handbook/functions.html)没有看懂，先挖个坑，以后有机会再来补。下面这个是 js 中回调函数 this 指向丢失的情况。

```js
function callback() {
  console.log(this.a);
}

function fn(callback) {
  callback();
}

let obj = {
  a: 2,
  fn: callback,
};

fn(obj.fn); // ??
```

### 特殊类型
