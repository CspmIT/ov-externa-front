import { useState, createContext } from 'react'

export const FormValidContext = createContext()

export const FormValidProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false)

  return (
    <FormValidContext.Provider value={{ isValid, setIsValid }}>
      {children}
    </FormValidContext.Provider>
  )
}
