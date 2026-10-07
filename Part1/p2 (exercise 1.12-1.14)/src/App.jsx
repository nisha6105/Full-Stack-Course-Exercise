import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'There are only two hard things in Computer Science: cache invalidation and naming things.'
]

const App=()=>{
  const [selected,setSelected]=useState(0)

  return(
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={()=>setSelected((selected+1)%anecdotes.length)}>
        next anecdote
      </button>
    </div>
  )
}

export default App