import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App=()=>{
  const [countries,setCountries]=useState([])
  const [filter,setFilter]=useState('')
  const[selectedCountry,setSelectedCountry]=useState(null)

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

return(
  <div>
    <h2>find countries</h2>
    <input 
      value={filter}
      onChange={event=>{
        setFilter(event.target.value)
        setSelectedCountry(null)
      }}
    />
{countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        countriesToShow.map(country => (
          <div key={country.cca3}>
            {country.name.common}
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
        </div>
      )}
  

  </div>
)
}
export default App