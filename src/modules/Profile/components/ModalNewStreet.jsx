import { Close } from '@mui/icons-material'
import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { listStreetXIdCity } from '../../../views/LevelUp/utils/Address'
import Swal from 'sweetalert2'
import { request } from '../../../utils/request'

function ModalNewStreet({ streetsAdd, openModalStreet, handleModalStreet, userData, setStreets, editWatch }) {
	const {
		handleSubmit: HandleSubmitModal,
		formState: { errors: ErrorsModal },
		reset: resetModal,
		control,
	} = useForm({
		defaultValues: {
			StreetAll: null,
		},
	})

	const onSubmitModal = (data) => {
		Swal.fire({
			title: 'Atención!',
			text: `¿Deseas agregar la calle ${data.StreetAll.name}?`,
			icon: 'question',
			allowOutsideClick: false,
			showCancelButton: true,
			customClass: {
				container: ' z-[9999] ',
			},
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const datos = { name: data.StreetAll.name, id_procoop: data.StreetAll.id, id_city: parseInt(editWatch) }
				const url = `${import.meta.env.VITE_APP_API_URL}/addStreetProcoop`
				const res = await request(url, 'POST', datos)
				if (res.status === 200) {
					Swal.fire({
						icon: 'success',
						title: '¡Calle agregada!',
						customClass: {
							container: ' z-[9999] ',
						},
						text: 'La calle ha sido agregada correctamente',
					})
					resetModal()
					handleModalStreet()
					console.log(userData)
					listStreetXIdCity(userData.city).then((streets) => {
						setStreets(streets)
					})
				}
			}
		})
	}
	const getOptionKey = (option) => {
		return `${option.name}-${option.id}`
	}

	return (
		<Modal className='flex justify-center items-center' open={openModalStreet} onClose={handleModalStreet()} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
			<Box className={'w-full flex justify-center items-center'}>
				<form className='flex flex-col w-full items-center mt-4' onSubmit={HandleSubmitModal(onSubmitModal)} id='formModalStreet'>
					<div className=' bg-white w-1/2 p-5 flex-col justify-center items-center'>
						<div className='relative  p-5 '>
							<h3 className='text-gray-900 m-0 font-bold text-center font-sans' id='exampleModalLabel'>
								Calles
							</h3>
							<div className='absolute  right-5 top-5'>
								<Close onClick={handleModalStreet()} className='text-gray-500 hover:text-gray-800 hover:cursor-pointer' />
							</div>
						</div>

						<Controller
							name='StreetAll'
							control={control}
							rules={{ required: 'This field is required' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									options={streetsAdd}
									getOptionLabel={(option) => option.name}
									isOptionEqualToValue={(option, value) => option.id === value.id} // Comparación personalizada
									value={field.value || null}
									onChange={(event, value) => field.onChange(value || null)}
									renderInput={(params) => (
										<TextField
											{...params}
											error={!!ErrorsModal.StreetAll}
											helperText={ErrorsModal.StreetAll ? ErrorsModal.StreetAll.message : null}
											key={getOptionKey(params.inputProps)}
											label='Calles'
											variant='outlined'
										/>
									)}
									renderOption={(props, option) => (
										<li {...props} key={getOptionKey(option)}>
											{option.name}
										</li>
									)}
								/>
							)}
						/>
						<div className='w-100 mt-5 flex justify-center items-center'>
							<Button variant='contained' type='submit' color='primary'>
								Guardar
							</Button>
						</div>
					</div>
				</form>
			</Box>
		</Modal>
	)
}

export default ModalNewStreet
