import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { UserContext } from '../../contexts/UserContext'
import styles from './dropdown.module.css'
import { useNavigate } from 'react-router-dom'

const Dropdown = ({ ...props }) => {
	const navigate = useNavigate()
	const [isDropdownOpen, setDropdownOpen] = useState(false)
	const { usuario, account, setAccount } = useContext(UserContext)
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen)
	}

	const handleChangeAccount = (item, drop = true) => {
		if (item.num === account.num) {
			return
		}
		const activeUser = JSON.parse(localStorage.getItem('usuario'))
		activeUser.active = item.id_relation
		localStorage.setItem('usuario', JSON.stringify(activeUser))
		item.active = true
		setAccount(item)
		navigate('/')
		if (drop) {
			toggleDropdown()
		}
	}

	useEffect(() => {
		// Para dejar la ultima cuenta activa en caso de recargar la página
		if (usuario.accounts.length <= 1) {
			return
		}
		usuario.accounts.forEach((item) => {
			if (item.active) {
				handleChangeAccount(item, false)
			} else {
				item.active = false
			}
		})
	}, [usuario])
	return (
		<div className={`relative inline-block text-left ${props.className ?? ''}`}>
			<div>
				<button
					type='button'
					className={`${props.titleColor} h-8 overflow-hidden inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-1 font-medium shadow-sm`}
					id='menu-button-test'
					aria-expanded={isDropdownOpen}
					aria-haspopup='true'
					onClick={toggleDropdown}
				>
					{account.name}
					<IoMdArrowDropdown className='-mr-1 h-5 w-5' />
				</button>
			</div>
			{isDropdownOpen && (
				<div
					className='absolute left-0 z-10 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button-test'
					tabIndex='-1'
				>
					<div className='py-1' role='none'>
						{usuario.accounts.map((item) => (
							<a key={item.num} href='#' onClick={() => handleChangeAccount(item)} className={`${props.childrenColor} ${styles.textDropdown} px-4 py-1 `} role='menuitem' tabIndex='-1'>
								{item.name}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dropdown
