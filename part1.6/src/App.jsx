import { useState } from 'react'

const Button = ({handleClick, feedback}) =>{
return(
<button onClick={handleClick}>
{feedback}
</button>
)

}

const Statistics = ({good, neutral, bad}) =>{
  const total = good+neutral+bad;
  const average = ((good-bad)/total);
  const positive=(good/total)*100;
  return(
  <>
  <h2>statistics</h2>
  {total!=0?<>
  <table>
    <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="average" value={average}/>
    <StatisticLine text="positive" value={`${positive} %`}/>
    </tbody>
    </table>
    </>:
   <p>No feedback given</p> 
  }
    </>
  )
}

const StatisticLine = ({text, value}) =>{
  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () =>{
    setGood(good=>good+1)
  }
  const addNeutral = () =>{
    setNeutral(neutral=>neutral+1)
  }
  
   const addBad = ()=>{
    setBad(bad=>bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} feedback="good"/>
      <Button handleClick={addNeutral} feedback="neutral"/>
      <Button handleClick={addBad} feedback="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

export default App