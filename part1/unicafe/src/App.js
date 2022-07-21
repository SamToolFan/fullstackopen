import { useState } from 'react'

const Button =  (props) => <button onClick={props.handleClick}>{props.text}</button>
const ShowText = (props) => <div>{props.text} {props.value} {props.posttext}</div>
const Statistics = (props) => {
  return <div>
    <h1>statistics</h1>
    <ShowText text="good" value={props.good} />
    <ShowText text="neutral" value={props.neutral} />
    <ShowText text="bad" value={props.bad} />
    <ShowText text="all" value={props.good + props.neutral + props.bad} />
    <ShowText text="average" value={(props.good-props.bad)/(props.good + props.neutral + props.bad)} />
    <ShowText text="positive" value={(props.good/(props.good + props.neutral + props.bad)*100)} posttext="%"/>
  </div>
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