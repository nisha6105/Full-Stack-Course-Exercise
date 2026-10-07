const Header=(props)=>{
  return(
    <h1>{props.course}</h1>
  )
}

const Part=(props)=>{
  return(
    <p>
      {props.name} {props.e}
    </p>
  )
}

const Content=(props)=>{
  return(
    <div>
      <Part name={props.part1} e={props.e1}/>
      <Part name={props.part2} e={props.e2}/>
      <Part name={props.part3} e={props.e3}/>
    </div>
  )
}

const Total=(props)=>{
  return(
    <p>
      Number of exercises {props.e1+props.e2+props.e3}
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
      <Header course={course}/>
      <Content
        part1={part1}
        e1={e1}
        part2={part2}
        e2={e2}
        part3={part3}
        e3={e3}
      />
      <Total
      e1={e1}
      e2={e2}
      e3={e3}
      />
    </div>
  )
}
export default App