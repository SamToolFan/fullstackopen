import { useState } from 'react'

const Button =  (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td><td>{props.posttext}</td></tr>

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad) {
    return <div>
      <h1>statistics</h1>
      <table><tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={(props.good-props.bad)/(props.good + props.neutral + props.bad)} />
        <StatisticLine text="positive" value={(props.good/(props.good + props.neutral + props.bad)*100)} posttext="%"/>
        </tbody></table>
    </div>
  } else {
    return <div>
      <p>No feedback given</p>
    </div>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />

      <Statistics good={good} neutral={neutral} bad={bad} />

   </div>
  )
}

export default App