import { useState } from 'react';

const Statistics = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr><StatisticLine text="good" value={props.good} /></tr>
                    <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
                    <tr><StatisticLine text="bad" value={props.bad} /></tr>
                    <tr><StatisticLine text="total" value={props.total} /></tr>
                    <tr><StatisticLine text="average" value={props.average} /></tr>
                    <tr><StatisticLine text="positive" value={props.positive} /></tr>
                </tbody>
            </table>
        </div>
    );
};

const StatisticLine = (props) => {
    if (props.text === "positive") {
        return (
            <>
                <td>{props.text}</td>
                <td>{props.value} %</td>
            </>
        );
    }

    return (
        <>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </>
    );
};

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
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
                <Button text="good" handleClick={handleGood} />
                <Button text="neutral" handleClick={handleNeutral} />
                <Button text="bad" handleClick={handleBad} />

                <h2>Statistics</h2>
                <div>No feedback is given</div>
            </div>
        );
    }

    return (
        <div>
            <h2>Give Feedback</h2>
            <Button text="good" handleClick={handleGood} />
            <Button text="neutral" handleClick={handleNeutral} />
            <Button text="bad" handleClick={handleBad} />

            <h2>Statistics</h2>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                average={average}
                positive={positive}
            />
        </div>
    );
};

export default App;