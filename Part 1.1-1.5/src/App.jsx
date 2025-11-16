const Header = ({ course }) => <h1>{course}</h1>


const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);


const Content= ({parts}) =>{
  return(
    <>
    {parts.map((part, index)=>(
      <Part key={index} name={part.name} exercises={part.exercises}/>
    ))}
    </>
  )
}

const Total = (props) =>{
  console.log(`total props: `, props)
  const total=props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return(
    <p>Number of exercises {total}</p>
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
      <Total parts={course.parts}/>
    </div>
  )
}

export default App