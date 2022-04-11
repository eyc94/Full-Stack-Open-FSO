# JavaScript
- Goal to learn JS.
- Name of JS standard is `ECMAScript`.
    - Latest is from June of 2021.
    - ECMAScript 2021 or ES12.
- Browsers don't support all of JS's new features.
    - Lot of code run in browsers have been transpiled from new version to old version of JS.
- Popular way of transpiling is using `Babel`.
    - Transpilation auto configured for apps created with `create-react-app`.
- `Node.js` is a JavaScript runtime environment.
    - Works anywhere from servers to mobile phones.
    - Practice writing JS using Node.
    - Expected that version of Node.js is at least 16.13.2.
    - Latest versions of Node already understand newest JS versions.
- Code written in files ending in `.js` and run using command: `node <name_of_file>.js`.
- Can write JS into Node.js console.
    - Opened by typing `node` in command line and dev tools.


## Variables
- Few ways to define variables.
```javascript
const x = 1;
let y = 5;

console.log(x, y);      // 1, 5 are printed.
y += 10;
console.log(x, y);      // 1, 15 are printed.
y = 'sometext';
console.log(x, y);      // 1, sometext are printed.
x = 4;                  // causes an error.
```
- `const` defines a constant that cannot be changed once assigned.
- `let` defines a normal variable.
- Type of variable can be changed during execution.
    - `y` stores an integer at first before it changes to a string.
- Can create variables using `var`.
    - Use of `var` is ill-advised and should use `let` and `const` only.
- See more information about it:
    - Javascript variables; should you use let, var or const?: `https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f`
    - ES6, var vs let: `https://www.jstips.co/en/javascript/keyword-var-vs-let/`
    - var, let and const - What, why and how - ES6 JavaScript Features: `https://www.youtube.com/watch?v=sjyJBL5fkp8`


## Arrays
- Examples of its use:
```javascript
const t = [1, -1, 3];

t.push(5);

console.log(t.length);      // 4 is printed.
console.log(t[1]);          // -1 is printed.

t.forEach(value => {
    console.log(value);     // numbers 1, -1, 3, 5 are printed, each to own line.
});
```
- Notice that the array is a `const`.
- You can still edit the array however.
- You just can't point `t` to something else.
- Iterate through an array with the `forEach` function.
    - Receives a function using the arrow syntax.
    - Calls the function for each item in the array.
    - Always passes the individual item as an argument.
    - Function as the argument of `forEach` may also receive other arguments.
- New item added using `push` method.
- In React, it's advisable to use `concat`.
    - Makes a new array with the content of the old array plus the item to be added.
```javascript
const t = [1, -1, 3];

const t2 = t.concat(5);

console.log(t);         // [1, -1, 3] is printed.
console.log(t2);        // [1, -1, 3, 5] is printed.
```
- Notice that the `concat` method creates a new array with the old array contents and the value 5.
- The old array is not modified one bit.
- Another method for arrays is `map`.
```javascript
const t = [1, 2, 3];

const m1 = t.map(value => value * 2);
console.log(m1);        // [2, 4, 6] is printed.
```
- `map` uses the old array as a basis to create a new array using the function given as a parameter.
- Original value is multiplied by 2.
- `map` can also transform the array into something different.
```javascript
const m2 = t.map(value => '<li>' + value + '</li>');
console.log(m2);
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed.
```
- An array of integers is transformed to an array of strings of HTML.
- Items of an array are easy to assign to variables with the help of the `destructuring assignment`.
```javascript
const t = [1, 2, 3, 4, 5];

const [first, second, ...rest] = t;

console.log(first, second);     // 1, 2 is printed.
console.log(rest);              // [3, 4, 5] is printed.
```
- Variables `first` and `second` will receive the first two integers of the array.
- Remaining integers are "collected" into an array of their own which is assigned to `rest`.


## Objects
- Different ways of defining objects in JS.
    - One is to use `object literals`.
        - List properties within braces.
```javascript
const object1 = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD"
};

const object2 = {
    name: "Full Stack Web Application Development",
    level: "intermediate studies",
    size: 5
};

const object3 = {
    name: {
        first: "Dan",
        last: "Abramov"
    },
    grades: [2, 3, 5, 3],
    department: "Stanford University"
};
```
- Values of properties can be of any type.
    - It can be integers, strings, arrays, objects, etc.
- Properties of objects accessed with dot notation or brackets.
```javascript
console.log(object1.name);          // Arto Hellas is printed.
const fieldName = "age";
console.log(object1[fieldName]);    // 35 is printed.
```
- Add properties to objects using dot notation or brackets.
```javascript
object1.address = "Helsinki";
object1["secret number"] = 12341;
```
- Notice the last line has to be done using brackets because there is a space.
- Objects can also have methods.
    - In this course, we don't need to define objects with methods.
- Objects can be defined using constructor functions.
- JS does not have classes like other OOP languages.
- Version ES6 has addition of class syntax.


## Functions
- We have used arrow functions.
- Complete process to defining an arrow function is:
```javascript
const sum = (p1, p2) => {
    console.log(p1);
    console.log(p2);
    return p1 + p2;
};
```
- Call the function:
```javascript
const result = sum(1, 5);
console.log(result);            // 6 is printed.
```
- If there is one parameter, we can get rid of the parentheses:
```javascript
const square = p => {
    console.log(p);
    return p * p;
};
```
- If the function only has one expression, braces are not needed.
```javascript
const square = p => p * p;
```
- Handy when manipulating arrays:
```javascript
const t = [1, 2, 3];
const tSquared = t.map(p => p * p);
// tSquared is now [1, 4, 9].
```
- Arrow functions only recently got introduced.
- Had to use the `function` keyword.
- Two ways to reference the function.
- The first is to give a name in a `function declaration`:
```javascript
function product(a, b) {
    return a * b;
};

const result = product(2, 6);
// result is now 12.
```
- The other way is using a `function expression`:
    - No need to give function a name.
```javascript
const average = function(a, b) {
    return (a + b) / 2;
}

const result = average(2, 5);
// result is now 3.5.
```
- This course uses arrow syntax.


