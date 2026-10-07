import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'There are only two hard things in Computer Science: cache invalidation and naming things.'
]

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>

      {props.maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <>
          <p>{props.anecdote}</p>
          <p>has {props.maxVotes} votes</p>
        </>
      )}
    </div>
  )
}

const App=()=>{
  const [selected,setSelected]=useState(0)
  const[votes,setVotes]=useState(new Array(anecdotes.length).fill(0))

  const vote=()=>{
    const newVotes=[...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
  }

  const maxVotes=Math.max(...votes)
  const maxIndex=votes.indexOf(maxVotes)

  return(
    <div>
      <h1>Anecdote of the day</h1>

      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />

      <Button
        onClick={vote}
        text="vote"
      />

      <Button
        onClick={() =>
          setSelected((selected + 1) % anecdotes.length)
        }
        text="next anecdote"
      />

      <MostVotes
        anecdote={anecdotes[maxIndex]}
        maxVotes={maxVotes}
      />
    </div>
  )
}

export default App