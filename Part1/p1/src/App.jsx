import { useState } from 'react'

const StatisticLine=(props)=>{
  return(
    <p>
      {props.text} {props.value}
    </p>
  )
}

const Statistics=(props)=>{
  return(
    <div>
      <StatisticLine text="All" value={props.total}/>
      <StatisticLine text="Average" value={props.average}/>
      <StatisticLine text="Positive" value={props.positive + ' %'}/>
    </div>
  )
}

const Button=(props)=>{
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App=()=>{
  const [good, setGood]=useState(0)
  const [bad, setBad]=useState(0)
  const [neutral, setNeutral]=useState(0)

  const total=good+neutral+bad 
  const average=(good-bad)/total 
  const positive=(good/total)*100

  return(
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>setGood(good+1)}
        text="good"
      />
      <Button handleClick={()=>setNeutral(neutral+1)}
        text="neutral"
      />
      <Button handleClick={()=>setBad(bad+1)}
        text="bad"
      />

      <h2>Statistics</h2>
      {good==0 && neutral==0 && bad==0 ?(
        <p>No feedback given</p>
      ) : (
        <>
        <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <Statistics
       total={total}
       average={average}
       positive={positive}
      />
      </>)}
     
    </div>
  )
}
export default App