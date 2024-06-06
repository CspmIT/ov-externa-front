import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Cookies from 'js-cookie'
import { request } from '../../utils/request'

const DropdownImage = ({ props }) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false)
	const navigator = useNavigate()
	const { setUsuario, usuario } = useContext(UserContext)
	const [imgProfile, setImgProfile] = useState('https://app.coopmorteros.coop/public/images/cooptech/Iso_Cooptech.png')
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen)
	}
	const handleLogout = () => {
		toggleDropdown()
		localStorage.removeItem('usuario')
		Cookies.remove('token')
		setUsuario('')
		document.body.classList.remove('dark')
		setTimeout(() => {
			navigator('/login')
		}, 750)
	}

	const dropdownRef = useRef(null) // Referencia al dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			console.log('hola')
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false)
			}
		}

		// Agregar el escuchador de eventos al montar el componente
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Limpiar el escuchador de eventos al desmontar el componente
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	// Chequeo si existe la imagen en el servidor y si el servidor esta activo
	useEffect(() => {
		const checkServerStatus = async () => {
			setImgProfile('https://app.coopmorteros.coop/public/images/cooptech/Iso_Cooptech.png')
			if (!usuario.img_profile) {
				return
			}
			const directory = 'images/profile/' + usuario.img_profile
			try {
				const response = await request(`${import.meta.env.VITE_FILE_API_URL}/existsFile`, 'POST', { directory })
				if (response.status === 200) {
					setImgProfile(`${import.meta.env.VITE_FILE_API_URL}/images/profile/${usuario.img_profile}`)
				}
			} catch (error) {
				console.log('Error checking server status:', error)
			}
		}
		checkServerStatus()
	}, [usuario])
	return (
		<div className='relative inline-block text-left ml-3' ref={dropdownRef}>
			<div>
				<button
					type='button'
					className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
					id='user-menu-button'
					aria-expanded='false'
					aria-haspopup='true'
					onClick={toggleDropdown}
				>
					<img className='h-8 w-8 rounded-full' src={imgProfile} alt='Perfil' />
				</button>
			</div>
			{isDropdownOpen && (
				<div
					className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='user-menu-button'
					tabIndex='-1'
				>
					<div className='py-1' role='none'>
						{usuario.level >= 2 ? (
							<Link
								to='/Profile'
								onClick={toggleDropdown}
								className='px-2 py-1 flex items-center w-full md:w-auto hover:bg-gray-200 pl-4 dark:text-white dark:hover:bg-gray-700'
								role='menuitem'
								tabIndex='-1'
								id='user-menu-item-0'
							>
								<FaUser className='mr-2' /> Perfil
							</Link>
						) : null}
						<a
							href='#'
							onClick={() => handleLogout()}
							className='px-2 py-1 flex items-center w-full md:w-auto hover:bg-gray-200 pl-4 dark:text-white dark:hover:bg-gray-700'
							role='menuitem'
							tabIndex='-1'
							id='user-menu-item-1'
						>
							<FaSignOutAlt className='mr-2' /> Cerrar Sesión
						</a>
					</div>
				</div>
			)}
		</div>
	)
}

export default DropdownImage
