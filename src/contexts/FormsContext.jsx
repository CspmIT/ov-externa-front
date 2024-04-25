import React, { useState } from 'react'

export const FormValidContext = React.createContext()

export const FormValidProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false)

  return (
    <FormValidContext.Provider value={{ isValid, setIsValid }}>
      {children}
    </FormValidContext.Provider>
  )
}
