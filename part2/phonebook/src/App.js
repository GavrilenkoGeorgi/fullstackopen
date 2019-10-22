import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import Persons from './components/Persons'
import PersonForm from './components/PersonFrom'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = {...existingPerson, number: newNumber}
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .add(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete user with id of: ${id}?`)) {
      phonebookService
        .deletePerson(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `the person with '${id}' was already deleted from the server`
          )
        })
    }
  }

  const personsList = () => filteredPersons.map(person =>
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      onClick={() => deletePerson(person.id)}
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
