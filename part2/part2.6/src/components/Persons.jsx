import React from 'react'
const Persons = ({persons,filter}) =>{
    const filteredPersons = persons.filter(person=>person.name.toLocaleLowerCase().includes(filter)||person.number.includes(filter))

    return filteredPersons.map(person=><p key={person.name}>{person.name} {person.number}</p>)
  }

export default Persons