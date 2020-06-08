import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p>Number of exercises {total}</p>
  ) 
}

const Part = ({name,exercises}) => {
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

const Course = ({course}) => {
  return (
  <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
    {
      courses.map((course) => <Course course={course} />)
    }
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <Courses courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))