import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const getRandomInt = (max) => Math.floor(Math.random() * max)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))  // I don't always want to start with the first anecdote
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

//  const randomnumber = getRandomInt(anecdotes.length)
//  const handleNextanecdote = () => setSelected(randomnumber)
//  The two lines above make that at a certain moment the buttons become unresponsive
//  Doing it like below solves the problem - it took me several hours before I found it but I DON'T GET IT!!!!!!!
  const handleNextanecdote = () => setSelected(getRandomInt(anecdotes.length))

  const handleVote = () =>   {
//  newVotes = votes
//  Defining newVotes like above doesn't work properly. It appears the array is different then defining at as below
//  Result is that the setVoted used below doesn't rerender the screen but the counts are recorded so later the correct number of votes is shown. I don't fully comprehend this
    const newVotes = {
      ...votes,
    }
    newVotes[selected] += 1
    setVoted(newVotes)
  }

  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        Has {votes[selected]} votes
      </p>
      <p>
      <Button text="Vote" handleClick={handleVote}/>
      <Button text="Random anecdote" handleClick={handleNextanecdote}/>
      </p>
    </div>
  )
}

export default App 