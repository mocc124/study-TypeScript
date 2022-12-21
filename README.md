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
