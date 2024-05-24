import React, { useContext, useState } from 'react'
import CardCustom from '../CardCustom'
import { Close } from '@mui/icons-material'
import { Box, Tab, Tabs, TextField } from '@mui/material'
import { CustomTabPanel, a11yProps } from '../PanelTab'
import Button from '../Button'
import { storage } from '../../storage/storage'
import TableCustomer from '../TableCustomer'
import { request } from '../../utils/request'
import Swal from 'sweetalert2'
import { UserContext } from '../../contexts/UserContext'

const ModalSocio = ({ handleCloseModal }) => {
	const { usuario, setUsuario } = useContext(UserContext)
	const [value, setValue] = useState(0)
	const [number, setNumber] = useState('')
	const handleChange = (event, newValue) => {
		setValue(newValue)
		setNumber('')
	}
	const handleChangeCustomer = (e) => {
		setNumber(e.target.value)
	}
	const handleAddCustomer = async () => {
		try {
			const array = { customer: number }
			const user = await request(import.meta.env.VITE_APP_API_URL + '/getCustomer', 'post', array)
			const swal = await Swal.fire({
				title: '¿Deseas agregar a este socio?',
				text: user.data,
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Agregar',
				cancelButtonText: 'Cancelar',
			})

			if (swal.isConfirmed) {
				const operation = await request(import.meta.env.VITE_APP_API_URL + '/createOther', 'post', array)
				if (operation.status === 200) {
					Swal.fire({
						title: '¡Perfecto!',
						text: 'El socio ha sido agregado con éxito',
						icon: 'success',
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							const updatedUsuario = { ...usuario }
							updatedUsuario.accounts = [...updatedUsuario.accounts, operation.data]
							setUsuario(updatedUsuario)
							const updatedStorage = storage.get('usuario')
							updatedStorage.accounts = [updatedUsuario.accounts]
							storage.set('usuario', updatedStorage)
							handleChange(false, 0)
						}
					})
				} else {
					throw new Error()
				}
			}
		} catch (error) {
			const errorText = JSON.parse(error.request.response).message || error
			Swal.fire({
				title: 'Error',
				text: errorText,
				icon: 'error',
			})
		}
	}
	return (
		<CardCustom className={' w-1/3 max-sm:w-full rounded-xl bg-white shadow-lg'}>
			<div className='rounded-xl '>
				<div className='relative rounded-t-xl bg-slate-200 p-5 '>
					<h3 className='text-gray-900 m-0 font-bold text-center font-sans' id='exampleModalLabel'>
						Administrar socios
					</h3>
					<div className='absolute  right-5 top-5'>
						<Close onClick={handleCloseModal} className='text-gray-500 hover:text-gray-800 hover:cursor-pointer' />
					</div>
				</div>
				<div className='p-5 '>
					<p className='dark:text-white'>En esta tabla podrás ver todos los Socios que agregaste para administrar la Oficina Virtual.</p>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
								<Tab label='Ver socios' {...a11yProps(0)} />
								<Tab label='Agregar socio' {...a11yProps(1)} />
							</Tabs>
						</Box>
						<Box sx={{ padding: 2, border: 2, borderTop: 0, borderRadius: '0px 0px 10px 10px', borderColor: 'divider' }}>
							<CustomTabPanel className={'flex flex-col'} value={value} index={0}>
								<TableCustomer />
							</CustomTabPanel>
							<CustomTabPanel className={'flex flex-col'} value={value} index={1}>
								<div className='w-full flex flex-row justify-evenly items-center'>
									<TextField type='tel' value={number} onChange={handleChangeCustomer} className='w-3/4' label='Ingrese un número de socio' variant='outlined' />
									<Button onclick={() => handleAddCustomer()} props={{ class: 'bg-green-500' }}>
										Agregar
									</Button>
								</div>
							</CustomTabPanel>
						</Box>
					</Box>
				</div>
			</div>
		</CardCustom>
	)
}

export default ModalSocio
