const Header = (props) => {
    return (
        <>
            <h2>{props.name}</h2>
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
    const total = props.parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
    }, 0)

    return (
        <>
            <p>Total of {total} exercises</p>
        </>
    );
};

const Course = (props) => {
    console.log(props.courses);
    return (
        <>
            {props.courses.map(course =>
                <div>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <strong><Total parts={course.parts} /></strong>
                </div>
            )}
        </>
    );
};

const App = () => {
    const courses = [
        {
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
        },
        {
            id: 2,
            name: "Node.js",
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <Course courses={courses} />
        </div>
    );
};

export default App;