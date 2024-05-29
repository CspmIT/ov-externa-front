import { useForm } from 'react-hook-form'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import { request } from '../../../utils/request'
import PersonalForm from './PersonalForm'
import { useState, useEffect } from 'react'

const PersonalData = () => {
	// Hooks
	const [state, dispatch] = useRegForm()
	const [searchExecuted, setSearchExecuted] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm()
	const navigate = useNavigate()

	// Form values
	const watchDNI = watch('DNI')
	const watchCUIT = watch('CUIT')
	const watchTypePerson = watch('typePerson')

	console.log(state)
	const step = state?.step

	useEffect(() => {
		if (state?.person) {
			setValue('typePerson', state?.person?.TIP_PERSO)
		}
	}, [])

	const onSubmit = async (values) => {
		if (isValid) {
			// Guardo los datos en la DB
			const baseUrl = import.meta.env.VITE_APP_API_URL
			const url = `${baseUrl}/savePersonalData`
			console.log(url)
			dispatch({ type: 'set_person', data: values })
			dispatch({ type: 'next' })
			navigate(`/multiStepForm/${state?.services[step].nombre}`)
		}
	}

	// Cuando se hace click en buscar limpio los datos del objeto person
	const searchPerson = async () => {
		dispatch({ type: 'reset_person' })
		console.log(errors)
		console.log(isValid)
		if (!isValid) return false
		const sendData = {
			number_document: watchTypePerson === '1' ? watchDNI : watchCUIT,
			type_person: watchTypePerson,
		}
		const baseUrl = import.meta.env.VITE_APP_API_URL
		const url = `${baseUrl}/searchPeopleByDocumentNumber`

		try {
			const response = await request(url, 'POST', sendData)
			dispatch({ type: 'set_person', data: response.data[0] })
		} catch (error) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atencion!',
				text: error.response.data,
			}).then(() => {
				dispatch({ type: 'set_person', data: null })
			})
		}
		setSearchExecuted(true)
	}

	function renderForm() {
		if (watchTypePerson === '1' && state?.person) {
			return <PersonalForm setValues={setValue} watch={watch} person={state?.person} errors={errors} register={register} />
		} else {
			return <h1>Empresa</h1>
		}
	}

	return (
		<div>
			<form className='grid grid-cols-12 gap-4' onSubmit={handleSubmit(onSubmit)}>
				<FormControl className='col-span-8 col-start-3 max-sm:col-span-12' error={errors.typePerson}>
					<InputLabel id='typePerson'>Tipo de Persona *</InputLabel>
					<Select defaultValue='' labelId='typePerson' disabled={searchExecuted} label='Tipo de Persona *' id='typePerson' {...register('typePerson', { required: true })}>
						<MenuItem value='1'>Persona Fisica</MenuItem>
						<MenuItem value='2'>Persona Juridica</MenuItem>
					</Select>
					{/* Uso la validacion de react hook form */}
					{errors.typePerson && <FormHelperText>El campo es requerido </FormHelperText>}
				</FormControl>
				{watchTypePerson &&
					!searchExecuted &&
					(watchTypePerson === '1' ? (
						<div className='col-span-12 flex items-center justify-center gap-3'>
							{/* Si la persona ya existe no muestro el input de busqueda ni el boton */}
							{!state?.person && (
								<>
									<TextField error={!isValid} label='DNI' {...register('DNI', { required: true })} className='w-4/12' helperText={!isValid && 'El campo es requerido'} />
									<Button className='w-1/12 h-full' variant='outlined' type='button' onClick={searchPerson}>
										Buscar
									</Button>
								</>
							)}
						</div>
					) : (
						<div className='col-span-12 flex items-center justify-center gap-3'>
							<TextField label='CUIT' {...register('CUIT', { required: true })} className='w-4/12' />
							<Button onClick={searchPerson} className='w-1/12 h-full' type='button' variant='outlined'>
								Buscar
							</Button>
						</div>
					))}
				<div className='col-span-12 flex items-center justify-center gap-3'>{renderForm()}</div>
				<div className='col-span-12 flex items-center justify-center gap-3'>
					<Button
						className='w-1/6'
						variant='outlined'
						onClick={() => {
							dispatch({ type: 'back' })
							navigate(`/multiStepForm`)
						}}
					>
						Volver
					</Button>
					<Button className='w-1/9' variant='contained' color='secondary'>
						Guardar y continuar despues
					</Button>
					<Button disabled={!state?.person} className='w-1/6' variant='contained' color='success' type='submit'>
						Siguiente
					</Button>
				</div>
			</form>
		</div>
	)
}

export default PersonalData
