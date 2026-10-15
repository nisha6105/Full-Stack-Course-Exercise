import { useState } from 'react'

const App = (props) => {
  const [names, setNames] = useState(props.names)
  const [newName,setNewName] = useState('')

  const addName=(event)=>{
    event.preventDefault()
    const nameObject={
      name:newName,
      id:names.length+1
    }
    setNames(names.concat(nameObject))
    setNewName('')
  }
  
  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={addName}>
        <input
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <h1>Numbers</h1>

       <ul>
        {names.map(person =>
          <li key={person.id}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App