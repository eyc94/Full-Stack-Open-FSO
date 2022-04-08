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
- JS code in curly braces is evaluated and the result is printed in the place of the curly braces.


## JSX
- Looks like our component is returning HTML, but it's not.
- The layout of React components is mostly written using `JSX`.
    - Looks like HTML.
    - We are dealing with a way to write JS.
- JSX returned by React is compiled into JS.
- After compiling, app looks like this:
```javascript
const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'p', null, 'Hello world, it is ', now.toString()
        ),
        React.createELement(
            'p', null, a, ' plus ', b, ' is ', a + b
        )
    );
};
```
- Compiling is handled by `Babel`. Done automatically to projects created with `create-react-app`.
- Can write React as 'pure JS', but that's dumb.
- JSX is like HTML, but with JSX you can embed JS using curly braces.
    - Like a templating language.
    - Like `XML` because every tag needs to be closed.
- For example, `<br>` needs to be written like `<br />`.


## Multiple Components
- Modify `App.js` and note the export statement is left out.
```javascript
const Hello = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello />
        </div>
    );
};
```
- Defined new `Hello` component and used inside `App` component.
- Can use this component multiple times:
```javascript
const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello />
            <Hello />
            <Hello />
        </div>
    );
};
```
- Compose apps of many reusable components.
- Strong convention is having a root component called `App` at the top of the component tree of the application.


## props: Passing Data To Components
- Pass data to components using `props`.
- Modify the `Hello` component:
```javascript
const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}</p>
        </div>
    );
};
```
- Function has a parameter called `props`.
    - Parameter receives an object.
    - This object has fields corresponding to all the "props" the user of the component defines.
- The props defined as follows:
```javascript
const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="George" />
            <Hello name="Daisy" />
        </div>
    );
};
```
- There can be as many props.
    - Values can be hard-coded or be JS expressions.
    - Values achieved using JS expressions must be wrapped with curly braces.
- Modify `Hello` component to use two props:
```javascript
const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    );
};

const App = () => {
    const name = "Peter";
    const age = 10;

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </div>
    );
};
```
- As you can see, we pass hard-coded strings, result of expressions, and variables inside curly braces.


## Some Notes
- React gives clear error messages.
- Work in small steps.
- Console should be open.
- If you encounter errors, go back. Don't continue.
- Write `console.log()` commands.
- React component names **must** be capitalized.
- Content of a React component needs to contain **one root element**.
    - Can also use an `array` of components.
```javascript
const App = () => {
    return [
        <h1>Greetings</h1>,
        <Hello name="Maya" age={26 + 10} />,
        <Footer />
    ];
};
```
- Not wise however.
- Can use `fragments` by wrapping elements to be returned with an empty element.
```javascript
const App = () => {
    const name = "Peter";
    const age = 10;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </>
    );
};
```

