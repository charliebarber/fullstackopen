import React from 'react';

const Header = ({title}) => {
    return (
      <h1>{title}</h1>
    )
  }
  
const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>Number of exercises {total}</p>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)
            }
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;