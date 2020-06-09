import React from 'react';
import ListedCountry from '../components/ListedCountry';


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

export default Results;