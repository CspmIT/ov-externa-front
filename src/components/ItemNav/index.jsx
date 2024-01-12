import { Link } from "react-router-dom";

const ItemNav = ({ props, isActive, onButtonClick }) => {
  return (
    <li>
      {props.link ? (
        <Link to={props.link}>
          <a
            className={`cursor-pointer flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ${isActive ? 'bg-yellow-100' : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'}`}
            aria-controls={props.dropdown && props.idDrop}
            data-collapse-toggle={props.dropdown && props.idDrop}
            onClick={onButtonClick}
          >
            {props.icon}
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{props.name}</span>
            {props.dropdown && (
              <>
                {props.iconDropdown}
              </>)}
          </a>
        </Link>
      ) : (
        <div className={`cursor-pointer flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ${isActive ? 'bg-yellow-100' : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'}`} onClick={onButtonClick}>
          {props.icon}
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{props.name}</span>
          {props.dropdown && (
            <>
              {props.iconDropdown}
            </>)}
        </div>
      )}
      {props.dropdown && (
        <>
          <ul id={props.idDrop} className={`p-2 bg-white rounded dark:bg-zinc-800 m-2 space-y-2 relative ${isActive ? 'block' : 'hidden'}`}>
            {props.list.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>
                  <button className="w-full p-2 pl-3 text-left text-gray-900 transition duration-75 rounded-lg group hover:bg-zinc-200 dark:text-white dark:hover:bg-gray-700" onClick={() => console.log(item)}>
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
};


export default ItemNav;

