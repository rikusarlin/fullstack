import React from 'react'
import ReactDOM from 'react-dom'

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
  }

  const Content = (props) => {
    const parts = props.parts.map((part, idx) => <Part key={idx} part={part.name} exercises={part.exercises}/>)
    return (
       <div>
         {parts}
       </div>
    )
  }

  const Footer = (props) => {
    let total = 0;
    props.parts.forEach(part => {
      total = total + part.exercises
    })
    return (
        <div>
            <p>
              Number of exercises {total}
            </p>
        </div>
      )
  }

  const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
          name: 'Fundamentals of React',
          exercises: 10
       },
       {
         name: 'Using props to pass data',
         exercises: 7
       },
       {
         name: 'State of a component',
         exercises: 14
       }
     ]
   } 

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))