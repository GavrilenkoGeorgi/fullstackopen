import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  return <strong>total of {total} exercises</strong>
}

const Content = ({parts}) => {
  const rows = () => parts.map(part =>
    <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
  return <> {rows()} </>
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
export default Course
