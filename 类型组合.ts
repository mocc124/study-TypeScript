// 1. 联合声明类型系统
type MyBool = true | false;

let mb: MyBool = true;

// 2. 联合描述字面量的合法值。
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

let W:WindowStates = "open";
// let P:PositiveOddNumbersUnderTen = 199; // err

// 3. 联合也提供了一种处理不同类型的方法。例如，可能有一个函数处理 array 或者 string：
function getLength(obj: string | string[]) {
  return obj.length;
}

// 4. 泛型为类型提供变量，带有泛型的数组可以描述数组包含的值。
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;


let stringArr2: StringArray = ["a","b"] 
let objectWithNameArray: ObjectWithNameArray = [{name:"jerry"}] 

// 3. 函数泛型 动态类型

/*
function str(a: string, b: string): Array<string>{ 
  return [a,b]
}

function num(a: number, b: number): Array<number>{ 
  return [a,b]
}

str("a", "b")
num(1,2)

*/
// 泛型优化
function change<T>(a:T,b:T) :Array<T>{ 
  return [a,b]
}

let stringChange = function (a:string,b:string) { 
  return change<string>(a,b)
}
let numberChange = function (a:number,b:number) { 
  return change<number>(a,b)
}
console.log(stringChange("a","b"))
console.log(numberChange(1, 7))

// 4. 接口泛型
interface MyInter<T> {
   (arg: T): T
}
 
function operation<T>(arg: T): T {
  return arg
}
 
let result: MyInter<number> = operation
 
result(123)

// 对象字面量泛型
let foo: { <T>(arg: T): T };
foo = function <T>(arg: T): T {
  return arg;
};
foo(123);

// 泛型约束

interface Len{ 
  length: number
}

function getLen<T extends Len>(a: T) { 
  return a.length
}

getLen("abc") // 3
// getLen(1) // err ,因为 number 没有 length 属性

let obj1: object = { a: 1, b: 2 };
obj1.a = 3; // error