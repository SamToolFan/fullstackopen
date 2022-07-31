import Courses from './components/Courses'

const App = () => {
  const courses = [
      {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            id: 1,
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            id: 2,
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            id: 3,
            name: 'State of a component',
            exercises: 14
          },
          {
            id: 4,
            name: 'Learning how to add indefinite number of parts',
            exercises: 26
          },
          {
            id: 5,
            name: 'And yet another one',
            exercises: 3
          }
        ]
      },
      {
        id: 2,
        name: 'A second course',
        parts: [
          {
            id: 1,
            name: 'Fundamentals of this course',
            exercises: 10
          },
          {
            id: 2,
            name: 'Something else of this course',
            exercises: 32
          },
        ]
      }
    ] 

  return (
    <div>
      <h1>Web development curriculum </h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App