import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ ...props }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`${props.titleColor} inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-1 font-medium shadow-sm`}
          id="menu-button-test"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
           COSTAMAGNA JULIETA
          <IoMdArrowDropdown className="-mr-1 h-5 w-5" />
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute left-0 z-10 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button-test"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a href="#" className={`${props.childrenColor} px-4 py-1 `} role="menuitem" tabIndex="-1" id="menu-item-0">
              COSTAMAGNA JULIETA
            </a>
            <a href="#" className={`${props.childrenColor} px-4 py-1 `} role="menuitem" tabIndex="-1" id="menu-item-0">
              COSTAMAGNA JULIETA
            </a>
            <a href="#" className={`${props.childrenColor} px-4 py-1 `} role="menuitem" tabIndex="-1" id="menu-item-0">
              COSTAMAGNA JULIETA
            </a>
            <a href="#" className={`${props.childrenColor} px-4 py-1 `} role="menuitem" tabIndex="-1" id="menu-item-0">
              COSTAMAGNA JULIETA
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
