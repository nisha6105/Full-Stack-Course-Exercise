require('dotenv').config()

const mongoose=require('mongoose')
const express=require('express')
const cors=require('cors')  //allows server to specify which origins may access its responses
const morgan=require('morgan')  //middleware that logs http req to server's terminal

const app=express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body',(request)=>JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

const url=process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
   .then(()=>{
    console.log('Connected to MongoDB')
   })
   .catch(error=>{
    console.log('Error connecting to MongoDB: ',error.message)
   })

const personSchema=new mongoose.Schema({  //personSchema defined fields each phonebook contact have
   name:{
      type:String,
      minLength:3,
      required:true,
   },
   number:String,
})

const Person=mongoose.model('Person',personSchema)  //Person is mongoose model to interact Person collection of momgodb

app.get('/api/persons',(request,response,next)=>{
   Person.find({})
     .then(persons=>{
        response.json(persons)
     })
     .catch(error=>next(error))
})

app.get('/api/persons/:id',(request,response,next)=>{
   Person.findById(request.params.id)
     .then(person=>{
      if(person){
         response.json(person)
      }
      else{
         response.status(404).end()
      }
     })
     .catch(error=>next(error))
})

app.get('/info',(request,response,next)=>{
   Person.countDocuments({})
     .then(count=>{
        response.send(
         `<p>Phonebook has info for ${count} people </p>`+
         `<p>${new Date()}</p>`
        )
     })
       .catch(error=>next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons',(request,response,next)=>{
   const body=request.body

   const person=new Person({
      name:body.name,
      number:body.number,
   })

   person.save()
     .then(savedPerson=>{
      response.json(savedPerson)
     })
     .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{
   const body=request.body

   const person={
      name:body.name,
      number:body.number,
   }

   Person.findByIdAndUpdate(
      request.params.id,
      person,
      {new:true, runValidators:true,context:'query'}   
   )
     .then(updatedPerson=>{
      if(updatedPerson){
         response.json(updatedPerson)
      }
      else{
         response.status(404).end()
      }
     })
     .catch(error=>next(error))
})

const errorHandler=(error,request,response,next)=>{
   console.error(error.message)

   if(error.name==='CastError'){
      return response.status(400).send({
         error:'malformatted id',
      })
   }
   next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})