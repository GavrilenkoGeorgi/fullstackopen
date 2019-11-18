import React, { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import Person from './components/Person'
import Persons from './components/Persons'
import PersonForm from './components/PersonFrom'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notification, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

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
            setNotificationMessage(
              `User '${existingPerson.name}' was updated.`
            )
            setNotificationType('info')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMessage(error.response.data.error)
            setNotificationType('error')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
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
          setNotificationMessage(
            `User '${personObject.name}' was added.`
          )
          setNotificationType('info')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationMessage(error.response.data.error)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete user with id of: ${id}?`)) {
      phonebookService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `The person with '${id}' was succesfully deleted from the server.`
          )
          setNotificationType('info')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `The person with '${id}' was already deleted from the server.`
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
      <Notification message={notification} type={notificationType}/>
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
