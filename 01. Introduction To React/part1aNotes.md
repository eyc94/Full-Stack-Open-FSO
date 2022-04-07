# Introduction to React
- We now start with the most important topic, `React` library.
- Make a simple React app and we'll get to know more about the core concepts of React.
- Easiest way is to use a tool called `create-react-app`.
- Create an app called `part1`.
```
npx create-react-app part1
cd part1
```
- Run app like so:
```
npm start
```
- By default, app runs in localhost port 3000 with address `http://localhost:3000`.
    - Browser launches automatically.
    - Open browser console.
    - Also, open a text editor.
- Code of app is in `src` folder.
- Simplify code in `index.js`:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
- The file `App.js` looks like this:
```javascript
const App = () => (
    <div>
        <p>Hello world</p>
    </div>
);

export default App;
```
- Files `App.css`, `App.test.js`, `index.css`, `logo.svg`, `setupTests.js` and `reportWebVitals.js` can be deleted.


## Component
- `App.js` defines a `React component` with the name `App`.
- Final line of `index.js` renders the `App` into the `div` element.
    - This `div` element is defined in the `public/index.html` file.
    - It has the `id` value of `root`.
- The `index.html` file does not contain any HTML markup visible in the browser.
    - When using React, all content that needs to be rendered is usually defined as React components.
- Look at the code defining the component.
    - Component rendered as a `div` that wraps a `p` tag with the text of "Hello world".
    - The component is defined as a JS function.
        - It's a function that does not receive any parameters.
    - The function is assigned to a constant variable `App`.
- Few ways to define functions in JS.
    - We use `arrow functions` here which is newer.
- The function only consists of a single expression, so we used a shorthand.
    - It is shorthand for the code below:
```javascript
const App = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    );
};
```
- The function just basically returns the value of the expression.
    - Can have any kind of JS code.
- Modify it to the following:
```javascript
const App = () => {
    console.log('Hello from component');
    return (
        <div>
            <p>Hello world</p>
        </div>
    );
};
```
- Can also render dynamic content inside a component.
- Modify it as follows:
```javascript
const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;

    return (
        <div>
            <p>Hello world, it is {now.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
        </div>
    );
};
```


