import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (name) =>{
    setNewName(name)
  }
  const handleNumberChange = (number) =>{
    setNewNumber(number)
  }

  const handleFilterChange = (currentFilter) =>{
    setFilter(currentFilter.toLocaleLowerCase())
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    if (validateName()) {
      setPersons([...persons, { name: newName, number:newNumber }]
    )}

    setNewName("")
    setNewNumber("")

  }

  const validateName = () => {
    if(persons.some(person => person.name === newName)){
      window.alert(`Error: ${newName} is already in the phone book`)
      return false
    }
    else return true
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App