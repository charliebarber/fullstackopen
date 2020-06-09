import React, { useState } from 'react';
import Filter from './Components/Filter';
import Numbers from './Components/Numbers'
import PersonForm from './Components/PersonForm';


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

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
