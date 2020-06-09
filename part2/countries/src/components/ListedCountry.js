import React,{ useState} from 'react';
import CountryView from '../components/CountryView';

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

export default ListedCountry;