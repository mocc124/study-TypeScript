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
