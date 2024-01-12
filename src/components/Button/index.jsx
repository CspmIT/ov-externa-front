import React from 'react'

const Button = ({props}) => {
  return (
    <button type={props.type && (props.type)} className={`${props.class} py-2 px-4 font-semibold rounded-xl shadow-md` }>{props.text} </button>
  )
}

export default Button