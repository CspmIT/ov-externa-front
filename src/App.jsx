import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import Information from "./views/Information";
import Invoice from "./views/Invoice";
import Payments from "./views/Payments";
import Handle from "./views/Handle";
import MyServices from "./views/MyServices";
import MyServicesD from "./views/MyServices/detail";
import LevelUp2 from "./views/LevelUp/leveldos";
import Authentication from "./views/LevelUp/authenticationPhotoSID";
import MyConsumption from "./views/MyConsumption";
import Footer from "./components/Footer";
import Profile from "./views/Profile";
import BaseInitial from "./views/BaseInitial";
import RestorePassword from "./views/RestorePassword";
import ChangePassword from "./views/ChangePassword";
import { UserContext } from "./contexts/UserContext";
import LoaderComponent from "./components/Loader";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {
  const { darkMode } = useContext(UserContext);
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [theme, setTheme] = useState(darkMode ? darkTheme : lightTheme);
  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  const loginRoutes = [
    {
      name: "/Login",
      element: (
        <BaseInitial>
          <Login />
        </BaseInitial>
      ),
    },
    {
      name: "/Login/:token/:idUser",
      element: (
        <BaseInitial>
          <Login />
        </BaseInitial>
      ),
    },
    {
      name: "/Register",
      element: (
        <BaseInitial>
          <Register />
        </BaseInitial>
      ),
    },
    {
      name: "/RestorePassword",
      element: (
        <BaseInitial>
          <RestorePassword />
        </BaseInitial>
      ),
    },
    {
      name: "/ChangePassword/:token",
      element: (
        <BaseInitial>
          <ChangePassword />
        </BaseInitial>
      ),
    },
  ];

  const userRoutes = [
    { path: "/", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/information", element: <Information /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/payments", element: <Payments /> },
    { path: "/handle", element: <Handle /> },
    { path: "/myservices", element: <MyServices /> },
    { path: "/myservices/detail", element: <MyServicesD /> },
    { path: "/levelup2", element: <LevelUp2 /> },
    { path: "/authentication", element: <Authentication /> },
    { path: "/myconsumption", element: <MyConsumption /> },
  ];
  return (
    <div className="flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {loginRoutes.map((route) => (
              <Route key={route.name} path={route.name} element={route.element} />
            ))}
            <Route element={<ProtectedRoutes />}>
              {userRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>

      {/* <div className='flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700'>
        {isLoading ? (
          <div className='h-full w-full flex justify-center items-center'>
            <LoaderComponent />
          </div>
        ) : (
          <>
            {navBar}
            <div
              className={`flex-grow  ${usuario ? 'sm:pl-60 pt-20 pb-8' : ''} `}
            >
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.name}
                    path={route.path ?? route.name}
                    element={route.element}
                  />
                ))}
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div> */}
    </div>
  );
}

export default App;
