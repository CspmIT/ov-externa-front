import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { separateCellPhone } from '../../../utils/cellphoneFunctions'
import { validarFecha } from '../../../utils/dateFunction'
import InputAdornment from '@mui/material/InputAdornment'
import { dniArray, monthArray, impositiveSituationArray, daysArray, separateProcopDate } from '../../serviceProcedures/utils/data'

const PersonalForm = ({ person, register, errors, watch }) => {
	const { day, month, year } = separateProcopDate(person?.Person_physical?.born_date || person.FEC_NAC)
	// Valido la fecha de nacimiento
	const validateDate = () => {
		const anio = watch('año')
		const mes = watch('mes')
		const dia = watch('dia')
		return validarFecha(anio, mes, dia)
	}
	const { characteristic, number } = separateCellPhone(person?.cell_phone)
	const { characteristic: characteristicFijo, number: numberFijo } = separateCellPhone(person?.fixed_phone)
	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='w-full flex gap-3 max-sm:flex-col'>
				<div className='w-1/2 gap-3 flex max-sm:w-full'>
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
						defaultValue={person?.Person_physical?.last_name || person.APELLIDOS || person.last_name}
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
				<div className='w-1/2 gap-3 flex max-sm:w-full'>
					<FormControl className='w-1/3' error={errors.TIP_DNI}>
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
						{...register('NUM_DNI', { required: true })}
						className='w-2/3'
						helperText={errors.NUM_DNI && 'El campo es requerido'}
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
						error={errors.caracteristica}
						label='Caracteristica celular'
						{...register('characteristic', { required: true })}
						className='w-1/4'
						helperText={errors.caracteristica && 'El campo es requerido'}
						defaultValue={characteristic || person?.characteristic}
						InputProps={{
							maxLength: 4,
							startAdornment: <InputAdornment position='start'>+54 0</InputAdornment>,
						}}
					/>
					<TextField
						error={errors.telefono}
						label='Numero celular'
						{...register('number', { required: true })}
						className='w-3/4'
						defaultValue={number || person?.number}
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
						label='Caracteristica fijo'
						{...register('caracteristicaFijo')}
						className='w-1/4'
						defaultValue={characteristicFijo || person?.caracteristicaFijo}
						InputProps={{
							startAdornment: <InputAdornment position='start'>+54 0</InputAdornment>,
						}}
					/>
					<TextField label='Numero fijo' defaultValue={numberFijo || person?.numeroFijo} {...register('numeroFijo')} className='w-3/4' />
				</div>

				<FormControl className='w-1/2' error={errors.COD_SIT}>
					<InputLabel id='situacionImpositiva'>Situación Impositiva</InputLabel>
					<Select labelId='situacionImpositiva' label='Situación Impositiva' id='situacionImpositiva' {...register('COD_SIT', { required: true })} defaultValue={person?.COD_SIT || person.situation_tax}>
						{impositiveSituationArray.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					{errors.COD_SIT && <FormHelperText>El campo es requerido </FormHelperText>}
				</FormControl>
			</div>
		</div>
	)
}

PersonalForm.displayName = 'PersonalForm'

export default PersonalForm
