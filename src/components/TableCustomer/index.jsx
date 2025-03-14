import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '../Button'
import { FaTrashCan, FaArrowUp } from 'react-icons/fa6'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/request'
import Swal from 'sweetalert2'
import { storage } from '../../storage/storage'
import { TextField } from '@mui/material'
import { MdCancel } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'

export default function TableCustomer() {
	const { usuario, setUsuario, account, setAccount } = useContext(UserContext)
	const [openEdit, setOpenEdit] = useState('none')
	const [value, setValue] = useState()
	const handleCustomer = (item) => {
		if (item.name === usuario.name_customer) {
			Swal.fire({
				title: 'Atención',
				text: 'No puedes modificar el usuario que estas usando',
				icon: 'warning',
			})
			return false
		}
		item.primary ? setOpenEdit('table-row') : deleteCustomer(item.id_relation)
	}
	const handleCancelEdit = () => {
		setOpenEdit('none')
		setValue('')
	}

	const handleChangeValue = (e) => {
		setValue(e.target.value)
	}
	const handleEditCustomer = async () => {
		try {
			const array = { nro_customer: value }
			const user = await request(import.meta.env.VITE_APP_API_URL + '/searchOther', 'post', array)
			const swal = await Swal.fire({
				title: '¿Deseas agregar a este socio como principal?',
				text: user.data,
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Agregar',
				cancelButtonText: 'Cancelar',
			})

			if (swal.isConfirmed) {
				const data = { name_customer: user.data, number_customer: value }
				const operation = await request(import.meta.env.VITE_APP_API_URL + '/updateCustomer', 'patch', data)
				if (operation.message) {
					Swal.fire({
						title: '¡Perfecto!',
						text: 'El socio principal ha sido cambiado con éxito',
						icon: 'success',
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							const updatedUsuario = { ...usuario }
							for (let i = 0; i < usuario.accounts.length; i++) {
								if (usuario.accounts[i].main) {
									updatedUsuario.accounts[i].name = user.data
									updatedUsuario.accounts[i].num = value
									break
								}
							}
							setUsuario(updatedUsuario)
							const updatedStorage = storage.get('usuario')
							updatedStorage.accounts = [updatedUsuario.accounts]
							storage.set('usuario', updatedStorage)
							handleCancelEdit()
						}
					})
				} else {
					throw new Error('error')
				}
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'El número ingresado es inválido',
				icon: 'error',
			})
		}
	}
	const handlePrimaryAccount = async (row) => {
		try {
			const swal = await Swal.fire({
				title: 'Atención',
				text: '¿Deseas convertir en cuenta principal al socio seleccionado?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Sí',
				cancelButtonText: 'Cancelar',
			})

			if (swal.isConfirmed) {
				const operation = await request(`${import.meta.env.VITE_APP_API_URL}/chagePrimayMember?id_relation=${row.id_relation}`, 'patch')
				if (operation.status === 200) {
					Swal.fire({
						title: '¡Perfecto!',
						text: 'El socio principal ha sido cambiado con éxito',
						icon: 'success',
						allowOutsideClick: false,
					}).then(async (result) => {
						if (result.isConfirmed) {
							const user = { ...usuario }
							const updatedUsuario = await user.accounts.map((item) => {
								item.primary = parseInt(item.id_relation) === parseInt(row.id_relation)
								return item
							})
							user.accounts = updatedUsuario
							user.accounts.sort((a, b) => {
								if (a.primary && !b.primary) {
									return -1
								}
								if (b.primary && !a.primary) {
									return 1
								}
								return 0
							})
							setUsuario(user)
							const updatedStorage = storage.get('usuario')
							updatedStorage.accounts = user.accounts
							storage.set('usuario', updatedStorage)
							handleCancelEdit()
						}
					})
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	const deleteCustomer = async (id) => {
		try {
			const swal = await Swal.fire({
				title: 'Atención',
				text: '¿Deseas eliminar al socio seleccionado?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			})

			if (swal.isConfirmed) {
				const operation = await request(`${import.meta.env.VITE_APP_API_URL}/deleteOther?id_relation=${id}`, 'delete')
				if (operation.status === 200) {
					Swal.fire({
						title: '¡Perfecto!',
						text: 'El socio ha sido eliminado con éxito',
						icon: 'success',
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							const updatedUsuario = { ...usuario }
							updatedUsuario.accounts = updatedUsuario.accounts.filter((obj) => obj.id_relation !== id)
							setUsuario(updatedUsuario)
							if (id === account.id_relation) {
								setAccount(updatedUsuario.accounts.filter((obj) => obj.primary)[0])
							}
							const updatedStorage = storage.get('usuario')
							updatedStorage.accounts = [updatedUsuario.accounts]
							storage.set('usuario', updatedStorage)
						}
					})
				} else {
					throw new Error('error')
				}
			}
		} catch {
			console.log('error')
		}
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table' className='dark:bg-zinc-800'>
				<TableHead className='bg-amber-300'>
					<TableRow>
						<TableCell>
							<b>Socio</b>
						</TableCell>
						<TableCell>
							<b>Nombre</b>
						</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow key='edit-row' sx={{ display: openEdit }}>
						<TableCell colSpan={2}>
							<div className='flex flex-row justify-center'>
								<TextField onChange={handleChangeValue} value={value} placeholder='Ingrese un número de socio' variant='outlined' />
							</div>
						</TableCell>
						<TableCell align='right'>
							<div className='flex flex-row justify-evenly'>
								<Button onclick={handleCancelEdit} props={{ class: `bg-amber-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}>
									<MdCancel />
								</Button>
								<Button onclick={() => handleEditCustomer()} props={{ class: `bg-green-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}>
									<FaCheckCircle />
								</Button>
							</div>
						</TableCell>
					</TableRow>
					{usuario.accounts.sort((a, b) => b.primary - a.primary).map((row) => (
						<TableRow key={row.num} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='dark:border-gray-700'>
							<TableCell component='th' scope='row' align='left'>
								<span className='dark:text-white'>{row.num}</span>
							</TableCell>
							<TableCell align='left'>
								<span className='dark:text-white'>{row.name}</span>
							</TableCell>
							<TableCell align='right'>
								{row.primary ? null : (
									<>
										<Button
											onclick={() => handleCustomer(row)}
											props={{ class: `${row.primary ? 'bg-amber-500' : 'bg-red-500'} m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}
										>
											<FaTrashCan />
										</Button>
										<Button onclick={() => handlePrimaryAccount(row)} props={{ class: `ml-2 bg-amber-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}>
											<FaArrowUp />
										</Button>
									</>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
