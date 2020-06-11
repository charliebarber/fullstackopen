import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Numbers from './Components/Numbers'
import PersonForm from './Components/PersonForm';
import personsService from './services/persons';
import Notification from './Components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
        const existing = persons.find((person) => person.name === newName)
        const updated = {
          ...existing,
          name: newName,
          number: newNum
        }
        personsService
          .update(existing.id, updated)
          .then((response) => {
            setPersons(persons.map((person) => person.id !== existing.id ? person : response))
            displayMessage(`Updated ${updated.name}`)
          })
          .catch(error => {
            displayMessage(`Error. ${updated.name} has already been deleted from the server`)
            setPersons(persons.filter(person => person.name !== existing.name))
          })
      }
    } else {
      addPerson()
    }
    setNewName("");
    setNewNum("");
  };

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNum
    }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        displayMessage(`Added ${personObject.name}`)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const [ newSearch, setNewSearch] = useState('')
  const [ search, setSearch ] = useState([])

  const handleSearch = (event) => {
    if (event.target.value === '') {
      setNewSearch(event.target.value)
      setSearch([])
    } else {
      event.preventDefault();
      setNewSearch(event.target.value)
      const searchResults = persons.filter((person) => person.name.includes(event.target.value));
      setSearch(searchResults)
    }
  }

  const deletePerson = (number) => {
    if (window.confirm(`Delete ${number.name} ?`))
    personsService
      .deleteResource(number.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== number.id))
      })
  }

  const [message, setMessage] = useState('') 

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    },3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter 
        value={newSearch}
        onSearch={handleSearch}
      />
      <h3>Add a new number</h3>
      <PersonForm
        name={newName}
        num={newNum}
        onNameChange={handleNameChange}
        onNumChange={handleNumChange}
        onSubmit={handleSubmit}
      />
      <Numbers numbers={search.length === 0 ? persons : search} handleDeleteOf={deletePerson}/>
    </div>
  )
}

export default App
