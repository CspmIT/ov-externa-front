import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import ConnectionAddress from '../components/ConnectionAddress'
import Swal from 'sweetalert2'

const DrinkingWaterForm = () => {
	const [state, dispatch] = useRegForm()
	const currentStep = state?.step - 1
	const navigate = useNavigate()
	const step = state?.step
	const { register, formState: errors } = useForm()
	const [connectionState, setConnectionState] = useState('')
	const [markerPosition, setMarkerPosition] = useState([-30.71624815384811, -62.005226726953374])
	const [firstData, setFirstData] = useState(true)

	return (
		<>
			<form action='' className='flex flex-col w-full gap-3'>
				<div className='col-span-12 flex gap-3'>
					<div className='flex flex-col w-full gap-3 items-center justify-center '>
						<div className='w-2/3 flex justify-center items-center'>
							<FormControl className='w-3/4' error={errors.conectionState}>
								<InputLabel id='conectionState'>¿La vivienda tiene conexión de Agua Potable?</InputLabel>
								<Select
									labelId='conectionState'
									label='¿La vivienda tiene conexión de Agua Potable?'
									id='conectionState'
									defaultValue={state?.aguaPotable?.conectionState || ''}
									{...register('typeProcedure', {
										required: true,
										onChange: (e) => {
											setConnectionState(e.target.value)
											if (e.target.value === '1' && state?.connectionAddress) {
												Swal.fire({
													title: 'Atención',
													text: 'Detectamos que ya completo los datos de conexión en el formulario anterior. ¿Desea utilizar los mismos datos?',
													icon: 'info',
													confirmButtonText: 'Aceptar',
													showCancelButton: true,
													cancelButtonText: 'No, cargar datos nuevos',
												}).then((result) => {
													if (result.isConfirmed) {
														setMarkerPosition([state?.connectionAddress?.lat, state?.connectionAddress?.lng])
													} else {
														setFirstData(false)
													}
												})
											}
										},
									})}
								>
									<MenuItem value='1'>Si</MenuItem>
									<MenuItem value='2'>No</MenuItem>
								</Select>
							</FormControl>
						</div>
						{connectionState === '1' && <ConnectionAddress errors={errors} register={register} markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} useData={firstData} />}
					</div>
				</div>
				<div className='col-span-12 flex mt-3 items-center justify-center gap-3'>
					<Button
						className='w-1/6'
						variant='outlined'
						onClick={() => {
							dispatch({ type: 'back' })
							navigate(`/multiStepForm/${state?.services[currentStep - 1].nombre}`)
						}}
					>
						Volver
					</Button>
					<Button className='w-1/9' variant='contained' color='secondary'>
						Guardar y continuar despues
					</Button>
					<Button
						className='w-1/6'
						variant='contained'
						onClick={() => {
							dispatch({ type: 'next' })
							navigate(`/multiStepForm/${state?.services[step].nombre}`)
						}}
					>
						Siguiente
					</Button>
				</div>
			</form>
		</>
	)
}

export default DrinkingWaterForm
