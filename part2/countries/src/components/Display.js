import React from 'react';
import CountryView from '../components/CountryView';
import Results from '../components/Results'

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

export default Display;