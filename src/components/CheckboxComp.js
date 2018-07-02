import React from 'react'

const CheckboxComp = ({name,text,change,checked,category}) => {
  return (
    <li>
      <label className="checkbox-style">
        <input type="checkbox"
               id={name}
               onChange={change}
               checked={checked}
               value={name}
               name={category}
               />
        <span />
        <span>{text}</span>
      </label>
    </li>
  )
}

export default CheckboxComp
