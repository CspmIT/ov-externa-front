import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
{/* ----------------- VISTAS ----------------- */ }
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
import ConsumptionSimulator from "./views/ConsumptionSimulator";
import LevelUp2 from "./views/LevelUp/leveldos";
import LevelUp3 from "./views/LevelUp/leveltres";
import Authentication from "./views/LevelUp/authenticationPhotoSID";
import stylesNab from "./components/Navbar/Navbar.module.css";



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
      if (user["level"] == 2) {
        menus.push({ name: "/LevelUp3", element: <LevelUp3 /> }, { name: "/authentication", element: <Authentication /> });
      } else {
        // menus.push({ name: "/ManageServices", element: <ManageServices /> });
        // menus.push({ name: "/ManageServices", element: <ManageServices /> },
        //   { name: "/authentication", element: <Authentication /> },
        //   { name: "/Coopate", element: <Coopate /> },
        //   { name: "/Coopate/Canjes", element: <Canjes /> },
        //   { name: "/Coopate/Terminos", element: <Terminos /> },
        //   { name: "/Coopate/Comercios", element: <Comercios /> }
        // );
      }
      menus.push(
        { name: "/Invoice", element: <Invoice /> },
        { name: "/MyServices", element: <MyServices /> },
        { name: "/Payments", element: <Payments /> },
        { name: "/Handle", element: <Handle /> },
        { name: "/ConsumptionSimulator", element: <ConsumptionSimulator /> },
        { name: "/detail", element: <MyServicesD /> },
        // { name: "/myPostulation", element: <myPostulation /> },
        // { name: "/jobSerach", element: <jobSerach /> },
        // { name: "/myCV", element: <myCV /> }
      );
    }
    rutes.push(...menus);
  }
  return (
    <div className="flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700">
      {user && <Navbar />}
      <div className="flex-grow p-2 sm:pl-64 pt-20">
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
      <footer className={`p-2 sm:ml-56 bg-white dark:bg-zinc-950 dark:text-gray-300 ${stylesNab.widthNab} mt-auto`}>
        <div className="w-full mx-auto max-w-screen-xl p-10 md:flex md:items-center md:justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Versión 5.0 <br />
            Copyright © IT & Development -
            <a href="https://coopmorteros.com/" target="_bank" className="hover:underline text-yellow-400"> COOPMORTEROS</a> {currentYear}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
