import { useState, useEffect } from "react";
import personService from "./services/Person";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const fetchPersons = () => {
    personService.getAll().then((response) => {
      setPersons(response);
      console.log(`data fetched: `, response);
    });
  };

  useEffect(fetchPersons, []);

  const handleNameChange = (name) => {
    setNewName(name);
  };
  const handleNumberChange = (number) => {
    setNewNumber(number);
  };

  const handleFilterChange = (currentFilter) => {
    setFilter(currentFilter.toLocaleLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingContact = persons.find((person) => person.name === newName);
    if (existingContact) {
      const updatedPerson = { ...existingContact, number: newNumber };

      if (
        existingContact.number &&
        !window.confirm(
          "Are you sure you want to edit an existing phone number?",
        )
      )
        return;
      personService
        .editContact(updatedPerson)
        .then((savedPerson) => {
          setPersons(
            persons.map((p) => (p.id === savedPerson.id ? savedPerson : p)),
          );
          displayNotification(`${savedPerson.name} has been updated`);
        })
        .catch((error) => {
          if (error.response?.status === 404)
            displayNotification(
              {content:`${updatedPerson.name} could not be found in the system`,type:'error'}
            );
        });
      fetchPersons();
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.addContact(newPerson).then((response) => {
        setPersons((prevPersons) => [...prevPersons, response]);
        displayNotification({content:`${response.name} has been added`, type:'added'});
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (p) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    personService.deleteContact(p.id).then(() => {
      setPersons(persons.filter((person) => person.id !== p.id));
      displayNotification({content:`${p.name} has been deleted`,type:'deleted'});
    });
  };

  

  const displayNotification = ({content, type}) => {
    setMessage({content, type})

    setTimeout(() => {


      setMessage(null);
    }, 5000);
  };

  if (!persons) { 
    return null 
  }
  return (
    <div>
      <h2 style={{color:"purple"}}>Phonebook</h2>
      <Notification message={message}/>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
