import { useState } from 'react';

const App = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        console.log("clicked");
    }

    return (
        <div>
            <div>{counter}</div>
            <button onClick={handleClick}>
                plus
            </button>
        </div>
    );
};

// const Hello = ({ name, age }) => {
//     const bornYear = () => new Date().getFullYear() - age;

//     return (
//         <div>
//             <p>Hello {name}, you are {age} years old</p>
//             <p>So you were probably born in {bornYear()}</p>
//         </div>
//     );
// };

// Before the counter implementation.
// const App = () => {
//     const name = "Peter";
//     const age = 10;

//     return (
//         <div>
//             <h1>Greetings</h1>
//             <Hello name="Maya" age={26 + 10} />
//             <Hello name={name} age={age} />
//         </div>
//     );
// };

export default App;