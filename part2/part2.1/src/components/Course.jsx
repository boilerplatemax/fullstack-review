import React from 'react'

const Course =({course})=> {

const exerciseTotal = course.parts.reduce((total, parts)=>total+=parts.exercises,0)   
  return (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <strong>Total of Exercises: {exerciseTotal}</strong>
    </div>
  )
}

const Header = ({name})=>{
    return(
        <h2>{name}</h2>
    )
}
const Content = ({parts})=>{
    return(
        <div>
            {parts.map(part=><Part key={part.id} part={part}/>)}
        </div>
    )
}

const Part = ({part})=>{
    return(
        <p>
            {part.name} {part.exercises}
        </p>
        )
}

export default Course
