import React, { useState } from 'react'

const Numbers = ({numbers}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {
          numbers.map((number) => <Number key={number.name} details={number} />)
        }
      </div>
    </div>
  )
}

const Number = ({details}) => {
  return (
    <p>{details.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({name: newName}));
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <Numbers numbers={persons}/>
    </div>
  )
}

export default App
