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
      <Part name={props.part1.name} e={props.part1.e}/>
      <Part name={props.part2.name} e={props.part2.e}/>
      <Part name={props.part3.name} e={props.part3.e}/>
    </div>
  )
}

const Total=(props)=>{
  return(
    <p>
      Number of exercises {props.part1.e+props.part2.e+props.part3.e}
    </p>
  )
}



const App=()=>{
  const course='Half stack application devlopment'

  const part1={
    name:'Fundamentals of React',
    e:10}

  const part2={
    name:'Using props to pass data',
    e:7}

  const part3={
    name:'State of a component',
    e:14}

  return(
    <div>
      <Header course={course}/>
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
      part1={part1}
      part2={part2}
      part3={part3}
      />
    </div>
  )
}
export default App