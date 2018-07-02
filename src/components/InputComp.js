import React from 'react'

const InputComp = (props) => {
  return (
    <div className={`labeltrick ${props.name}`}>
      <input id={props.name}
             name={props.name}
             value={props.value}
             onBlur={props.blur}
             onChange={props.change}/>
           <label htmlFor={props.name} className={props.className}>{props.labelText}</label>
    </div>
  )
}

export default InputComp
