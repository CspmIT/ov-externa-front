import { useContext, useEffect, useState } from 'react'
import { FaHouse, FaComments, FaPlus } from 'react-icons/fa6'
import { FaArchive, FaInfoCircle, FaMoon, FaUser, FaLayerGroup, FaFileAlt, FaArrowAltCircleUp } from 'react-icons/fa'
import { HiMiniBars3BottomLeft } from 'react-icons/hi2'
import { IoIosSunny, IoMdArrowDropdown } from 'react-icons/io'
import styles from './Navbar.module.css'
import ItemNav from '../../components/ItemNav'
import Dropdown from '../Dropdown'
import DropdownImage from '../DropdownImage'
import { UserContext } from '../../contexts/UserContext'
import Axios from 'axios'

const Navbar = () => {
  const { darkMode, setDarkMode, usuario, account } = useContext(UserContext)
  const [activeItem, setActiveItem] = useState(null)
  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName)
  }
  const [iconMode, setIconMode] = useState(<FaMoon className='change' />)
  const [shadowMode, setShadowMode] = useState(darkMode ? 'styles.shadowDark' : 'styles.shadowLight')
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prevVisibility) => !prevVisibility)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('dark')
      setIconMode(<FaMoon className='change' />)
      setShadowMode('styles.shadowLight')
    } else {
      document.body.classList.add('dark')
      setIconMode(<IoIosSunny className='change text-2xl' />)
      setShadowMode('styles.shadowDark')
    }
  }, [darkMode])
  const saveChangeModeDark = async (status) => {
    // const url = 'http://localhost:8000/api/changeDarkMode'
    const url = 'http://cooptech.com.ar:30888/api/changeDarkMode'
    const info = { id: usuario.id, dark: status ? 1 : 0 }
    try {
      const responseData = await Axios.patch(url, info)
      if (responseData.status === 200) {
        console.log('correcto guardado')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    setIconMode(!darkMode ? <FaMoon className='change' /> : <IoIosSunny className='change text-2xl' />)
    setShadowMode(!darkMode ? 'styles.shadowDark' : 'styles.shadowLight')
    saveChangeModeDark(!darkMode)
  }

  const itemsData = [
    { name: 'Inicio', icon: <FaHouse />, link: '/', level: [1, 2, 3] },
    {
      name: 'Archivo',
      icon: <FaArchive />,
      dropdown: true,
      iconDropdown: <IoMdArrowDropdown />,
      idDrop: 'acueduct',
      level: [2, 3],
      list: [
        { name: 'Mis Facturas', link: '/Invoice' },
        { name: 'Mis Pagos', link: '/Payments' },
        { name: 'Mis Servicios', link: '/MyServices' },
        { name: 'Mis Consumos', link: '/MyConsumption' }
      ]
    },
    { name: 'Información Últil', icon: <FaInfoCircle />, link: '/Information', level: [1, 2, 3] },
    { name: 'Subir de nivel', icon: <FaArrowAltCircleUp />, link: '/LevelUp2', level: [1] },
    { name: 'Dejanos tu Opinión', icon: <FaComments />, link: '/Information', level: [1, 2, 3] }
  ]

  return (
    <div>
      <aside id='mobileMenu' className={`fixed top-16 sm:top-0 left-0 z-40 w-56 h-screen transition-transform ${isMobileMenuVisible ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
        <div className='h-full px-3 py-4 overflow-y-auto bg-zinc-200 dark:bg-zinc-800 noScrollbar'>
          <div className='m-2'>
            <img src='https://app.coopmorteros.coop/public/images/logos/Ofi_Virtual_Negro.png' />
          </div>
          <hr className='m-2' />
          <ul className='space-y-2 font-medium'>
            {itemsData.map((item, index) => {
              if (item.level.find((level) => level === usuario?.level)) {
                return <ItemNav key={index} props={item} isActive={item.name === activeItem} actionMobile={() => toggleMobileMenu()} onButtonClick={() => handleItemClick(item.name)} />
              }
              return null
            })}
          </ul>
        </div>
      </aside>
      <div className={`sm:ml-56 z-10 fixed ${styles.widthNab} top-0 max-w-full`}>
        <nav className=' dark:bg-zinc-950 bg-white'>
          <div className='mx-auto px-2 sm:px-6 lg:px-5 '>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <button onClick={toggleMobileMenu} aria-controls='mobileMenu' aria-expanded={isMobileMenuVisible} type='button' className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
                  <HiMiniBars3BottomLeft />
                </button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='hidden sm:ml-3 sm:block'>
                  <div className='flex space-x-4'>
                    <div className='pl-3 pr-4 py-2 md:p-0 font-medium flex dark:text-white items-center justify-between w-full md:w-auto text-gray-900'>
                      <FaUser />
                    </div>
                    <Dropdown data={account} titleColor='bg-amber-300 text-gray-900 hover:bg-amber-400' childrenColor='text-gray-700 dark:text-white block  hover:bg-gray-200 dark:hover:bg-gray-800' />
                    <span href='#' className='text-gray-900 font-medium px-2 dark:text-white hidden md:flex items-center justify-between w-full md:w-auto'>
                      <FaFileAlt className='mr-2' /> {usuario?.number_customer}
                    </span>
                    <span href='#' className='text-gray-900 font-medium px-2 dark:text-white hidden md:flex items-center justify-between w-full md:w-auto'>
                      <FaLayerGroup className='mr-2' />
                      Nivel: <b className='ml-2'>{usuario?.level}</b>
                    </span>
                    <button className='text-white bg-emerald-500 font-medium rounded px-2 py-1 flex items-center justify-between w-full md:w-auto'>
                      <FaPlus />
                      <span className='ml-2'>SOCIO</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button onClick={toggleDarkMode} className={`dark:text-white mr-2 ${styles.btnDark} ${shadowMode}`}>
                  {iconMode}
                </button>
                <button type='button' className='relative rounded-full p-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>View notifications</span>
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
                  </svg>
                </button>
                <DropdownImage />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
