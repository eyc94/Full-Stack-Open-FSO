import { useState } from 'react';

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