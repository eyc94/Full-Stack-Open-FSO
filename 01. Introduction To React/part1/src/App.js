import { useState } from 'react';

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                The app is used by pressing the buttons
            </div>
        );
    }

    return (
        <div>
            Button press history: {props.allClicks.join(' ')}
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

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
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleRightClick} text="right" />
            {right}
            <History allClicks={allClicks} />
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

export default App;