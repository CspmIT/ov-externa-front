import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import LeafletMap from './LeafletMap'
import { useRegForm } from '../providers/RegFormProvider'

const ConnectionAddress = ({ register, errors, markerPosition, setMarkerPosition, useData = true }) => {
	const [state] = useRegForm()
	return (
		<>
			<div className='w-full flex gap-3 items-start justify-center'>
				<div className='w-3/5 flex flex-col gap-3'>
					<h4>Domicilio de conexion</h4>
					<FormControl className='w-full' error={errors.provincia}>
						<InputLabel id='provincia'>Provincia *</InputLabel>
						{/* Si use data es true, pinto los datos del estado */}
						<Select labelId='provincia' label='Provincia' id='provincia' defaultValue={useData ? state?.connectionAddress?.provincia || '' : ''} {...register('provincia', { required: true })}>
							<MenuItem value='3'>Cordoba</MenuItem>
							<MenuItem value='4'>Santa Fe</MenuItem>
						</Select>
					</FormControl>
					<div className='w-full flex gap-3'>
						<FormControl className='w-1/2' error={errors.localidad}>
							<InputLabel id='localidad'>Localidad *</InputLabel>
							<Select labelId='localidad' label='Localidad' id='localidad' defaultValue={useData ? state?.connectionAddress?.localidad || '' : ''} {...register('localidad', { required: true })}>
								<MenuItem value='1'>Morteros Zona Urbana</MenuItem>
								<MenuItem value='2'>Morteros Zona Rural</MenuItem>
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
						<FormControl className='w-1/4' error={errors.calle}>
							<InputLabel id='calle'>Calle *</InputLabel>
							<Select labelId='calle' label='Calle' id='calle' defaultValue={useData ? state?.connectionAddress?.calle || '' : ''} {...register('calle', { required: true })}>
								<MenuItem value='1'>Calle 1</MenuItem>
								<MenuItem value='2'>Calle 2</MenuItem>
								<MenuItem value='3'>Calle 3</MenuItem>
							</Select>
						</FormControl>
						<FormControl className='w-1/4'>
							<TextField
								defaultValue={useData ? state?.connectionAddress?.numberAddress || '' : ''}
								label='Numero *'
								error={errors.numberAddress}
								{...register('numberAddress', { required: true })}
							></TextField>
						</FormControl>
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
		</>
	)
}

export default ConnectionAddress
