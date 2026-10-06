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
      <p>{part1} {e1}</p>
      <p>{part2} {e2}</p>
      <p>{part3} {e3}</p>
      <p>Number of exercises: {e1+e2+e3}</p>
    </div>
  )
}
export default App