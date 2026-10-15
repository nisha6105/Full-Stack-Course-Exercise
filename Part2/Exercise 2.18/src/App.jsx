import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App=()=>{
  const [countries,setCountries]=useState([])
  const [filter,setFilter]=useState('')

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

return(
  <div>
    find countries
    <input 
      value={filter}
      onChange={event=>setFilter(event.target.value)}
    />

    
{countriesToShow.length > 10 ? (
  <p>Too many matches, specify another filter</p>
) : countriesToShow.length === 1 ? (
  <div>
    <h2>{countriesToShow[0].name.common}</h2>
    <p>capital {countriesToShow[0].capital?.join(', ')}</p>
    <p>area {countriesToShow[0].area}</p>

    <h3>languages:</h3>
    <ul>
      {Object.values(countriesToShow[0].languages || {}).map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>

    <img
      src={countriesToShow[0].flags.png}
      alt={`Flag of ${countriesToShow[0].name.common}`}
      width="150"
    />
  </div>
) : (
  countriesToShow.map(country => (
    <div key={country.cca3}>
      {country.name.common}
    </div>
  ))
)}

  </div>
)
}
export default App