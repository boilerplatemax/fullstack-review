import axios from "axios";
const url = '/api/persons'

const getAll = () =>axios.get(url).then(response=>response.data)

const addContact = newContact=>axios.post(url,newContact).then(response=>response.data)

const deleteContact = id => axios.delete(`${url}/${id}`).then(response=>response.data)

const editContact= person => 
{
const request = axios.put(`${url}/${person.id}`,person).then(response=>response.data)
return request
}

export default {getAll, addContact, deleteContact, editContact}