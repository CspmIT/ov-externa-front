import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";


import Login from "./views/Login";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Navbar from "./components/Navbar";
import Information from "./views/Information";
import Invoice from "./views/Invoice";
import Payments from "./views/Payments";
import Handle from "./views/Handle";
import MyServices from "./views/MyServices";
import MyServicesD from "./views/MyServices/detail";
import LevelUp2 from "./views/LevelUp/leveldos";
import Authentication from "./views/LevelUp/authenticationPhotoSID";
import stylesNab from "./components/Navbar/Navbar.module.css";
import MyConsumption from "./views/MyConsumption";
import Footer from "./components/Footer";
function App() {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const currentYear = new Date().getFullYear();

  let rutes = [
    { name: "/", element: <Home /> },
    { name: "/*", element: <NotFound /> },
    { name: "/Information", element: <Information /> },
  ];

  if (user) {
    let menus = [];
    if (user["level"] == 1) {
      menus.push({ name: "/LevelUp2", element: <LevelUp2 /> });
    } else {
      menus.push({ name: "/authentication", element: <Authentication /> }, { name: "/Invoice", element: <Invoice /> }, { name: "/MyServices", element: <MyServices /> }, { name: "/Payments", element: <Payments /> }, { name: "/Handle", element: <Handle /> }, { name: "/detail", element: <MyServicesD /> }, {name: "/MyConsumption", element: <MyConsumption />});
    }
    rutes.push(...menus);
  }
  return (
      <div className="flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700">
        {user && <Navbar />}
        <div className={`flex-grow p-2 ${user ? 'sm:pl-64 pt-20' : ''} `}>
          <Routes>
            {user ? (
              <>
                <Route key="login" path="/Login" element={<Navigate to="/" />} />
                <Route key="register" path="/Register" element={<Navigate to="/" />} />
                {rutes.map((rute) => (
                  <Route key={rute.name} path={rute.name} element={rute.element} />
                ))}
              </>
            ) : (
              <>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/" element={<Navigate to="/Login" />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
