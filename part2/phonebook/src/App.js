import React, { useState } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import Persons from './components/Persons'
import PersonForm from './components/PersonFrom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Hank Hill', number: '39-44-0397047' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilteredSearch = event => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const filteredPersons = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(newFilter))

  const addPerson = event => {
    event.preventDefault()
    const checkUsername = person => person.name === newName
    if (persons.some(checkUsername)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsList = () => filteredPersons.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    />
  )

  return (
    <>
      <h1>phonebook</h1>
      <Filter value={newFilter} onChange={handleFilteredSearch}/>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{value: newName, onChange: handleNameChange}}
        number={{value: newNumber, onChange: handleNumberChange}}
      />
      <h2>numbers</h2>
      <Persons persons={personsList()} />
    </>
  )
}

export default App
