import React from 'react'
const Persons = ({persons,filter, handleDelete}) =>{
    const filteredPersons = persons.filter(person=>person.name.toLocaleLowerCase().includes(filter)||person.number.includes(filter))

    return filteredPersons.map(person=>
    <div key={person.name}>{person.name} {person.number}
    <button onClick={()=>handleDelete(person)}>
      delete
    </button>
    </div>)
  }

export default Persons