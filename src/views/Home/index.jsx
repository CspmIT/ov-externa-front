import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Dashboard from "../Dashboard";
const Home = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : null;
      });
    return (
        <>
            <Navbar />
            <div className={`flex-grow p-2 ${user ? "sm:pl-64 pt-20" : ""} `}>
                <Dashboard />
            </div>
            <Footer />
        </>
    );
};

export default Home;
