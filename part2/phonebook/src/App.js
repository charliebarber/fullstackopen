import React, { useState } from 'react'

const Numbers = ({numbers, search}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {
          (search.length > 0) ? 
            search.map((number) => <Number key={number.name} details={number} />)
          :
            numbers.map((number) => <Number key={number.name} details={number} />)
        }
      </div>
    </div>
  )
}

const Number = ({details}) => {
  return (
    <p>{details.name} : {details.number}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  const [ search, setSearch ] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( persons.find((person) => person.name === newName) ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNum}));
    }
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault();
    setNewSearch(event.target.value)
    const searchResults = persons.filter((person) => person.name.includes(newSearch));
    setSearch(searchResults)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Search for: <input onChange={handleSearch} value={newSearch}/>
        </div>
      </form>
      <h3>Add a new number</h3>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumChange} value={newNum}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <Numbers numbers={persons} search={search}/>
    </div>
  )
}

export default App
