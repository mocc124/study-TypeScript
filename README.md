# TypeScript

推荐资源：
[TypeScript 中文手册](https://typescript.bootcss.com/)、
[一篇让你完全够用 TS 的指南](https://juejin.cn/post/7088304364078497800)、
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
- 打包
  - webpack

## 一、了解 TS

ts 的目标是成为 js 程序的静态类型检查工具，可以在编译时期（执行之前）以静态检查的方式保证程序中的类型都是正确的。ts 提供了 js 的所有特性并在上面加了一层 ts 类型系统。

例如：JS 不检查你在赋值时与类型是否匹配，而 TypeScript 提供了这样的功能。

为什么要使用它:相对于 JS 而言，TS 属于强类型语言，会使代码更加规范，从而解决了大型项目代码的复杂性，而且 TypeScript 可以检查代码中的意外行为，从而降低出现错误的机会。

注意的一点是浏览器不识别 TS 文件，所以在编译的时候，TS 文件会先编译为 JS 文件。

在开始之前，需要准备内容：全局安装 `npm install typescript -g`，后面 ts 文件的编译命令使用`tsc`，当然，也可以在线编译:[TypeScript Playground](https://www.typescriptlang.org/zh/play)

## 二、类型系统

这里将 TS 的数据类型简单的进行下归类：

- 基本类型：string、number、boolean、symbol、bigint、null、undefined
- 引用类型：array、 Tuple(元组)、 object(包含 Object 和{})、function
- 特殊类型：any、unknow、void、never、Enum(枚举)
- 其他类型：类型推理、字面量类型、交叉类型、联合类型

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

1. 默认情况下 null 和 undefined 是所有类型的子类型。 如可以把 null 和 undefined 赋值给 number 类型的变量。当指定了--strictNullChecks 标记（推荐），null 和 undefined 就只能赋值给 void 和它们各自。
2. symbol 是独一无二的， `sym === sym1` 结果为 false

### 引用类型

#### Array

Ts 像 Js 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，Array<元素类型>：

```ts
let list: Array<number> = [1, 2, 3];
```

#### Tuple（元组，Ts 中特有）

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string 和 number 类型的元组。

```ts
// Declare a tuple type
let x: [string, number];

x = ["hello", 10]; // OK
x = [10, "hello"]; // Error Initialize it incorrectly
```

访问一个已知索引的元素，会得到正确的类型。

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

越界的元素会使用联合类型替代：

```ts
x[3] = "world"; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

在 TS 中,是允许对 Tuple 扩容（ push 方法），但在访问上不允许。

```ts
let t: [number, string] = [1, "2"]; // ok

t.push(7);
console.log(t); // [1, '2', 7]
let c = t[2]; //  error：Tuple has no element at index '2'.
```

#### object 和 Object

**object 表示非原始类型（小写的 o）**，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
```

**Object(大写的 O）**，代表所有的原始类型或非原始类型都可以进行赋值,除了 null 和`undefined

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

Object 在定义时可以直接使用 object 类型并赋值，但不能更改属性。

```ts
let obj1: object = { a: 1, b: 2 };
obj1.a = 3; // error，类型 object 上不存在属性 a
```

原因是并没有使对象的内部具体的属性做限制，所以需要使用 {} 来定义内部类型。

```ts
let obj: { a: number; b: number } = { a: 1, b: 2 };
obj.a = 3; // ok
```

⭐ 对象解构

```ts
let o = {
  a: "foo",
  b: 12,
  c: "bar",
};
let { a, b } = o; // 通过 o.a and o.b 创建了 a 和 b ，不需要 c 则可以忽略
```

可以用没有声明的赋值，但是有一个注意点：我们需要用括号将它括起来，因为 Javascript 通常会将以 { 起始的语句解析为一个块。

```ts
let a: string, b: number;
({ a, b } = { a: "baz", b: 101 });
console.log(a, b); // "baz",  101
```

也可以使用 Spread 语法创建剩余变量：

```ts
let { a, ...passthrough } = { a: 1, b: "2", c: "end" };
let total = passthrough.b + passthrough.c.length;
console.log(total);
```

⭐ 属性的重命名,给属性以不同的名字

```ts
let o = {
  a: "foo",
  b: 12,
};
let { a: newName1, b: newName2 } = o; //数组解构并重命名
console.log(newName1); // "foo"
```

如果你想指定它的类型， 仍然需要在其后写上完整的模式。注意：这里的冒号不是指示类型的

```ts
let { a, b }: { a: string; b: number } = o;
```

⭐ 对象展开的一些注意点：

- 出现在展开对象后面的属性会覆盖前面的属性
- 展开操作会创建目标的一份浅拷贝
- 它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
- TypeScript 编译器不允许展开泛型函数上的类型参数，未来版本中可能会考虑实现

#### function

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

#### 类型推导

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

#### 函数参数类型

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

#### 函数重载

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

#### this 和箭头函数

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

#### 回调函数里的 this

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

#### any

当我们不清楚类型的变量，这些值可能来自于动态的内容，我们可以使用 any 类型来标记这些变量们，那么类型检查器不会对这些值进行检查而是直接让它们通过编译阶段的检查。也就是说，在 TS 中，任何类型都可以归于 any 类型，所以 any 类型也就成了所有类型的顶级类型，同时，如果不指定变量的类型，则默认为 any 类型, 当然不推荐使用该类型，因为这样丧失了 TS 的作用。

any 类型可以被用于指定数组元素，像这样:`let list: any[] `，指定数组元素为不同类型的数据。

与它相似的还有 Object 类型，但 Object 类型的变量只是允许你给它赋任意值，却不能够在它上面调用任意的方法。

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

#### unknow

与 any 一样，都可以作为所有类型的顶级类型，但 unknow 更加严格，那么可以说除了 any 之下的第二大类型。

两者的区别在于：

- unknow 会对值进行检测，而类型 any 不会做检测操作（any 类型可以赋值给任何类型，但 unknow 只能赋值给 unknow 和 any 类型）
- unknow 不允许定义的值有任何操作（如 方法，new 等），但 any 可以

#### Void

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。如，当一个函数没有返回值时，通常会指定其返回值类型是 void，这也是其最主要的用法。

单独声明一个 void 类型的变量没有什么用，因为你只能为它赋予 undefined 和 null。

#### never

never 类型表示那些永不存在的值的类型。例如总会抛出异常或没有返回值的函数表达式或箭头函数表达式的返回值类型；或者被用来约束一个变量，为其指定为永不为真的类型。

never 类型是任何类型的子类型，也可以赋值给任何类型。然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。即使 any 也不可以赋值给 never。

返回 never 类型的函数有以下几种情况:

```ts
// 返回never的函数必须存在无法达到的终点（抛出异常）
function error(message: string): never {
  throw new Error(message);
}

// 返回never的函数必须存在无法达到的终点（无限死循环）
function infiniteLoop(): never {
  while (true) {}
}
```

#### Enum

enum 类型是对 Js 标准数据类型的一个补充。像其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

⭐ 注意：

- 枚举的类型只能是 string 或 number
- 定义的名称不能为关键字

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // 正向映射
```

默认情况下，从 0 开始为元素编号，也可以手动的指定成员的数值（只会对下面的值产生影响）。如下:

```ts
// 将上面的例子改成从 1 开始编号：
enum Color {
  Red = 1,
  Green,
  Blue,
}

// 或者，全部手动赋值：

enum Color2 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
```

枚举类型提供了从编号访问枚举值的方式（反向映射），这与数组的访问类似。如下

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

console.log(colorName); // 'Green'
```

⭐ 补充正向映射和反向映射:

- 正向映射（从成员值到成员名的映射）
- 反向映射（从成员值到成员名的映射），常量枚举和字符串形式的枚举类型均不支持反向映射

除了上面的枚举值为 number 的情况（默认），还支持值为字符串。需要注意的是每个枚举项必须要有默认值，而且也不支持反向映射。

```ts
enum Color {
  Red = "#FF0000",
  Grey = "#1C1C1C",
  Blue = "#0000FF",
  Green = "#00FF00",
}

let red16: Color = Color.Red;
let red: Color = Color["FF0000"]; // err
```

常量枚举

通过 const 定义的 enum 不会被编译成任何 JS,只会编译对应的值

```ts
const enum Cards {
  Hearts = 1,
  Spades,
  Clubs,
  Diamonds,
}

let card1: Cards = Cards.Hearts; // 会被编译为 let card1 = 1;
let card2: Cards = Cards.Clubs; // 会被编译为 let card1 = 3;
```

异构枚举

指的是包含了 数字类型 和 字符串类型 的混合，反向映射也是相同的规则。

```ts
enum typeData {
  A,
  B,
  C = "c",
  D = "d",
  E = 20,
  F,
}

let a: typeData = typeData[0]; // ??
let f: typeData = typeData[5]; // ??
```

### 类型推论机制

在开发中，我们要不要每个类型都要去写字段？其实可以不用写，在 TS 中没有明确指出类型的地方，类型推论会帮助提供类型。这种推断会发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

```ts
let x = [0, 1, null]; // x: (number | null)[]
```

类型推论大部分时候可以正确提供类型，但由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型。

```ts
class Animal {}
class Rhino extends Animal {}
class Elephant extends Animal {}
class Snake extends Animal {}

let zoo = [new Rhino(), new Elephant(), new Snake()]; // (Rhino | Elephant | Snake)[]
```

因此，当候选类型不能使用的时候我们需要明确的指出类型，

```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

这些通常出现在函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句处。：

```ts
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
```

### 字面量类型

在 TS 中，我们可以自定义参数的类型是什么，目前支持字符串、数字、布尔三种类型。

```ts
let status: "King" | "Queen";

status = "King"; //ok
status = "Donmesy"; // error
```

### 自定义类型与交叉类型

#### 自定义类型

自定义类型的写法类似于一个对象字面量，不过需要 type 修饰符

```ts
type allProps = { title: string; content: string; time: Date };

const works: allProps = {
  title: "标题",
  content: "...",
  time: new Date(),
};
```

可以将自定义类型嵌套在一起

```ts
type Time = { time: Date };
type Work = {
  title: string;
  content: string;
  time: Time;
};
```

#### 交叉类型

交叉类型会自动进行合并

```ts
type work = { title: string; content: string };
type time = { time: Date };

type allProps = work & time;

const works: allProps = {
  title: "标题",
  content: "...",
  time: new Date(),
};
```

##### 同名基础属性合并

如果交叉类型基础属性冲突，最终会被赋予 never 类型。

```ts
type AProps = { a: string; c: number };
type BProps = { b: number; c: string };

type allProps = AProps & BProps; // 都有c属性

const Info: allProps = {
  a: "ab",
  b: 7,
  c: 1, // error (property) c: never
  c: "abc", // error (property) c: never
};
```

##### 同名非基础属性合并

对于混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

```ts
interface A {
  a: number;
}
interface B {
  b: string;
}

interface C {
  x: A;
}
interface D {
  x: B;
}

type allProps = C & D; // 都有x属性

const Info: allProps = {
  x: {
    a: 7,
    b: "abc",
  },
};

console.log(Info); // { x: { "a": 7, "b": "abc" }}
```

### Class 类

#### 基本方法

静态属性，静态方法、成员属性、成员方法、构造器、get set 方法

#### 私有字段

#### 只读属性

#### 继承

#### 修饰符

#### abstract

#### 重写和重载

### Ts 断言

#### 非空断言

#### 确定赋值断言

#### 双重断言

#### 类型断言

有时候你会遇到这样的情况，你会比 Ts 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。通过类型断言这种方式可以告诉编译器: “我知道自己在干什么”

类型断言对运行时没有影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 一为 as 语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

另一个是“尖括号”语法（当 Ts 中有使用 JSX 时，这种语法是不合法的）：

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

### 类型守卫

#### in

#### typeof

#### instanceof

#### is

#### 类型守卫和类型断言的区别
