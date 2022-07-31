import React from 'react'

const Courses = ({ courses }) => 
<>
  {courses.map(course => <Header key={course.id} course={course} />)}
</>

const Header = ({ course }) => {
  return (
    <>
      <h2 key={course.id}>{course.name} </h2>
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
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

const Sum = ({ parts }) => {
  var total = parts.reduce(function(sum, part) {return sum + part.exercises}, 0)
  // console.log(total)
  return(
    <h3>
      Total of {total} exercises
    </h3>
  )
}

export default Courses