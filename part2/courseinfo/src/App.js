const Courses = ({ courses }) => 
<>
  {courses.map(course => <Header key={course.id} course={course} />)}
</>

const Header = ({ course }) => {
  return (
    <>
      <h1 key={course.id}>{course.name} </h1>
      <Content parts={course.parts} />
    </>
  )
}

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

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
            name: 'LEARING HOW TO ADD INDEFINITE NUMBER OF PARTS',
            exercises: 26
          },
          {
            id: 5,
            name: 'And yet another one',
            exercises: 2
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
      <Courses courses={courses} />
    </div>
  )
}

export default App