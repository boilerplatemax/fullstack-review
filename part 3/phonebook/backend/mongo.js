const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const firstName = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://maxs:${password}@phonebook.xiefv7k.mongodb.net/phonebook?retryWrites=true&w=majority&appName=phonebook`;


mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema, 'persons')

const person = new Person({
  name: firstName,
  number: phoneNumber,
})

if (process.argv.length === 5){
person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})
}
else if(process.argv.length ===3){
console.log('phonebook:')
Person.find({}).then(result => {
  result.forEach(p => {
    console.log(`${p.name} ${p.number}`)
  })
  mongoose.connection.close()
})
}
else{
    console.log("Incorrect amount of arguments")
}


