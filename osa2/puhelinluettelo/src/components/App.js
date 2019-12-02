import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = ({id, name,number,deleteCertainPerson}) => {
  return(
    <li>{name} {number} <button onClick={() => deleteCertainPerson(id)}>delete</button></li>
  )
}

const Persons = ({persons, filterValue, deleteCertainPerson}) => {
    const filteredPersons = persons.filter(person => person.name.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0)
    const personList = filteredPersons.map(person =>
    <Person
      key={person.id}
      id={person.id}
      name={person.name}
      number={person.number}
      deleteCertainPerson={deleteCertainPerson}
    />)
    return(
        <div><ul>{personList}</ul></div>
    )
  }
 
const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Filter = ({filterValue,handleFilterChange}) => {
    return (
        <div>filter persons with <input value={filterValue} onChange={handleFilterChange}></input></div>
    )
}

const App = () => {
  /*
  const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  */ 
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  // This loads the initial list
  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const deleteCertainPerson = id => {
    const personName = persons.filter(person => person.id === id).reduce(person => person.name).name
    const answer = window.confirm(`Delete ${personName} ?`)
    if(answer === true){
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `Deleted ${personName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)    
        })
        .catch(() => {
          // Some problem - read stuff again & inform
          personService
          .getAll()
          .then(returnedPersons => {
            setPersons(returnedPersons)
          })    
          setErrorMessage(
            `Information of  ${personName} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)    
        })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)

  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Persons before: ",persons)
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Check whether the person is already listed by this name
    const nameList = persons.map((person) => person.name)
    console.log("Names:", nameList)
    const existingIndex = nameList.indexOf(newName)
    if (existingIndex >= 0){
        const answer = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        if(answer === true){
          console.log("Updating name: ", personObject.name)
          personObject.id=persons[existingIndex].id
          personService
            .update(personObject.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              console.log("Persons after update: ",persons)    
              setNotificationMessage(
                `Updated phone number of ${personObject.name}`
              )
              setNewName('')
              setNewNumber('')              
                  setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)    
            })
            .catch(error => {
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)    
            })    
        } else {
          console.log(`Not adding ${newName}  since it is already added to the phonebook`)
        }
    } else {
      console.log("Adding name: ", personObject.name)
      // Find the person with largest id value
      const maxId = persons.reduce((prev, current) => (prev.id > current.id) ? prev : current)
      // New id is this plus one
      // This really should be left to the server side...
      personObject.id=maxId.id+1
      personService
        .create(personObject)
        .then(returnedPerson => {
          const newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          console.log("Persons after addition: ",newPersons)
          setNotificationMessage(
            `Added ${personObject.name}`
          )
          setNewName('')
          setNewNumber('')
              setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)    
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)    
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      <Filter 
        filterValue={filterValue} 
        handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filterValue={filterValue}
        deleteCertainPerson={deleteCertainPerson}/>
      </div>
  )

}

export default App