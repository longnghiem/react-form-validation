import React from 'react'

const RadioComp = ({id, name, label,checked,changed}) => {
  return (
    <li>
      <input type="radio"
             id={id}
             name={name}
             checked={checked}
             value={id}
             onChange={changed}  />
      <label htmlFor={id}>  {label} </label>
    </li>
  )
}

export default RadioComp
