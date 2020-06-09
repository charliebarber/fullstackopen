import React from 'react'

const Filter = (props) => {

    return(
    <form>
        <div>
          Search for: <input onChange={props.onSearch} value={props.value}/>
        </div>
      </form>
    )
}

export default Filter;