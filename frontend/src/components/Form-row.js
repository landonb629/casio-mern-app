import React from 'react'

const FormRow = ({label, type, handleInput, name}) => { 
    return(
     <div>
      <label name={name}>{label}</label>
      <br></br>
      <input type={type} onChange={handleInput}></input>
     </div>
    
    )

}

export default FormRow