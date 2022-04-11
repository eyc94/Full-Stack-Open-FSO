const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <>
            <Part part={props.part1.name} exercises={props.part1.exercises} />
            <Part part={props.part2.name} exercises={props.part2.exercises} />
            <Part part={props.part3.name} exercises={props.part3.exercises} />
        </>
    );
};

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    );
};

const App = () => {
    const course = "Half Stack Application Development";

    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10
        },
        {
            name: "Using props to pass data",
            exercises: 7
        },
        {
            name: "State of a component",
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    );
};

export default App;