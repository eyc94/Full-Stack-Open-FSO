const Header = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
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
            {props.parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </>
    );
};

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
        </>
    );
};

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: "Half Stack Application Development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3
            }
        ]
    };

    return <Course course={course} />;
};

export default App;