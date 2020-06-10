import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({forecast}) => {
    console.log('props')
    
    return (
        <div>
            <b>Current temperature: </b>{forecast.temperature}
            <br />
            <b>Current weather: </b>{forecast.currentWeather}
        </div>
    )
}

const CountryView = ({country}) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=55e50122b705a0b28e0e5950a6bfb3cc&units=metric`)
          .then(response => {
            console.log(response)
            const weatherData = {
                city: response.data.name,
                temperature: response.data.main.temp,
                currentWeather: response.data.weather[0].main
            }
            setWeather(weatherData)
          })
      },[])


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

        <h1>Weather in {country.capital}</h1>
        <Weather forecast={weather} />
      </div>
    )
  }

export default CountryView;