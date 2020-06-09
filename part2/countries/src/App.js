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

const Display = ({results}) => {
  
  if (results.length > 10) {
    return (
      <p>Too many matches. Search again</p>
    )
  } else if (results.length === 1) {
    return (
      <CountryView country={results[0]} />
    )
  } else if (results.length <= 10 ) {
    return (
      <Results results={results} />
    )
  } 

}

const CountryView = ({country}) => {
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
      <img src={country.flag} width="10%" alt="Country flag"></img>
    </div>
  )
}

const Results = ({results}) => {

  return (
    <div>
    {
      results.map((country) => {
      return( 
        <ListedCountry key={country.callingCodes} country={country} />
      )
      })
    }
    </div>
  )
}

const ListedCountry = ({country}) => {
  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    event.preventDefault()
    setShow(!show) 
  }

  return (
    <div>
      {country.name}<button onClick={handleShow}>Show</button>
      { show ? <CountryView country={country}/> : <p></p>}
    </div>
  )
}

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
      <Display results={search} />
    </div>
  );
}

export default App;
