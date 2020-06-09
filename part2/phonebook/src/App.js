import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Numbers from './Components/Numbers'
import PersonForm from './Components/PersonForm';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNum }));
    }
    setNewName("");
    setNewNum("");
  };

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
      const searchResults = persons.filter((person) => person.name.includes(newSearch));
      setSearch(searchResults)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers numbers={search.length === 0 ? persons : search} />
    </div>
  )
}

export default App
