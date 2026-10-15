import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'


const App=()=>{
    const [message,setMessage]=useState(null)
    const [persons,setPersons]=useState([])
    const [newName,setNewName]=useState('')
    const [newNumber,setNewNumber]=useState('')
    const [filter,setFilter]=useState('')

    useEffect(()=>{
      personService.getAll()
       .then(response=>{
        setPersons(response.data)
       })
      },[])

      useEffect(()=>{
        if(message){
          const timeoutId=setTimeout(()=>{
            setMessage(null)
          },5000)

          return ()=>clearTimeout(timeoutId)
        }
      },[message])

      const personsToShow=persons.filter(person=>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

     
const addPerson = (event) => {
  event.preventDefault()

  const existingPerson = persons.find(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )

  const personObject = {
    name: newName,
    number: newNumber
  }

  if (existingPerson) {
    const confirmed = window.confirm(
      `${existingPerson.name} is already added to the phonebook. Replace the old number with a new one?`
    )

    if (confirmed) {
      personService
        .update(existingPerson.id, {
          ...existingPerson,
          number: newNumber
        })
        .then(response => {
          setPersons(persons.map(person =>
            person.id === existingPerson.id ? response.data : person
          ))
          setNewName('')
          setNewNumber('')
          setMessage(`${response.data.name}'s number changed`)
        })
      
    }
  } else {
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`${response.data.name} added`)
      })
  }
}


      return(
        <div>
          <h2>Phonebook</h2>

          {message && (
            <div className='notification'>
              {message}
              </div>
          )}

          <div>
            Filter show with:
            <input 
             value={filter}
             onChange={event=>setFilter(event.target.value)}
            />
          </div>

          <h3>Add a new person</h3>

          <form onSubmit={addPerson}>
            <div>
              name:
              <input 
              value={newName}
              onChange={event=>setNewName(event.target.value)}
              />
            </div>

            <div>
              number:
              <input 
               value={newNumber}
               onChange={event=>setNewNumber(event.target.value)}
              />
            </div>

            <div>
              <button type="submit">add</button>
            </div>
          </form>

          <h3>Numbers</h3>

          {personsToShow.map(person=>(
            <p key={person.id}>
              {person.name} {person.number}
            </p>

          ))}
        </div>
      )
}
export default App
