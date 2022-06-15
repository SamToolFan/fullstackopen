const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2} p3={part3} e3={exercises3}/>
      <Total number={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (content) => {
  return (
    <div>
      <Part name={content.p1} number={content.e1} />
      <Part name={content.p2} number={content.e2} />
      <Part name={content.p3} number={content.e3} />
    </div>
  )
}

const Total = (exercises) => {
  return (
    <div>
      <p>
      Number of exercises {exercises.number}
      </p>
    </div>
  )
}

const Part = (part) => {
  return (
    <div>
      <p>
        {part.name} {part.number}
      </p>
    </div>
  )
}

export default App