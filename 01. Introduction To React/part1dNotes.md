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


