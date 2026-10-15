import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App=(props)=>{
  const[names,setName]=useState(props.names)
  const[newName,setNewName]=useState('')
  const[newNum,setNum]=useState('')
  const[searchName,setSearchName]=useState('')

  const addName=(event)=>{
    event.preventDefault()

    const alreadyExist=names.some(
      person=>person.name===newName
    )
    if(alreadyExist){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      const nameObject={
      name:newName,
      number:newNum,
      id:names.length+1
    }
      setName(names.concat(nameObject))
      setNewName('')
      setNum('')
    }
  }

  const filteredNames = names.filter(person =>
  person.name.toLowerCase().includes(searchName.toLowerCase())
)

  return(
    <div>
      <h1>PhoneBook</h1>
     <PersonForm
       addName={addName}
       newName={newName}
        handleNameChange={event => setNewName(event.target.value)}
        newNum={newNum}
        handleNumberChange={event => setNum(event.target.value)}
        />

    <Filter 
       searchName={searchName}
       handleSearchNameChange={event=>
        setSearchName(event.target.value)
       }
       />
      <h1>Numbers</h1>

      <Persons persons={filteredNames} />
    </div>
  )
}
export default App