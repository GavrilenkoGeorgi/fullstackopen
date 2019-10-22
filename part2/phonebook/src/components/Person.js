import React from 'react'

const Person = ({ name, number, onClick }) => {
  return (
    <li>
    {name} {number}
    <button
      type="button"
      onClick={onClick}
    >
      Delete
    </button>
  </li>
  )
}

export default Person
