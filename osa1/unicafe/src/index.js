import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({name, value, unit}) => {
    return (
      <tr key={name}>
        <td>{name}</td><td>{value}</td><td>{unit}</td>
      </tr>
    )
}

const NoStatistics = () => (
    <div><p>No feedback given</p></div>
  )

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = 0
  let positive = 0
  if(all > 0) {
      average = (good - bad) / all
      positive = (good / all)*100
  }

  const setGoodToValue = newValue => {
    setGood(newValue)
  }
  const setNeutralToValue = newValue => {
    setNeutral(newValue)
  }
  const setBadToValue = newValue => {
    setBad(newValue)
  }

  var stats = (
    <div>
      <table key="statistics">
        <thead></thead>
          <tbody>
            <Statistic value={good} name="good" unit=""/>
            <Statistic value={neutral} name="neutral" unit=""/>
            <Statistic value={bad} name="bad" unit=""/>
            <Statistic value={all} name="all" unit=""/>
            <Statistic value={average} name="average" unit=""/>
            <Statistic value={positive} name="positive" unit="%"/>
         </tbody>
      </table>
    </div>
  )

  if((good + neutral + bad)===0){
      stats = <NoStatistics/>
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodToValue(good +1)} text="good"/>
      <Button handleClick={() => setNeutralToValue(neutral +1)} text="neutral"/>
      <Button handleClick={() => setBadToValue(bad +1)} text="bad"/>
      <h1>statistics</h1>
      {stats}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)