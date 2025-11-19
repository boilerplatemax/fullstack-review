import React from 'react'

const PersonForm = ({handleNameChange, handleNumberChange,handleSubmit, newName, newNumber,})=>{
return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={e=>handleNameChange(e.target.value)} value={newName}/>
        </div>
        <div>
          number: <input onChange={e=>handleNumberChange(e.target.value)} value={newNumber}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
)
}

export default PersonForm