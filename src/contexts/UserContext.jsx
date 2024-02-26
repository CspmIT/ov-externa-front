
import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider ({ children }) {
  const [darkMode, setDarkMode] = useState(0);
  const [variable2, setVariable2] = useState('Valor inicial de variable2');
  const [variable3, setVariable3] = useState('Valor inicial de variable3');

  // Puedes tener más variables aquí...

  return (
    <UserContext.Provider value={{ darkMode, setDarkMode, variable2, setVariable2, variable3, setVariable3 }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };

