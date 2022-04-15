import { useState } from 'react';

const App = () => {
    // const [left, setLeft] = useState(0);
    // const [right, setRight] = useState(0);
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


// const App = () => {
//     const [counter, setCounter] = useState(0);

//     const increaseByOne = () => setCounter(counter + 1);
//     const decreaseByOne = () => setCounter(counter - 1);
//     const setToZero = () => setCounter(0);

//     return (
//         <div>
//             <Display counter={counter} />
//             <Button
//                 onClick={increaseByOne}
//                 text="plus"
//             />
//             <Button
//                 onClick={setToZero}
//                 text="zero"
//             />
//             <Button
//                 onClick={decreaseByOne}
//                 text="minus"
//             />
//         </div>
//     );
// };

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

export default App;