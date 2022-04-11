# Component State, Event Handlers
- Start with a new example:
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


## Component Helper Functions
- Expand `Hello` component so it guesses the year of birth of person being greeted:
```javascript
const Hello = (props) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        return yearNow - props.age;
    };

    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- Logic is in a separate function as you can see.
- Notice the function can directly access the `props` input.
- Notice also we define a function in a function, which is common in JS.


## Destructuring
- Can destructure values from objects upon assignment.
- We previously referenced data like `props.name` and `props.age`.
- We know `props` is an object.
```javascript
props = {
    name: "Arto Hellas",
    age: 35
};
```
- Can assign values of properties directly into variables `name` and `age`:
```javascript
const Hello = (props) => {
    const name = props.name;
    const age = props.age;

    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- Notice the compact form of the arrow function.
- Two function definitions below are the same:
```javascript
const bornYear = () => new Date().getFullYear() - age;

const bornYear = () => {
    return new Date().getFullYear() - age;
};
```
- Now we destructure:
```javascript
const Hello = (props) => {
    const { name, age } = props;
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- If the object has the values below:
```javascript
props = {
    name: "Arto Hellas",
    age: 35
};
```
- The expressions `const { name, age } = props` assigns "Arto Hellas" to `name` and 35 to `age`.
- Take destructuring a step further:
```javascript
const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- We destructure directly in the definition of the component.


## Page Re-rendering
- Our app just stays static.
- What if we wanted a counter where the value increased as a function of time?
- Change `App.js`:
```javascript
const App = (props) => {
    const { counter } = props;
    return (
        <div>{counter}</div>
    );
};

export default App;
```
- Change `index.js`:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

let counter = 1;

ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root')
);
```
- Changes to `index.js` does not automatically reload the page, so refresh the browser.
- `App` is given the value of `counter`.
- The value is rendered to the screen.
- Even if we changed the `counter` value by 1, the component does not re-render.
- We can re-render it by calling the `ReactDOM.render` method a second time:
```javascript
let counter = 1;

const refresh = () => {
    ReactDOM.render(
        <App counter={counter} />,
        document.getElementById('root')
    );
};

refresh();
counter += 1;
refresh();
counter += 1;
refresh();
```
- The re-render function is stored in the `refresh` function.
- Component now renders 3 times with 1, 2, then 3.
    - However, 1 and 2 are only shown really quickly, so you cannot see it fast enough.
- We can instead use `setInterval` to make it increment counter and refresh every 1 second.
```javascript
setInterval(() => {
    refresh();
    counter += 1;
}, 1000);
```
- However, repeatedly calling `ReactDOM.render` is NOT recommended.


## Stateful Component
- Our components have no state that can change during the lifecycle of the component.
- Add state to `App` component with React's `state hook`.
- Change `index.js` back to:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDom.render(
    <App />,
    document.getElementById('root')
);
```
- Change `App.js` to:
```javascript
import { useState } from 'react';

const App = () => {
    const [ counter, setCounter ] = useState(0);

    setTimeout(
        () => setCounter(counter + 1),
        1000
    );

    return (
        <div>{counter}</div>
    );
};

export default App;
```
- The file imports the `useState` function.
- The function body starts with a function call:
```javascript
const [ counter, setCounter ] = useState(0);
```
- Function call adds state to component and renders it initialized with the value of 0.
    - Returns array with two items.
    - Assign items to variables `counter` and `setCounter`.
    - Uses `destructuring`.
- The `counter` is assigned an initial value of 0.
- The `setCounter` is assigned a function that modifies the state.
- App calls `setTimeout` and passes two parameters:
    - A function to increment the counter state.
    - A timeout of 1 second.
- Function that is passed to `setTimeout` is called 1 second after calling `setTimeout`.
- When state is modified, React re-renders the component.
    - Function body of component gets re-executed.
    - During the second call of the function body, `useState` is called with the value of 1.
    - The `setTimeout` is called again while incrementing the counter to 2.
    - Meanwhile the counter value of 1 is rendered.
- Process repeats until app is killed.
- Can debug using logs to see when the render happens.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0);

    setTimeout(
        () => setCounter(counter + 1),
        1000
    );

    console.log('rendering...', counter);

    return (
        <div>{counter}</div>
    );
};
```


## Event Handling
- A user's actions can cause events to be triggered.
- Change the app so that the counter value changes when a user clicks a button.
    - Done with `button` element.
- Button elements support `mouse events`.
    - `click` is the most common.
- The click event on a button can be triggered with keyboard or touch screen.
- In React, registering event handler is done like so:
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0);

    const handleClick = () => {
        console.log("clicked");
    };

    return (
        <div>
            <div>{counter}</div>
            <button onClick={handleClick}>
                plus
            </button>
        </div>
    );
};
```
- Set value of `onClick` attribute of the `button` element to be a reference to the `handleClick` function that is defined.
- Every click of the button causes the `handleClick` function to be called.
    - Log a message to the console.
- Event handler function can also be defined directly in the value.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0);

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => console.log("clicked")}>
                plus
            </button>
        </div>
    );
};
```
- Change to below:
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0);

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
        </div>
    );
};
```
- The value of `counter` is increased by 1 when button is clicked and component is re-rendered.
- Add a button for resetting.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0);

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
            <button onClick={() => setCounter(0)}>
                zero
            </button>
        </div>
    );
};
```


