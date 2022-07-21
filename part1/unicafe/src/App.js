import { useState } from 'react'

const Button =  (props) => <button onClick={props.handleClick}>{props.text}</button>
const ShowText = (props) => <div>{props.text} {props.value} {props.posttext}</div>

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

      <h1>statistics</h1>
      <ShowText text="good" value={good} />
      <ShowText text="neutral" value={neutral} />
      <ShowText text="bad" value={bad} />
      <ShowText text="all" value={good + neutral + bad} />
      <ShowText text="average" value={(good-bad)/(good + neutral + bad)} />
      <ShowText text="positive" value={(good/(good + neutral + bad)*100)} posttext="%"/>
    </div>
  )
}

export default App