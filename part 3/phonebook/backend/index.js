require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')


app.use(express.static('dist'))
app.use(express.json())


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('post-body', (req)=> { return req.method==='POST'? JSON.stringify(req.body) : '' })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

app.get('/info', (request, response) => {
  response.send(`<div>
    <p>Phone book has info for ${persons.length} people.</p>
    <p>${new Date}</p>
  </div>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p=>{
    response.json(p)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
     .catch(error => {
      console.log(error)
      response.status(500).end()
    })
});

const generateId = () => {
  return Math.floor(Math.random() * 999999).toString()
}

app.post('/api/persons', (request, response)=>{
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  
  const existingPerson = Person.find({}).then(
  p => p.name.toLowerCase() === body.name.toLowerCase()
)

if (existingPerson) {
  console.log('Duplicate found:', existingPerson)
  return response.status(400).json({ error: 'name already in the system' })
}

const person = new Person({
    name:body.name,
    number: body.number,
    id: generateId(),
})

person.save().then(savedPerson=>{
  response.json(savedPerson)
})

})

app.delete('/api/persons/:id',(request, response)=>{
    const id = request.params.id
    persons = persons.filter(p=>p.id!==id)
    
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})