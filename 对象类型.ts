// 使用 interface 来定义约束 Object
interface Person {
  name: string; // 属性
  age: number; // 属性
  say(lanuage:string): void; //方法
}

const pp: Person = {
  name: "tom",
  age: 18,
  say(lanuage:string){
    console.log() 
  }
};
pp.say("english")

// 重名interface  可以合并
interface A {
  name: string;
}
interface A {
  age: number;
}
var x: A = { name: "xx", age: 20 };

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
  address: "xxxxx花牛街"
};


// 可选属性可以使用 typeName?:type 的形式定义
// 任意属性使用 [propName: type]: type  的形式定义
// readonly 前缀则限制属性只读，不允许被赋值，如 "readonly id: number"



