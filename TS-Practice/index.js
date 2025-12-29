function Message() {
    console.log('Hello  ');
}
Message();
function greet(person, date) {
    console.log(Date());
    console.log(new Date());
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Brendan", new Date());
function flipCoin() {
    console.log(Math.random());
    return Math.random() < 0.5;
}
console.log(flipCoin());
var obj = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.bar = 100;
console.log(obj);
obj = "hello";
console.log(obj);
var n = obj;
console.log('n', n);
var names = ["Alice", "Bob", "Eve"];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
function printPoints(pt) {
    console.log(pt);
}
printPoints({ x: 3, y: 4 });
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}
welcomePeople('Shrey');
var A = {
    name: 'Shrey',
    age: 27
};
var getAge = function (person) {
    console.log("".concat(person.name, "'s Age is: ").concat(person.age));
};
getAge(A);
var a = '5';
var b = 2;
console.log(Number(a) + b);
var changing = 'Changing';
var arr = [0, 1];
arr = [0, 2];
var req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);ß
const anotherHundred = 1004n;