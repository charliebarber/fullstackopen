import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import Display from './components/Display'


const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleSearch = (event) => {
    event.preventDefault()
    if (event.target.value === '') {
      setNewSearch(event.target.value)
      setSearch([])
    } else {
      setNewSearch(event.target.value)
      const results = countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setSearch(results)
    }
  }

  return (
    <div>
      <Search onSearch={handleSearch} value={newSearch}/>
      <Display results={search} />
    </div>
  );
}

export default App;
