
import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider ({ children }) {
  const [darkMode, setDarkMode] = useState(0);

  // Puedes tener más variables aquí...

  return (
    <UserContext.Provider value={{ darkMode, setDarkMode}}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };

