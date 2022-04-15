import { useState } from 'react';

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

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