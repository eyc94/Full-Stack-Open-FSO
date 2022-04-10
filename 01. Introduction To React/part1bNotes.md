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


