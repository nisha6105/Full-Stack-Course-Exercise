import { useState } from 'react'

const App = () => {
  const [names, setNames] = useState([])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    setNames([...names, newName])
    setNewName('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />

        <button type="submit">
          add
        </button>
      </form>

      <ul>
        {names.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App