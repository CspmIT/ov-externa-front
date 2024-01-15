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
import Footer from "./components/Footer";
import ManageServices from "./views/ManageServices";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
        menus.push({ name: "/LevelUp3", element: <LevelUp3 /> });
      } else {
        menus.push({ name: "/ManageServices", element: <ManageServices /> });
      }
      menus.push(
        { name: "/Invoice", element: <Invoice /> },
        { name: "/MyServices", element: <MyServices /> },
        { name: "/Payments", element: <Payments /> },
        { name: "/Handle", element: <Handle /> },
        { name: "/ConsumptionSimulator", element: <ConsumptionSimulator /> },
        { name: "/detail", element: <MyServicesD /> }
      );
    }
    rutes.push(...menus);
  }
  return (
    <div className="w-screen h-screen overflow-y-auto">
      {user && <Navbar />}
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
      <Footer />
    </div>
  );
}

export default App;
