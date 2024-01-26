import React, { useState } from "react";

const Dropdown = ({ props }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`${props.titleColor} inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold shadow-sm`}
          id="menu-button-test"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          GONZALEZ RAUL AMERICO
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button-test"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a href="#" className={`${props.childrenColor} px-4 py-2`} role="menuitem" tabIndex="-1" id="menu-item-0">
              AUTISTA JULIETA
            </a>
            {/* Add other menu items */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
