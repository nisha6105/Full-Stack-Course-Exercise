import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const App=()=>{
  const [countries,setCountries]=useState([])
  const [filter,setFilter]=useState('')
  const[selectedCountry,setSelectedCountry]=useState(null)
  const[weather,setWeather]=useState(null)

  useEffect(()=>{
    countryService
      .getAll()
      .then(response=>{
        setCountries(response.data)
      })
  },[])


const countriesToShow=countries.filter(country=>
  country.name.common.toLowerCase().includes(filter.toLowerCase())
)

const countryToShow=
   countriesToShow.length===1
   ? countriesToShow[0]
   : selectedCountry

   useEffect(()=>{
    setWeather(null)

    if(countriesToShow && countriesToShow.capital?.[0]){
      weatherService
        .getWeather(countriesToShow.capital[0])
        .then(data=>{
          setWeather(data)
        })
        .catch(error=>{
          console.error('Failted to fetch weather: ',error)
        })
    }
   },[countryToShow])

    const handleFilterChange = event => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

 return (
    <div>
      <h2>Find countries</h2>

      <input
        value={filter}
        onChange={handleFilterChange}
      />

      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        countriesToShow.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelectedCountry(country)}>
              Show
            </button>
          </div>
        ))
      ) : null}

      {countryToShow && (
        <div>
          <h2>{countryToShow.name.common}</h2>

          <p>
            Capital: {countryToShow.capital?.join(', ')}
          </p>

          <p>Area: {countryToShow.area} km²</p>

          <h3>Languages</h3>
          <ul>
            {Object.values(countryToShow.languages || {}).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img
            src={countryToShow.flags.png}
            alt={`Flag of ${countryToShow.name.common}`}
            width="150"
          />

          <h3>Weather in {countryToShow.capital?.[0]}</h3>

          {weather ? (
            <div>
              <p>
                Temperature: {weather.main.temp} °C
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <p>{weather.weather[0].description}</p>

              <p>
                Wind speed: {weather.wind.speed} m/s
              </p>
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App