import {useState} from 'react'

const App=(props)=>{
  const[names,setName]=useState(props.names)
  const[newName,setNewName]=useState('')
  const[newNum,setNum]=useState('')

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

  return(
    <div>
      <h1>PhoneBook</h1>
     <form onSubmit={addName}>
      <input 
      value={newName}
      onChange={event=>setNewName(event.target.value)}
      />
      <input 
      value={newNum}
      onChange={event=>setNum(event.target.value)}
      />
      <button type="submit">add</button>
     </form>
      <h1>Numbers</h1>

       <ul>
        {names.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )
}
export default App