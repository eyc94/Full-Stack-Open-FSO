import React from 'react';

const Course = (props) => {
    return (
        <>
            {props.courses.map(course =>
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <strong><Total parts={course.parts} /></strong>
                </div>
            )}
        </>
    );
};

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

export default Course;