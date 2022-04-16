import { useState } from 'react';

const App = () => {
    // Save clicks of each button to its own state.
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => {
        setGood(good + 1);
    };

    const handleNeutral = () => {
        setNeutral(neutral + 1);
    };

    const handleBad = () => {
        setBad(bad + 1);
    };

    const total = good + bad + neutral;
    const average = (total === 0) ? 0 : (good - bad) / total;
    const positive = (total === 0) ? 0 : good / total;

    return (
        <div>
            <h2>Give Feedback</h2>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>

            <h2>Statistics</h2>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {average}</div>
            <div>positive {positive} %</div>
        </div>
    );
};

export default App;