import { createContext, useContext, useReducer } from 'react'

const RegFormContext = createContext()

export const useRegForm = () => {
  return useContext(RegFormContext)
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return { ...state, step: state.step + 1 }
    case 'back':
      return { ...state, step: state.step - 1 }
    case 'reset':
      return { step: 1, data: {} }
    case 'select_services':
      return { ...state, services: { ...action.data } }
    case 'set_step_1':
      return { ...state, step1: { ...action.data } }
    case 'set_step_2':
      return { ...state, step2: { ...action.data } }
    default:
      return state
  }
}

const RegFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { step: 1, data: {} })

  return (
    <RegFormContext.Provider value={[state, dispatch]}>
      {children}
    </RegFormContext.Provider>
  )
}

export default RegFormProvider
