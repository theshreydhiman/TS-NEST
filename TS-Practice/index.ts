function Message(){
    console.log('Hello  ');
}

Message();

function greet(person: string, date: Date) {
    console.log(Date());
    console.log(new Date());
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("Brendan",new Date());

function flipCoin() {
    console.log(Math.random());
  return Math.random() < 0.5;
}

console.log(flipCoin());

let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.

obj.bar = 100;
console.log(obj);
obj = "hello";
console.log(obj);
const n: number = obj;
console.log('n',n);

const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

interface point{
    x: number;
    y: number;
}

function printPoints(pt: point){
    console.log(pt);
}

printPoints({x: 3, y: 4});

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

welcomePeople('Shrey');

type person = {
    name: string | null
}

type personAge = person & {
    age: number
}

let A = {
    name:'Shrey',
    age: 27
};

const getAge = (person: personAge | null) => {
    console.log(`${person!.name}'s Age is: ${person!.age}`);
}

getAge(A);


const a = '5' as any as number;
const b = 2;

console.log(Number(a)+b);

let changing: 'Changing' | 'changes' = 'Changing';

let arr = [0,1];

arr = [0,2];

declare function handleRequest(url: string, method: "GET"): void;

const req =  { url: "https://example.com", method: "GET" } as const;

// handleRequest(req.url, req.method);ß

const oneHundred: bigint = BigInt(1000000000000);

console.log(oneHundred);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 1004n;

console.log(anotherHundred)

const firstName = Symbol("name");
const secondName = Symbol("name");

console.log(firstName == secondName);