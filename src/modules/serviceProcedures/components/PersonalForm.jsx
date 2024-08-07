import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { validarFecha } from '../../../utils/dateFunction'
import InputAdornment from '@mui/material/InputAdornment'
import { dniArray, monthArray, daysArray, separateProcopDate } from '../utils/data'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useEffect, useState } from 'react'

const PersonalForm = ({ person, register, errors, watch }) => {
	const { day, month, year } = separateProcopDate(person?.Person_physical?.born_date || person.FEC_NAC)
	// Valido la fecha de nacimiento
	const validateDate = () => {
		const anio = watch('año')
		const mes = watch('mes')
		const dia = watch('dia')
		return validarFecha(anio, mes, dia)
	}

	const getSituationTax = async () => {
		const baseUrl = import.meta.env.VITE_APP_API_URL
		const url = `${baseUrl}/getSituationsIva`
		try {
			const { data } = await axios({
				method: 'GET',
				url,
				withCredentials: true,
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}

	const [situationsTax, setSituationsTax] = useState([])
	useEffect(() => {
		const fetchSituationTax = async () => {
			const data = await getSituationTax()
			setSituationsTax(data)
		}
		fetchSituationTax()
	}, [])
	// const { characteristic, number } = separateCellPhone(person?.cell_phone)
	// const { characteristic: characteristicFijo, number: numberFijo } = separateCellPhone(person?.fixed_phone)
	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='w-full flex gap-3 max-sm:flex-col'>
				<div className='w-1/2 gap-3 flex max-sm:w-full max-sm:flex-col'>
					<TextField
						error={errors.name}
						label='Nombre completo'
						defaultValue={person?.Person_physical?.name || person.APELLIDOS || person.name}
						{...register('name', {
							required: true,
						})}
						className='w-1/2 max-sm:w-full'
						helperText={errors.name && 'El campo es requerido'}
					/>
					<TextField
						error={errors.last_name}
						label='Apellido'
						defaultValue={person?.Person_physical?.last_name || person.last_name}
						{...register('last_name', {
							required: true,
						})}
						className='w-1/2 max-sm:w-full'
						helperText={errors.last_name && 'El campo es requerido'}
					/>
				</div>

				<div className='w-1/2 gap-3 flex max-sm:w-full'>
					<FormControl className='w-full max-sm:w-full' error={errors.SEXO}>
						<InputLabel id='sexo'>Sexo *</InputLabel>
						<Select labelId='sexo' label='Sexo *' id='sexo' defaultValue={person?.Person_physical?.id_type_sex || person.SEXO} {...register('SEXO', { required: true })}>
							<MenuItem value='1'>Femenino</MenuItem>
							<MenuItem value='2'>Masculino</MenuItem>
						</Select>
						{/* Uso la validacion de react hook form */}
						{errors.SEXO && <FormHelperText>El campo es requerido </FormHelperText>}
					</FormControl>
				</div>
			</div>
			<div className='w-full flex gap-3 max-sm:flex-col'>
				<div className='w-1/2 gap-3 flex max-sm:w-full max-sm:flex-col'>
					<FormControl className='w-1/3 max-sm:w-full ' error={errors.TIP_DNI}>
						<InputLabel id='TIP_DNI'>Tipo de Documento</InputLabel>
						<Select labelId='TIP_DNI' label='Tipo de Documento' id='TIP_DNI' defaultValue={person.type_document || person?.TIP_DNI} {...register('TIP_DNI', { required: true })}>
							{dniArray.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						error={errors.NUM_DNI}
						label='Numero de Documento'
						{...register('NUM_DNI', {
							required: { value: true, message: 'El campo es requerido' },
							minLength: { value: 7, message: 'El numero debe tener al menos 7 digitos' },
							maxLength: { value: 8, message: 'El numero debe tener maximo 8 digitos' },
							pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' }, // Esta línea valida que solo se ingresen números
						})}
						className='w-2/3 max-sm:w-full '
						helperText={errors.NUM_DNI && errors.NUM_DNI.message}
						defaultValue={person?.NUM_DNI || person.number_document}
					/>
				</div>
				<div className='w-1/2 gap-3 flex max-sm:w-full'>
					<FormControl className='w-1/6' error={errors.dia}>
						<InputLabel id='dia'>Dia</InputLabel>
						<Select labelId='dia' label='dia' id='dia' defaultValue={day || person?.dia} {...register('dia', { required: true, validate: validateDate })}>
							{daysArray.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
						{errors.dia && <FormHelperText> {errors.dia.message} </FormHelperText>}
					</FormControl>
					<FormControl className='w-2/5'>
						<InputLabel id='mes'>Mes</InputLabel>
						<Select labelId='mes' label='mes' id='mes' defaultValue={month || person?.mes} {...register('mes', { required: true })}>
							{monthArray.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className='w-2/5'>
						<InputLabel id='año'>Año</InputLabel>
						<Select labelId='año' label='año' id='año' defaultValue={year || person?.año} {...register('año', { required: true })}>
							{Array.from({ length: 120 }, (_, i) => i + new Date().getFullYear() - 120).map((item) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
			<div className='w-full flex items-center justify-center gap-3'>
				<div className='w-1/2'>
					<TextField
						className='w-full'
						defaultValue={person.EMAIL || person.email}
						{...register('EMAIL', { required: true })}
						error={errors.EMAIL}
						label='Email'
						helperText={errors.EMAIL && 'El campo es requerido'}
					/>
				</div>
				<div className='w-1/2 flex gap-3'>
					<TextField
						error={errors.characteristic}
						label='Caracteristica celular'
						{...register('characteristic', { required: true })}
						className='w-1/4'
						helperText={errors.characteristic && 'El campo es requerido'}
						defaultValue={''}
						InputProps={{
							maxLength: 4,
							startAdornment: <InputAdornment position='start'>+549 0</InputAdornment>,
						}}
					/>
					<TextField
						error={errors.number}
						label='Numero celular'
						{...register('number', { required: true, minlength: 6, maxLength: 8 })}
						className='w-3/4'
						defaultValue={''}
						helperText={errors.number && 'El campo es requerido'}
						InputProps={{
							startAdornment: <InputAdornment position='start'>15</InputAdornment>,
						}}
					/>
				</div>
			</div>
			<div className='w-full flex items-center justify-center gap-3'>
				<div className='gap-3 flex w-1/2'>
					<TextField
						label='Caracteristica fijo'
						{...register('caracteristicaFijo')}
						className='w-1/4'
						defaultValue={''}
						InputProps={{
							startAdornment: <InputAdornment position='start'>+549 0</InputAdornment>,
						}}
					/>
					<TextField label='Numero fijo' defaultValue={''} {...register('numeroFijo')} className='w-3/4' />
				</div>

				<FormControl className='w-1/2' error={errors.COD_SIT}>
					<InputLabel id='situacionImpositiva'>Situación Impositiva</InputLabel>
					<Select labelId='situacionImpositiva' label='Situación Impositiva' id='situacionImpositiva' {...register('COD_SIT', { required: true })} defaultValue={person?.situation_tax || person?.COD_SIT || ''}>
						{Array.isArray(situationsTax) &&
							situationsTax.map((item, index) => (
								<MenuItem key={index} value={item.cod_sit}>
									{item.des_sit}
								</MenuItem>
							))}
					</Select>
					{errors.COD_SIT && <FormHelperText>Debe seleccionar una Situacion Impositiva</FormHelperText>}
				</FormControl>
			</div>
		</div>
	)
}

PersonalForm.displayName = 'PersonalForm'

export default PersonalForm
