import React from 'react'

const Footer = ({parts}) => {
   /*
  these return object like this:
  {exercises: 2}

  // ES6 style - need to supply an initial value
  // I'd say this is the clearest one?
  let total = {exercises:0}
  total = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))
 
  // ES6 one-liner
  let total = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}),{exercises: 0})
  
  // This version with logging... needs ES5 style?
  let total = parts.reduce(function (a, b) {
    console.log("a: ",a)
    console.log("b: ",b)
    let total = {exercises: a.exercises + b.exercises};
    console.log("total: ", total)
    return total
  })

  // ES6 with logging
  let total = parts.reduce((a, b) => {
    console.log("a: ",a)
    console.log("b: ",b)
    let total = {exercises: a.exercises + b.exercises}
    console.log("total: ", total)
    return total
  });
  */

  // This might be the shortest and neatest version?
  //let total = parts.reduce((total, val) => total + val.exercises,0)

  // The same with logging
  let total = parts.reduce((total, val) => console.log("total: ",total, ", val:" , val) || total + val.exercises,0)

  /* A longer version with logging
  let total = parts.reduce((total, val) => {
    console.log("total, old: ",total)
    console.log("val: ",val)
    total = total + val.exercises
    console.log("total, new: ", total)
    return total
  },0)
  */

  return (
      <div>
          <p>
            Number of exercises {total}
          </p>
      </div>
    )
}



const Header = ({name}) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  const partList = parts.map((part) => <Part key={part.id} part={part} exercises={part.exercises}/>)
  return (
     <div>
       {partList}
     </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )
}

export default Course
