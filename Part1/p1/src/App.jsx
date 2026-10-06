const Part=(props)=>{
  return(
    <p>
    {props.name}{props.e}
    </p>
  )
}



const App=()=>{
  const course='Half stack application devlopment'

  const part1='Fundamentals of React'
  const e1=10

  const part2='Using props to pass data'
  const e2=7

  const part3='State of a component'
  const e3=14

  return(
    <div>
      <h1>{course}</h1>
      <Part name={part1} e={e1}/>
      <Part name={part2} e={e2}/>
      <Part name={part3} e={e3}/>
      <p>Number of exercises: {e1+e2+e3}</p>
    </div>
  )
}
export default App