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

export default Course;