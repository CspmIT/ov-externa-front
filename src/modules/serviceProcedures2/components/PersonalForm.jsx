import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { validarFecha } from '../../../utils/dateFunction'
import InputAdornment from '@mui/material/InputAdornment'
import { dniArray, monthArray, impositiveSituationArray, daysArray, separateProcopDate } from '../../serviceProcedures/utils/data'
import { memo } from 'react'

const PersonalForm = memo(({ person, register, errors, setValues, watch }) => {
	setValues('fullName', person?.APELLIDOS)
	setValues('numDoc', person?.NUM_DNI)
	setValues('email', person?.EMAIL.trim())

	const { day, month, year } = separateProcopDate(person.FEC_NAC)
	// Valido la fecha de nacimiento
	const validateDate = () => {
		const anio = watch('año')
		const mes = watch('mes')
		const dia = watch('dia')
		return validarFecha(anio, mes, dia)
	}
	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='w-full flex items-center justify-center gap-3 max-sm:flex-col'>
				<TextField
					error={errors.fullName}
					label='Apellido y Nombre completo'
					defaultValue={person.APELLIDOS}
					{...register('fullName', {
						required: true,
					})}
					className='w-1/2 max-sm:w-full'
					helperText={errors.fullName && 'El campo es requerido'}
				/>
				<FormControl className='w-1/2 max-sm:w-full' error={errors.sexo}>
					<InputLabel id='sexo'>Sexo *</InputLabel>
					<Select labelId='sexo' label='Sexo *' id='sexo' defaultValue={person.SEXO || ''} {...register('sexo', { required: true })}>
						<MenuItem value='F'>Femenino</MenuItem>
						<MenuItem value='M'>Masculino</MenuItem>
					</Select>
					{/* Uso la validacion de react hook form */}
					{errors.typePerson && <FormHelperText>El campo es requerido </FormHelperText>}
				</FormControl>
			</div>
			<div className='w-full flex gap-3 max-sm:flex-col'>
				<div className='w-1/2 gap-3 flex max-sm:w-full'>
					<FormControl className='w-1/3' error={errors.tipDoc}>
						<InputLabel id='tipDoc'>Tipo de Documento</InputLabel>
						<Select labelId='tipDoc' label='Tipo de Documento' id='tipDoc' defaultValue={person.TIP_DNI} {...register('tipDoc', { required: true })}>
							{dniArray.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						error={errors.numDoc}
						label='Numero de Documento'
						{...register('numDoc', { required: true })}
						className='w-2/3'
						helperText={errors.numDoc && 'El campo es requerido'}
						defaultValue={person.NUM_DNI}
					/>
				</div>
				<div className='w-1/2 gap-3 flex max-sm:w-full'>
					<FormControl className='w-1/6' error={errors.dia}>
						<InputLabel id='dia'>Dia</InputLabel>
						<Select labelId='dia' label='dia' id='dia' defaultValue={day} {...register('dia', { required: true, validate: validateDate })}>
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
						<Select labelId='mes' label='mes' id='mes' defaultValue={month} {...register('mes', { required: true })}>
							{monthArray.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className='w-2/5'>
						<InputLabel id='año'>Año</InputLabel>
						<Select labelId='año' label='año' id='año' defaultValue={year} {...register('año', { required: true })}>
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
					<TextField className='w-full' {...register('email', { required: true })} error={errors.email} label='Email' helperText={errors.email && 'El campo es requerido'} />
				</div>
				<div className='w-1/2 flex gap-3'>
					<TextField
						error={errors.caracteristica}
						label='Caracteristica'
						{...register('caracteristica', { required: true })}
						className='w-1/4'
						helperText={errors.caracteristica && 'El campo es requerido'}
						InputProps={{
							maxLength: 4,
							startAdornment: <InputAdornment position='start'>+54 0</InputAdornment>,
						}}
					/>
					<TextField
						error={errors.telefono}
						label='Numero'
						{...register('telefono', { required: true })}
						className='w-3/4'
						helperText={errors.telefono && 'El campo es requerido'}
						InputProps={{
							startAdornment: <InputAdornment position='start'>15</InputAdornment>,
						}}
					/>
				</div>
			</div>
			<div className='w-full flex items-center justify-center gap-3'>
				<div className='gap-3 flex w-1/2'>
					<TextField
						label='Caracteristica'
						{...register('caracteristicaFijo')}
						className='w-1/4'
						InputProps={{
							startAdornment: <InputAdornment position='start'>+54 0</InputAdornment>,
						}}
					/>
					<TextField label='Numero' {...register('numeroFijo')} className='w-3/4' />
				</div>

				<FormControl className='w-1/2' error={errors.situacionImpositiva}>
					<InputLabel id='situacionImpositiva'>Situación Impositiva</InputLabel>
					<Select labelId='situacionImpositiva' label='Situación Impositiva' id='situacionImpositiva' {...register('situacionImpositiva', { required: true })}>
						{impositiveSituationArray.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					{errors.situacionImpositiva && <FormHelperText>El campo es requerido </FormHelperText>}
				</FormControl>
			</div>
		</div>
	)
})

PersonalForm.displayName = 'PersonalForm'

export default PersonalForm
