import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
    const [darkMode, setDarkMode] = useState(0)
    const [usuario, setUsuario] = useState([])
    const [account, setAccount] = useState([])
    const [payConcept, setPayConcept] = useState([])
    const [backOk, setBackOk] = useState(true)

    useEffect(() => {
        if (!usuario.length) {
            const storedUser = localStorage.getItem('usuario')
            setUsuario(JSON.parse(storedUser))
            setDarkMode(JSON.parse(storedUser)?.dark)
        }
    }, [children])

    return (
        <UserContext.Provider
            value={{
                darkMode,
                setDarkMode,
                usuario,
                setUsuario,
                account,
                setAccount,
                payConcept,
                setPayConcept,
                backOk,
                setBackOk,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider }
