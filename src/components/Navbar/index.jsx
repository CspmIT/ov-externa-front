import { useContext, useEffect, useState } from 'react'
import { FaHouse, FaComments, FaPlus } from 'react-icons/fa6'
import { FaRegListAlt, FaArchive, FaInfoCircle, FaMoon, FaUser, FaLayerGroup, FaFileAlt, FaArrowAltCircleUp, FaHandshake } from 'react-icons/fa'
import { HiMiniBars3BottomLeft } from 'react-icons/hi2'
import { IoIosSunny, IoMdArrowDropdown } from 'react-icons/io'
import styles from './Navbar.module.css'
import ItemNav from '../../components/ItemNav'
import Dropdown from '../Dropdown'
import DropdownImage from '../DropdownImage'
import { UserContext } from '../../contexts/UserContext'
import { request } from '../../utils/request'
import { Box, Modal } from '@mui/material'
import ModalSocio from '../ModalSocio'
import { storage } from '../../storage/storage'
import { json } from 'react-router-dom'

const Navbar = () => {
	const [OpenModal, setOpenModal] = useState(false)
	const { darkMode, setDarkMode, usuario, account, setUsuario, setAccount } = useContext(UserContext)
	const [activeItem, setActiveItem] = useState(null)
	const handleItemClick = (itemName) => {
		setActiveItem(itemName === activeItem ? null : itemName)
	}
	const [img, setImg] = useState('Negro.png')
	const [iconMode, setIconMode] = useState(<FaMoon className='change' />)
	const [shadowMode, setShadowMode] = useState(darkMode ? 'styles.shadowDark' : 'styles.shadowLight')
	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)
	const handleOpenModal = () => setOpenModal(true)
	const handleCloseModal = () => setOpenModal(false)

	const toggleMobileMenu = () => {
		setMobileMenuVisible((prevVisibility) => !prevVisibility)
	}

	useEffect(() => {
		if (!darkMode) {
			document.body.classList.remove('dark')
			setIconMode(<FaMoon className='change' />)
			setShadowMode('styles.shadowLight')
			setImg('Negro.png')
		} else {
			document.body.classList.add('dark')
			setIconMode(<IoIosSunny className='change text-2xl' />)
			setShadowMode('styles.shadowDark')
			setImg('Blanco.png')
		}
	}, [darkMode])

	const updateDarkMode = async (dark) => {
		try {
			dark = dark ? 1 : 0
			const array = { dark }
			await request(import.meta.env.VITE_APP_API_URL + '/updateUser', 'patch', array)
		} catch (error) {
			console.error('Error al obtener datos:', error)
		}
	}

	const toggleDarkMode = () => {
		updateDarkMode(!darkMode)
		setDarkMode(!darkMode)
		if (usuario.sub) {
			storage.set('usuario', { ...usuario, dark: !darkMode })
		}
		setIconMode(!darkMode ? <FaMoon className='change' /> : <IoIosSunny className='change text-2xl' />)
		setShadowMode(!darkMode ? 'styles.shadowDark' : 'styles.shadowLight')
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
				{ name: 'Mis Consumos', link: '/MyConsumption' },
			],
		},
		{
			name: 'Solicitar un Servicio',
			icon: <FaHandshake />,
			link: '/MultiStepForm',
			level: [1, 2, 3],
		},
		{
			name: 'Estado de mi Trámite',
			icon: <FaRegListAlt />,
			link: '/myRequests',
			level: [1, 2, 3],
		},
		{
			name: 'Información Últil',
			icon: <FaInfoCircle />,
			link: '/Information',
			level: [1, 2, 3],
		},
		{
			name: 'Subir de nivel',
			icon: <FaArrowAltCircleUp />,
			link: '/LevelUp2',
			level: [1],
		},
		{
			name: 'Dejanos tu Opinión',
			icon: <FaComments />,
			link: '/Opinion',
			level: [1, 2, 3],
		},
	]
	const getAccounts = async () => {
		const otherCustomer = await request(import.meta.env.VITE_APP_API_URL + '/allOther', 'GET')
		// Busco en el localstorage('usuario') el campo active
		const activeCustomer = JSON.parse(localStorage.getItem('usuario'))
		if (!activeCustomer.active) {
			activeCustomer.active = otherCustomer.data[0].id
			localStorage.setItem('usuario', JSON.stringify(activeCustomer))
		}
		let DataOtherUser = await otherCustomer.data.map((item) => {
			return {
				id_relation: item.id,
				name: item.data_Person.procoop_last_name,
				num: item.data_Person.number_customer,
				primary: item.primary_account,
				level: item.level,
				active: item.id === activeCustomer.active,
			}
		})
		if (!DataOtherUser.length) {
			DataOtherUser = [{ level: 1, primary: true }]
		}
		const user = { ...usuario, accounts: [...DataOtherUser] }
		setAccount(DataOtherUser.filter((item) => item.primary)[0])
		setUsuario(user)
	}

	useEffect(() => {
		if (!account.length) {
			if (!usuario.accounts) {
				getAccounts()
			}
		}
	}, [usuario])
	return (
		<div>
			<aside id='mobileMenu' className={`fixed top-16 sm:top-0 left-0 z-40 w-56 h-screen transition-transform ${isMobileMenuVisible ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
				<div className='h-full px-3 py-4 overflow-y-auto bg-zinc-200 dark:bg-zinc-800 noScrollbar'>
					<div className='m-2'>
						<img src={`https://app.coopmorteros.coop/public/images/logos/Ofi_Virtual_${img}`} />
					</div>
					<hr className='m-2' />
					<ul className='space-y-2 font-medium'>
						{itemsData.map((item, index) => {
							if (item.level.find((level) => level === account?.level)) {
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
								<button
									onClick={toggleMobileMenu}
									aria-controls='mobileMenu'
									aria-expanded={isMobileMenuVisible}
									type='button'
									className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
								>
									<HiMiniBars3BottomLeft />
								</button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='hidden sm:ml-3 sm:block'>
									{account.level >= 2 ? (
										<div className='flex space-x-4'>
											<div className='pl-3 pr-4 py-2 md:p-0 font-medium flex dark:text-white items-center justify-between w-full md:w-auto text-gray-900'>
												<FaUser />
											</div>
											<Dropdown
												data={account}
												titleColor='bg-amber-300 text-gray-900 hover:bg-amber-400'
												childrenColor='text-gray-700 dark:text-white block  hover:bg-gray-200 dark:hover:bg-gray-800'
											/>
											<span href='#' className='text-gray-900 font-medium px-2 dark:text-white hidden md:flex items-center justify-between w-full md:w-auto'>
												<FaFileAlt className='mr-2' /> {account?.num}
											</span>
											<span href='#' className='text-gray-900 font-medium px-2 dark:text-white hidden md:flex items-center justify-between w-full md:w-auto'>
												<FaLayerGroup className='mr-2' />
												Nivel: <b className='ml-2'>{account?.level}</b>
											</span>
											<button onClick={handleOpenModal} className='text-white bg-emerald-500 font-medium rounded px-2 py-1 flex items-center justify-between w-full md:w-auto'>
												<FaPlus />
												<span className='ml-2'>SOCIO</span>
											</button>
										</div>
									) : (
										<span href='#' className='text-gray-900 font-medium px-2 dark:text-white hidden md:flex items-center justify-between w-full md:w-auto'>
											<FaLayerGroup className='mr-2' />
											Nivel: <b className='ml-2'>{account?.level}</b>
										</span>
									)}
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<button onClick={toggleDarkMode} className={`dark:text-white mr-2 ${styles.btnDark} ${shadowMode}`}>
									{iconMode}
								</button>
								<DropdownImage />
							</div>
						</div>
					</div>
				</nav>
			</div>
			<Modal className='flex justify-center items-center !z-50' open={OpenModal} onClose={handleCloseModal} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
				<Box className={'w-full flex justify-center items-center'}>
					<ModalSocio handleCloseModal={handleCloseModal} />
				</Box>
			</Modal>
		</div>
	)
}

export default Navbar
