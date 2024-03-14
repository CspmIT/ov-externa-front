import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
    const [darkMode, setDarkMode] = useState(0)
    const [usuario, setUsuario] = useState([])
    useEffect(() => {
        const storedUser = localStorage.getItem('usuario')
        setUsuario(JSON.parse(storedUser))
        setDarkMode(JSON.parse(storedUser)?.dark)
    }, [children])

    return <UserContext.Provider value={{ darkMode, setDarkMode, usuario, setUsuario }}>{children}</UserContext.Provider>
}
export { UserContext, UserProvider }
