import React from 'react';

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

export default CountryView;