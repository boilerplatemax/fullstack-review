import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/Person'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const fetchPersons = () =>{
    personService.getAll().then(
      response=>{
        setPersons(response)
        console.log(`data fetched: `, response)
      }
    )
  }

  useEffect(fetchPersons,[])

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
      const existingContact = persons.find(person=>person.name===newName)
      if(existingContact){
      const updatedPerson = {...existingContact,number:newNumber}
      
      if(existingContact.number&&!window.confirm('Are you sure you want to edit an existing phone number?')) return
      personService.editContact(updatedPerson).then(savedPerson => {
    setPersons(persons.map(p => p.id === savedPerson.id ? savedPerson : p))
  })

    }
    else{
      const newPerson={name:newName,number:newNumber}
      personService.addContact(newPerson).then(response=>{
        setPersons(prevPersons => [...prevPersons, response])

      })
    }

    setNewName("")
    setNewNumber("")

  }

  const handleDelete = id =>{
    if (!window.confirm('Are you sure you want to delete this contact?')) return
    personService.deleteContact(id).then(()=>setPersons(persons.filter(person=>person.id!==id)) 
    )
  }

  // const handleEdit = person =>{
  //   if(window.confirm('Are you sure you want to edit an existing phone number?')) return
  //   personService.editContact(person).then(updatedPerson => {
  //   setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
  // })
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App