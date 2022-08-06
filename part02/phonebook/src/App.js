import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonService from './services/PersonService'
import Notification from './components/Notification'
import NotificationError from './components/NotificationError'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [isError, setIsError] = useState(false)
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const toShowNotif = () => showNotif
    ? toShowError()
    : (<div></div>)

  const toShowError = () => isError
    ? (<NotificationError message={errorMessage} />)
    : (<Notification message={errorMessage} />)

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(filterName))
  
  const addPerson = (event) => {
    event.preventDefault()
    const filteredPerson = persons.filter((person) => (person.name === newName))
    if (filteredPerson.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        const updateID = filteredPerson[0].id

        const personObject = {
          name: newName,
          number: newNumber,
          id: updateID
        }

        PersonService
          .update(updateID, personObject)
          .then(updatedPerson => {
            setPersons(persons.filter(person => person.id != updatedPerson.id).concat(updatedPerson))
            setNewName('')
            setNewNumber('')
            setShowNotif(true)
            setIsError(false)
            setErrorMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setShowNotif(false)
            }, 3000)
          })
          .catch(error => {
            setShowNotif(true)
            setIsError(true)
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setShowNotif(false)
            }, 3000)
          })
      } 
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      PersonService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setShowNotif(true)
          setIsError(false)
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setShowNotif(false)
          }, 3000)
        })
    }
  }

  const delPerson = (id) => {
    PersonService
      .deletePerson(id)
      .then(personDeleted => {
        setPersons(persons.filter(person => person.id !== id))
      })
 
  }

  const handleNameChange =(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange =(event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange =(event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {toShowNotif()}

      <Filter 
        filterName={filterName} 
        handleFilterNameChange={handleFilterNameChange}
      />
    
      <h3>add a new</h3>
      
      <PersonForm  
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {personToShow.map(person => <Person key={person.id} person={person} delPerson={delPerson} />)}
      
    </div>
  )
}

export default App