# A More Complex State, Debugging React Apps

## A Note On React Version
- Version 18 of React came out late March 2022.
- Code here should work with new React version.
- Some libraries are not yet compatible (like part 8 `Apollo` client).
    - Then downgrade to the older React by changing `package.json`:
```json
{
    "dependencies": {
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-scripts": "5.0.0",
        "web-vitals": "^2.1.4"
    },
    // ...
}
```
- After the changes, run `npm install` to reinstall dependencies.
- Also note that `index.js` needs to be changed a bit.
- React 18 is like this:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
- React 17 is:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```


## Complex State
- What if app requires more complex state.
- It was an integer before.
- Best way is to create separate pieces of state by using `useState` multiple times.
- The following has two pieces of state for `left` and `right` with initial value of 0.
```javascript
const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    return (
        <div>
            {left}
            <button onClick={() => setLeft(left + 1)}>
                left
            </button>
            <button onClick={() => setRight(right + 1)}>
                right
            </button>
            {right}
        </div>
    );
};
```
- Can update the states with the functions `setLeft` and `setRight`.
- The piece of state can by any type.
- Can implement the same function with an object with properties `left` and `right`:
```javascript
{
    left: 0,
    right: 0
}
```
- The App would look like:
```javascript
const App = () => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
    });

    const handleLeftClick = () => {
        const newClicks = {
            left: clicks.left + 1,
            right: clicks.right
        };
        setClicks(newClicks);
    };

    const handleRightClick = () => {
        const newClicks = {
            left: clicks.left,
            right: clicks.right + 1
        };
        setClicks(newClicks);
    };

    return (
        <div>
            {clicks.left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {clicks.right}
        </div>
    );
};
```
- Now app has single state and event handlers take care of changing the app state.
- Event handlers are messy.
    - Can define the new state object more neatly with `object spread` syntax:
```javascript
const handleLeftClick = () => {
    const newClicks = {
        ...clicks,
        left: clicks.left + 1
    };
    setClicks(newClicks);
};

const handleRightClick = () => {
    const newClicks = {
        ...clicks,
        right: clicks.right + 1
    };
    setClicks(newClicks);
};
```
- The `{ ...clicks }` creates a new object with copies of the properties of the `clicks` object.
- If we do `{ ...clicks, right: 1 }`, the value of `right` will be 1 in the new object.
- Basically, `{ ...clicks, right: clicks.right + 1 }` creates a copy of `clicks` object where the value of `right` is increased by 1.
- Don't need to assign new object to variable.
- Simplify like so:
```javascript
const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });
const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 });
```
- Why didn't we just update state directly?
```javascript
const handleLeftClick = () => {
    clicks.left++;
    setClicks(clicks);
};
```
- It is *forbidden* to mutate state directly!
- Changing state has to be done by setting the state to a **new** object.
- If properties of object did not change, just copy to a new object.
- This is why storing all state in a single state object is bad!
- Storing click counter into separate `left` and `right` states is better!


## Handling Arrays
- Add state containing an array called `allClick` that keeps track of every click that occurred in the app:
```javascript
const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClick, setAll] = useState([]);

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'));
        setLeft(left + 1);
    };

    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        setRight(right + 1);
    };

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <p>{allClicks.join(' ')}</p>
        </div>
    );
};
```
- Clicks are stored in the array.
    - Initialized as empty.
- Clicking the left button causes the `L` to be added to `allClicks` array.
- The state stored in `allClicks` is an array with all previous states plus `L`.
    - Adding new item is done with `concat`.
    - It does not mutate the state directly.
    - It creates a new copy of the array with the item added to it.
- Do NOT use the `push` method because it mutates the state directly.
- The `join` method is called on `allClicks` that joins all items in a single string separated by a space.


## Conditional Rendering
- Modify so rendering of history is handled by a `History` component:
```javascript
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        );
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    );
};

const App = () => {
    // ...

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <History allClicks={allClicks} />
        </div>
    );
};
```
- Behavior depends on whether the buttons have been clicked.
- If buttons have not been clicked, the `allClicks` array is empty.
    - The component renders a `div` with instructions.
- Otherwise, it renders the clicking history.
- This is called `conditional rendering`.
    - There are other ways to conditionally render something.
- Make one more modification to app by refactoring it to use `Button` component:
```javascript
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        );
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    );
};

const Button = ({ handleClick, text }) => {
    <button onClick={handleClick}>
        {text}
    </button>
};

const App = () => {
    // ...

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleRightClick} text="right" />
            {right}
            <History allClicks={allClicks} />
        </div>
    );
};
```


## Old React
- We use state hooks in new React.
- In old React, we use `class` components to define state.
    - Use JS class syntax.
- Should learn class syntax for legacy React code that's still out there.


## Debugging React Applications
- Important to be able to debug.
- Keep developer console open at all times!
- If there is an error, fix it before moving on.
- Print based debugging is a good idea.
    - Logging with `console.log` can be done on multiple things separated with a comma.
- Write command `debugger` in your code to use it.
    - Code execution stops where the `debugger` statement is.
    - Can also use breakpoints instead of the statement.
        - Done in `Sources` tab.
- Can see variable values in the `Scope` section of the `Sources` tab.
- Should also have `React developer tools` extension to Chrome.
    - This adds a `Components` tab.
    - Shows the state of hooks in the order of their definition.


## Rules of Hooks
- `useState` and `useEffect` functions cannot be called in a loop, a conditional expression, or any place that is not a function defining a component.
    - Because we need to ensure the hooks are called in the same order.
- Example of okay and not okay below:
```javascript
const App = () => {
    // These are okay.
    const [age, setAge] = useState(0);
    const [name, setName] = useState("Juha Tauriainen");

    // This does not work!
    if (age > 10) {
        const [foobar, setFoobar] = useState(null);
    }

    // This is not good!
    for (let i = 0; i < age; i++) {
        const [rightWay, setRightWay] = useState(false);
    }

    const notGood = () => {
        // This is also illegal!
        const [x, setX] = useState(-1000);
    };

    return (
        // ...
    );
};
```


## Event Handling Revisited
- Revisiting topic.
- Assume we are developing this simple app with `App` component:
```javascript
const App = () => {
    const [value, setValue] = useState(10);

    return (
        <div>
            {value}
            <button>reset to zero</button>
        </div>
    );
};
```
- Want to reset state when button is clicked.
    - Need to add an event handler to it.
- Event handlers must be a `function` or a `reference to a function`.
    - Otherwise if it is any other type, it will not work!
```javascript
<button onClick={console.log("clicked the button")}>
    button
</button>
```
- It logs once when the component is rendered.
- Nothing happens when we click the button. Why?
    - This is because the event handler above is a `function call`.
    - This means the event handler is actually assigned the return value of the function, `undefined`.
```javascript
<button onClick={setValue(0)}>button</button>
```
- The code above causes an infinite recursion.
    - This is because calling `setValue()` causes rerendering of the component.
    - This calls the function again which causes rerendering over and over.
- The proper way is below:
```javascript
<button onClick={() => console.log("clicked the button")}>
    button
</button>
```
- Resetting function is done:
```javascript
<button onClick={() => setValue(0)}>
    button
</button>
```
- Defining event handlers inside the attribute is not good practice:
- Best to define somewhere else.
```javascript
const App = () => {
    const [value, setValue] = useState(10);

    const handleClick = () => {
        console.log("Clicked the button");
        setValue(0);
    };

    return (
        <div>
            {value}
            <button onClick={handleClick}>button</button>
        </div>
    );
};
```


