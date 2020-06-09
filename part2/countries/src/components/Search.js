import React from 'react';

const Search = (props) => {
    return (
      <div>
        find countries: <input onChange={props.onSearch} value={props.value}></input>
      </div>
    )
}

export default Search;