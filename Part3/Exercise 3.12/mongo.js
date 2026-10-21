require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  
const personSchema=new mongoose.Schema({
    name:String,
    number:String,
})

const Person=mongoose.model('Person',personSchema)

const name=process.argv[2]
const number=process.argv[3]

if (name && number){
    const person=new Person({
        name:name,
        number:number,
    } )

person.save().then(result=>{
     console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
})
.catch(error=>{
    console.log('Error saving person:', error.message)
})
.finally(()=>{
    mongoose.connection.close()
})
}

else {
  Person.find({})
    .then(result => {
      console.log('phonebook:')

      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
    .catch(error => {
      console.log('Error fetching phonebook:', error.message)
    })
    .finally(() => {
      mongoose.connection.close()
    })
}
