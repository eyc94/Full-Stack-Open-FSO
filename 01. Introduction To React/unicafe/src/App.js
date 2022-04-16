import { useState } from 'react';

const Statistics = (props) => {
    if (props.text === "positive") {
        return (
            <div>
                {props.text} {props.value} %
            </div>
        );
    }

    return (
        <div>
            {props.text} {props.value}
        </div>
    );
};

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

    if (total === 0) {
        return (
            <div>
                <h2>Give Feedback</h2>
                <button onClick={handleGood}>good</button>
                <button onClick={handleNeutral}>neutral</button>
                <button onClick={handleBad}>bad</button>

                <h2>Statistics</h2>
                <div>No feedback is given</div>
            </div>
        );
    }

    return (
        <div>
            <h2>Give Feedback</h2>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>

            <h2>Statistics</h2>
            <Statistics text="good" value={good} />
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
            <Statistics text="total" value={total} />
            <Statistics text="average" value={average} />
            <Statistics text="positive" value={positive} />
        </div>
    );
};

export default App;