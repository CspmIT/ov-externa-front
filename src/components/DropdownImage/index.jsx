import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const DropdownImage = ({ props }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigator = useNavigate();
    const { setUsuario } = useContext(UserContext);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario("")
    };

    return (
        <div className="relative inline-block text-left ml-3">
            <div>
                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={toggleDropdown}>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="imagen de perfil" />
                </button>
            </div>
            {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        <Link to="/Profile" className="px-2 py-1 flex items-center w-full md:w-auto hover:bg-gray-200 pl-4 dark:text-white dark:hover:bg-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                            <FaUser className="mr-2" /> Perfil
                        </Link>
                        <a href="#" onClick={() => handleLogout()} className="px-2 py-1 flex items-center w-full md:w-auto hover:bg-gray-200 pl-4 dark:text-white dark:hover:bg-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                            <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownImage;
