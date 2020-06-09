import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Country = (props) => {
  return (
    <div>
    </div>
  )
}

const Search = (props) => {
  return (
    <div>
      find countries: <input onChange={props.onSearch}></input>
    </div>
  )
}

const Results = ({results}) => {
  
  if (results.length > 10) {
    return (
      <p>Too many matches. Search again</p>
    )
  } else if (results.length === 1) {
    const country = results[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
        {
          country.languages.map((language) => <li key={language.iso639_2}>{language.name}</li>)
        }
        </ul>
        <img src={country.flag} width="10%"></img>
      </div>
    )
  } else if (results.length <= 10 ) {
    return (
      <div>
        {
          results.map((country) => <p key={country.callingCodes}>{country.name}</p>)
        }
      </div>
    )
  } 

}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    console.log('use effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('then')
        setCountries(response.data)
      })
  },[])

  const handleSearch = (event) => {
    console.log('handle search called')
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
  
  // const handleResults = (results) => {
  //   let display;
  //   if (results.length > 10) {
  //     display = <p>Too many matches, search again</p>
  //   } else if ( results.length < 10 ) {

  //   } else if ( results.length === 1) {

  //   }
  // }

  return (
    <div>
      <Search onSearch={handleSearch} value={newSearch}/>
      <Results results={search} />
    </div>
  );
}

export default App;
