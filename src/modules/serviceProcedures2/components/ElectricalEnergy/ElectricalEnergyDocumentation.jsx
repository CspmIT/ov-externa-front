import { Button, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TaskIcon from '@mui/icons-material/Task'
import { Camera, CloudUpload } from '@mui/icons-material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useRegForm } from '../../providers/RegFormProvider'

const ElectricalEnergyDocumentation = ({ errors, register }) => {
	const [state] = useRegForm()
	// Archivos
	const [municipalFile, setMunicipalFile] = useState(null)
	const [leyFile, setLeyFile] = useState(null)
	const [titleFile, setTitleFile] = useState(null)
	const [constanciaAfip, setConstanciaAfip] = useState(null)
	const [garantiaComercial, setGarantiaComercial] = useState(null)
	const [permisoConexion, setPermisoConexion] = useState(null)
	const [planchetaCatastral, setPlanchetaCatastral] = useState(null)
	const [typeGarante, setTypeGarante] = useState(null)

	useEffect(() => {
		if (state?.electricFiles?.impuestoMuni?.[0]?.name !== undefined) {
			setMunicipalFile(state?.electricFiles?.impuestoMuni[0].name)
		}
		if (state?.electricFiles?.certificadoLey?.[0]?.name !== undefined) {
			setLeyFile(state?.electricFiles?.certificadoLey[0].name)
		}
		if (state?.electricFiles?.tituloProp?.[0]?.name !== undefined) {
			setTitleFile(state?.electricFiles?.tituloProp[0].name)
		}
		if (state?.electricFiles?.constanciaAfip?.[0]?.name !== undefined) {
			setConstanciaAfip(state?.electricFiles?.constanciaAfip[0].name)
		}
		if (state?.electricFiles?.garantiaComercial?.[0]?.name !== undefined) {
			setGarantiaComercial(state?.electricFiles?.garantiaComercial[0].name)
		}
		if (state?.electricFiles?.permisoConexion?.[0]?.name !== undefined) {
			setPermisoConexion(state?.electricFiles?.permisoConexion[0].name)
		}
		if (state?.electricFiles?.planchetaCatastral?.[0]?.name !== undefined) {
			setPlanchetaCatastral(state?.electricFiles?.planchetaCatastral[0].name)
		}
	}, [])

	const handleGarante = (e) => {
		setTypeGarante(e.target.value)
	}

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		if (event.target.name === 'impuestoMuni') setMunicipalFile(file.name)
		if (event.target.name === 'certificadoLey') setLeyFile(file.name)
		if (event.target.name === 'tituloProp') setTitleFile(file.name)
		if (event.target.name === 'constanciaAfip') setConstanciaAfip(file.name)
		if (event.target.name === 'garantiaComercial') setGarantiaComercial(file.name)
		if (event.target.name === 'permisoConexion') setPermisoConexion(file.name)
		if (event.target.name === 'planchetaCatastral') setPlanchetaCatastral(file.name)
	}
	// TODO: Preguntar si el garante es socio de la coop, sino se piden 3 recibos de sueldo (archivos)
	// TODO: Si selecciona socio debe buscar por dni y traer los datos
	return (
		<div className='flex flex-col w-full gap-3 mt-4 items-center justify-center'>
			<div className='w-2/3 gap-3 flex items-center '>
				<FormLabel className='w-4/12' error={errors.impuestoMuni}>
					Impuesto Municipal
				</FormLabel>
				<Button component='label' className='w-2/12' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
					Subir archivo
					<input type='file' hidden {...register('impuestoMuni', { required: !municipalFile, onChange: (e) => handleFileChange(e) })} />
				</Button>
				<Button component='label' className='w-2/12' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
					Tomar foto
				</Button>
				{municipalFile && (
					<div className='w-4/12'>
						<TaskIcon /> {municipalFile}
					</div>
				)}
			</div>
			<div className='w-2/3 gap-3 flex items-center'>
				<FormLabel error={errors.certificadoLey} className='w-4/12'>
					Certificado Ley Nº 10.281
					<Tooltip className='w-auto' placement='right' title='(Certificado de seguridad electrica emitido por electricista matriculado)'>
						<IconButton>
							<HelpOutlineIcon />
						</IconButton>
					</Tooltip>
				</FormLabel>

				<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
					Subir archivo
					<input type='file' hidden {...register('certificadoLey', { required: !leyFile, onChange: (e) => handleFileChange(e) })} />
				</Button>
				<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
					Tomar foto
				</Button>
				{leyFile && (
					<div className='w-4/12'>
						<TaskIcon /> {leyFile}
					</div>
				)}
			</div>
			{state?.energiaElectrica?.typeActivity === '3' && (
				<>
					<div className='w-2/3 gap-3 flex items-center'>
						<FormLabel className='w-4/12' error={errors.tituloProp}>
							Permiso de conexión municipal
						</FormLabel>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
							Subir archivo
							<input type='file' hidden {...register('permisoConexion', { required: !permisoConexion, onChange: (e) => handleFileChange(e) })} />
						</Button>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
							Tomar foto
						</Button>
						{permisoConexion && (
							<div className='w-4/12'>
								<TaskIcon /> {permisoConexion}
							</div>
						)}
					</div>
					<div className='w-2/3 gap-3 flex items-center'>
						<FormLabel className='w-4/12' error={errors.tituloProp}>
							Plancheta Catastral
						</FormLabel>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
							Subir archivo
							<input type='file' hidden {...register('planchetaCatastral', { required: !planchetaCatastral, onChange: (e) => handleFileChange(e) })} />
						</Button>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
							Tomar foto
						</Button>
						{planchetaCatastral && (
							<div className='w-4/12'>
								<TaskIcon /> {planchetaCatastral}
							</div>
						)}
					</div>
				</>
			)}
			{state?.energiaElectrica?.typeActivity !== '3' && (
				<div className='w-2/3 gap-3 flex items-center'>
					<FormLabel className='w-4/12' error={errors.tituloProp}>
						Titulo de propiedad o contrato de locación
					</FormLabel>
					<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
						Subir archivo
						<input type='file' hidden {...register('tituloProp', { required: !titleFile, onChange: (e) => handleFileChange(e) })} />
					</Button>
					<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
						Tomar foto
					</Button>
					{titleFile && (
						<div className='w-4/12'>
							<TaskIcon /> {titleFile}
						</div>
					)}
				</div>
			)}
			{state?.energiaElectrica?.typeActivity === '2' && (
				<>
					<div className='w-2/3 gap-3 flex items-center'>
						<FormLabel className='w-4/12'>Constancia de AFIP</FormLabel>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
							Subir archivo
							<input type='file' hidden {...register('constanciaAfip', { required: !constanciaAfip, onChange: (e) => handleFileChange(e) })} />
						</Button>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
							Tomar foto
						</Button>
						{constanciaAfip && (
							<div className='w-4/12'>
								<TaskIcon /> {constanciaAfip}
							</div>
						)}
					</div>
					<div className='w-2/3 gap-3 flex items-center'>
						<FormLabel className='w-4/12'>Garantia Comercial</FormLabel>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
							Subir archivo
							<input type='file' hidden {...register('garantiaComercial', { required: !garantiaComercial, onChange: (e) => handleFileChange(e) })} />
						</Button>
						<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
							Tomar foto
						</Button>
						{garantiaComercial && (
							<div className='w-4/12'>
								<TaskIcon /> {garantiaComercial}
							</div>
						)}
					</div>
				</>
			)}

			{state?.energiaElectrica?.typeActivity !== '2' && (
				<>
					<div className='w-2/3 gap-3 flex items-center'>
						<FormLabel error={errors.dniGarante} className='w-4/12'>
							Garante con servicios activos en la coop y que no tenga deuda o tres ultimos recibos de sueldo (del garante)
						</FormLabel>
						<RadioGroup row {...register('typeGarante', { required: true, onChange: (e) => handleGarante(e) })}>
							<FormControlLabel value={1} control={<Radio />} label='Socio' />
							<FormControlLabel value={2} control={<Radio />} label='No socio' />
						</RadioGroup>
					</div>
					{typeGarante === '1' && (
						<div className='w-2/3 gap-3 flex items-center'>
							<FormLabel className='w-4/12'>Documento del Garante</FormLabel>
							<TextField className='w-4/12' label='DNI del garante' {...register('dniGarante', { required: true })} />
						</div>
					)}
					{typeGarante === '2' && (
						<div className='w-2/3 gap-3 flex items-center'>
							<FormLabel className='w-4/12'>Ultimos tres recibos de sueldo (Permite cargar multiples archivos)</FormLabel>
							<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUpload />}>
								Subir archivo
								<input type='file' hidden {...register('paycheck', { required: !constanciaAfip, onChange: (e) => handleFileChange(e) })} />
							</Button>
							<Button className='w-2/12' component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<Camera />}>
								Tomar foto
							</Button>
							{constanciaAfip && (
								<div className='w-4/12'>
									<TaskIcon /> {constanciaAfip}
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default ElectricalEnergyDocumentation
