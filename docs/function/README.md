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
// let myAdd: (x: number, y: number) => number;
// myAdd = function (x: number, y: number): number {
//   return x + y;
// };
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

