import React from 'react'

const Filter= ({handleFilterChange,filter}) =>{
return(
    <div>filter shown with 
        <input onChange={e=>handleFilterChange(e.target.value)} placeholder='search a name or number' value={filter}/>
    </div>
)
}

export default Filter