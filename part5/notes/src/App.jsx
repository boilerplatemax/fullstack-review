import { useState, useEffect } from "react"
import axios from "axios"
import noteService from "./services/notes"

import "./App.css"

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important"
  return (
    <li>
      <p style={note.important ? { color: "red" } : {}}>{note.content}</p>

      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  )
}

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const hook = () => {
    console.log("effect")
    noteService.getAll().then((initialNotes) => {
      console.log("promise fulfilled")
      setNotes(initialNotes)
    })
  }

  useEffect(hook, [])

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
    console.log(`Set NewNote to: `, e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()

    const exists = notes.some((note) => note.content === newNote)

    if (exists) {
      console.log("That note is already in the DB")
      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(response.data))
      setNewNote("")
      console.log(`posted`, returnedNote)
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)))
      })

      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        ))}
      </ul>
      <h2>Add New Note</h2>
      <input
        type="text"
        onChange={(e) => handleNoteChange(e)}
        value={newNote}
      />
      <button onClick={addNote}>Submit</button>
    </div>
  )
}

export default App
