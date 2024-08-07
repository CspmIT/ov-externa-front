import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import LeafletMap from './LeafletMap'
import { useRegForm } from '../providers/RegFormProvider'
import { Add } from '@mui/icons-material'
import { request } from '../../../utils/request'
import { useEffect, useState } from 'react'
import ModalNewStreet from '../../Profile/components/ModalNewStreet'
import { getAllStreet } from '../../../views/LevelUp/utils/Address'

const ConnectionAddress = ({ register, errors, markerPosition, setMarkerPosition, useData = true }) => {
	const [state] = useRegForm()

	const [streets, setStreets] = useState([])
	const [streetsAdd, setStreetsAdd] = useState([])
	const [city, setCity] = useState(0)

	const [openModalStreet, setOpenModalStreet] = useState(false)
	const handleModalStreet = async () => {
		await getAllStreet().then((streets) => {
			setStreetsAdd(streets)
		})
		setOpenModalStreet(!openModalStreet)
	}

	useEffect(() => {
		if (useData) {
			handleCityChange(state?.connectionAddress?.city)
		}
	}, [])
	useEffect(() => {}, [streets])
	const handleCityChange = async (id) => {
		try {
			// Capturo el valor de la ciudad seleccionada
			const idCity = id
			setCity(idCity)
			const url = `${import.meta.env.VITE_APP_API_URL}/listStreet/?id=${idCity}`
			const res = await request(url, 'GET')
			const Calles = res.data
				.map((item) => {
					return { id: item.id, name: item.name }
				})
				.sort((a, b) => a.name.localeCompare(b.name))
			setStreets(Calles)
		} catch (error) {
			console.error({ message: error.message })
		}
	}

	return (
		<>
			<div className='w-full flex gap-3 items-start justify-center'>
				<div className='w-3/5 flex flex-col gap-3'>
					<h4>Domicilio de conexion</h4>
					<FormControl className='w-full' error={errors.provincia}>
						<InputLabel id='provincia'>Provincia *</InputLabel>
						{/* Si use data es true, pinto los datos del estado */}
						<Select labelId='provincia' label='Provincia' id='provincia' defaultValue={'3'} {...register('provincia', { required: true })}>
							<MenuItem value='3'>Cordoba</MenuItem>
						</Select>
					</FormControl>
					<div className='w-full flex gap-3'>
						<FormControl className='w-1/2' error={errors.city}>
							<InputLabel id='city'>Localidad *</InputLabel>
							<Select
								labelId='city'
								label='Localidad'
								id='city'
								defaultValue={useData ? state?.connectionAddress?.city || '' : ''}
								{...register('city', { required: true, onChange: (e) => handleCityChange(e.target.value) })}
							>
								<MenuItem value='1'>Morteros</MenuItem>
								<MenuItem value='3'>Colonia 10 de Julio</MenuItem>
								<MenuItem value='4'>Colonia 2 Hermanos</MenuItem>
								<MenuItem value='5'>Colonia Mauniers</MenuItem>
								<MenuItem value='6'>Colonia Isleta</MenuItem>
								<MenuItem value='7'>Colonia Miramar</MenuItem>
								<MenuItem value='8'>Colonia Milessi</MenuItem>
								<MenuItem value='9'>Colonia Bairo</MenuItem>
								<MenuItem value='10'>Colonia San Pedro</MenuItem>
							</Select>
						</FormControl>
						<TextField
							error={errors.street}
							select={true}
							label='Calle *'
							id={'calle'}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Add className='cursor-pointer hover:ring-1 rounded-xl' onClick={() => setOpenModalStreet(true)} />
									</InputAdornment>
								),
							}}
							{...register('street', { required: 'El Campo es requerido' })}
							className='w-2/3'
							helperText={errors.street && errors.street.message}
							defaultValue={useData ? state?.connectionAddress?.street || '' : ''}
						>
							{streets.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</TextField>
						<TextField
							error={errors.numberAddress}
							label='Nro *'
							id={'numberAddress'}
							{...register('numberAddress', { required: 'El Campo es requerido' })}
							className='w-1/3'
							helperText={errors.numberAddress && errors.numberAddress.message}
							defaultValue={useData ? state?.connectionAddress?.numberAddress || '' : ''}
						/>
					</div>
					<h5>Dato catastral</h5>
					<div className='w-full flex gap-3'>
						<TextField defaultValue={useData ? state?.connectionAddress?.circ || '' : ''} error={errors.circ} {...register('circ', { required: true })} className='w-[16.6%]' label='Circ. *'></TextField>
						<TextField defaultValue={useData ? state?.connectionAddress?.sec || '' : ''} {...register('sec', { required: true })} error={errors.sec} className='w-[16.6%]' label='Sec. *'></TextField>
						<TextField defaultValue={useData ? state?.connectionAddress?.man || '' : ''} {...register('man', { required: true })} error={errors.man} className='w-[16.6%]' label='Man. *'></TextField>
						<TextField defaultValue={useData ? state?.connectionAddress?.par || '' : ''} {...register('par', { required: true })} error={errors.par} className='w-[16.6%]' label='Par. *'></TextField>
						<TextField defaultValue={useData ? state?.connectionAddress?.ph || '' : ''} {...register('ph', { required: true })} error={errors.ph} className='w-[16.6%]' label='PH *'></TextField>
						<TextField defaultValue={useData ? state?.connectionAddress?.lote || '' : ''} {...register('lote', { required: true })} error={errors.lote} className='w-[16.6%]' label='Lote *'></TextField>
					</div>
					<div className='w-full flex'>
						<a href='https://mapascordoba.gob.ar/viewer/mapa/3' target='_blank' rel='noopener noreferrer'>
							<Button role='link' variant='contained' color='info'>
								Si no lo conoces el dato catastral verificar en el cedulon de acueducto o en el impuesto municipal o podes averiguarlo
							</Button>
						</a>
					</div>
				</div>
				<div className='w-2/5 h-[35vh] !max-w-[93vw] '>
					<h5>Puede arrastrar el marcador para indicar el domicilio en el mapa</h5>
					<LeafletMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
				</div>
			</div>
			<ModalNewStreet streetsAdd={streetsAdd} openModalStreet={openModalStreet} handleModalStreet={() => handleModalStreet} userData={state?.connectionAddress} setStreets={setStreets} editWatch={city} />
		</>
	)
}

export default ConnectionAddress
