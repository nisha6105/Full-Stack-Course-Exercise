require('dotenv').config()
const mongoose=require('mongoose')
const express=require('express')
const cors = require('cors')
const morgan=require('morgan')
const app=express()
app.use(express.json())
app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

const url=process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(()=>{
    console.log('Connected to MongoDB')
  })
  .catch(error=>{
    console.log('Error connecting to MongoDB: ',error.message)
  })

const personSchema=new mongoose.Schema({
  name:String,
  number:String,
})

const Person=mongoose.model('Person',personSchema)


app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons',(request,response)=>{
    Person.find({})
      .then(persons=>{
        response.json(persons)
      })
      .catch(error=>{
        console.log(error)
        response.status(500).end()
      })
})

app.get('/api/persons/:id',(request,response)=>{
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id',(request,response)=>{
 Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person=new Person({
    name:body.name,
    number:body.number,
  })
  person.save().then(savedPerson=>{
    response.json(savedPerson)
  })
  .catch(error=>{
    console.log(error)
    response.status(500).json({error:'saving person failed'})
  })
})

const PORT=process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
