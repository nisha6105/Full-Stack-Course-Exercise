import { useState, useEffect } from 'react'
import axios from 'axios'

const App=()=>{
    const [persons,setPersons]=useState([])
    const [newName,setNewName]=useState('')
    const [newNumber,setNewNumber]=useState('')
    const [filter,setFilter]=useState('')

    useEffect(()=>{
      axios.get('http://localhost:3001/persons')
        .then(response=>{
          setPersons(response.data)
       })
      },[])

      const personsToShow=persons.filter(person=>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

      const addPerson=(event)=>{
        event.preventDefault()

        const personObject={
          name:newName,
          number:newNumber,
          id:persons.length+1
        }
        setPersons(persons.concat(personObject))

        setNewName('')
        setNewNumber('')

      }

      return(
        <div>
          <h2>Phonebook</h2>

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
